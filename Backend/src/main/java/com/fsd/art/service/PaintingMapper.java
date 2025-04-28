package com.fsd.art.service;

import com.fsd.art.model.Painting;
import com.fsd.art.model.req.PaintingReq;
import com.fsd.art.model.res.PaintingRes;
import org.springframework.stereotype.Service;

@Service
public class PaintingMapper {
    public Painting getPainting(PaintingReq paintingReq){
        return Painting.builder()
                .name(paintingReq.getName())
                .prices(paintingReq.getPrices())
                .description(paintingReq.getDescription())
                .build();
    }
    public PaintingRes getPaintingRes (Painting painting){
        var buyer = painting.getBuyer();

        return new PaintingRes(
            painting.getId(),
            painting.getName(),
            painting.getUrl(),
            painting.getPrices(),
                buyer == null ? null : buyer.getId(),
            painting.isBuy(),
                painting.getDescription(),
            painting.getArtist().getName()
        );
    }
}
