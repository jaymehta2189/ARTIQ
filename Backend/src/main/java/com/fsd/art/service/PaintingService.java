package com.fsd.art.service;

import com.fsd.art.model.Role;
import com.fsd.art.model.req.PaintingReq;
import com.fsd.art.model.res.PaintingRes;
import com.fsd.art.repository.PaintingRepository;
import com.fsd.art.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class PaintingService {
    private final FileUpload fileUpload;
    private final PaintingRepository paintingRepository;
    private final PaintingMapper paintingMapper;
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public PaintingService(FileUpload fileUpload, PaintingRepository paintingRepository, PaintingMapper paintingMapper, UserMapper userMapper, UserRepository userRepository) {
        this.fileUpload = fileUpload;
        this.paintingRepository = paintingRepository;
        this.paintingMapper = paintingMapper;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    public PaintingRes getPaintingById(Long id){
        var panting = paintingRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Panting not Found with Id %d".formatted(id)));

        if(panting.isBuy()){
            throw  new EntityExistsException("Painting Already Sold");
        }
        return paintingMapper.getPaintingRes(panting);
    }

    public List<PaintingRes> getAllPainting(){
        return paintingRepository.findAll().stream().map(paintingMapper::getPaintingRes).toList();
    }

    public Long addPainting(MultipartFile image,PaintingReq paintingReq) {
        var painting = paintingMapper.getPainting(paintingReq);

        var artist = userRepository.findById(paintingReq.getArtistId()).orElseThrow(() -> new EntityNotFoundException("Artist Not Found"));

        if(artist.getRole() != Role.ARTIST){
            throw  new EntityNotFoundException("User Must Be Artist");
        }

        String imageUrl ;
        try {
            imageUrl = fileUpload.uploadFile(image);
        }catch (IOException error){
            imageUrl = "https://res.cloudinary.com/dlswoqzhe/image/upload/v1736367840/Collaborative-Coding.-A-developer-team-working-together.-min-896x504_mnw9np.webp ";
        }

        painting.setUrl(imageUrl);
        painting.setArtist(artist);

        return paintingRepository.save(painting).getId();
    }

    @Transactional
    public PaintingRes BuyItem(Long userId,Long ItemId)  {
        var painting = paintingRepository.findById(ItemId).orElseThrow(()-> new EntityNotFoundException("Item Not Found"));
        var user = userRepository.findById(userId).orElseThrow(()-> new EntityNotFoundException("User Not Found"));

        if(painting.isBuy()){
            throw new EntityNotFoundException("Painting is Sold.");
        }

        painting.setBuy(true);
        painting.setBuyer(user);
        paintingRepository.save(painting);
        var artist = painting.getArtist();

        artist.getSold_Item().add(painting);
        userRepository.save(artist);

        return paintingMapper.getPaintingRes(painting);
    }

}
