package com.fsd.art.controller;

import com.fsd.art.model.req.PaintingReq;
import com.fsd.art.model.res.PaintingRes;
import com.fsd.art.service.FileUpload;
import com.fsd.art.service.PaintingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/painting")
public class PaintingController {
    private  final PaintingService paintingService;


    @Autowired
    public PaintingController(PaintingService paintingService) {
        this.paintingService = paintingService;
    }

    @GetMapping("/")
    public ResponseEntity<List<PaintingRes>> getAll(){
        return ResponseEntity.ok(paintingService.getAllPainting());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaintingRes> getPaintingById(@PathVariable Long id){
        return ResponseEntity.ok(paintingService.getPaintingById(id));
    }

//    @PostMapping("/")
//    public ResponseEntity<Long> addPainting(@RequestParam("image")MultipartFile multipartFile,@RequestParam PaintingReq paintingReq){
//        return ResponseEntity.ok(paintingService.addPainting(multipartFile,paintingReq));
//    }
@PostMapping("/")
public ResponseEntity<Long> addPainting(
        @RequestParam("name") String title,
        @RequestParam("description") String description,
        @RequestParam("prices") BigDecimal prices,
        @RequestParam("artistId") Long artistId,
        @RequestParam("image") MultipartFile multipartFile) {

    PaintingReq paintingReq = new PaintingReq(title, description, prices, artistId);
    return ResponseEntity.ok(paintingService.addPainting(multipartFile, paintingReq));
}
    @PostMapping("/{userId}/buyitem/{paintingId}")
    public ResponseEntity<PaintingRes> BuyItem(@PathVariable Long userId,@PathVariable Long paintingId){
        return ResponseEntity.ok(paintingService.BuyItem(userId,paintingId));
    }

}
