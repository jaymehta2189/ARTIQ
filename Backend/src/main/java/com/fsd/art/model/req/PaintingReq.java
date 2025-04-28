package com.fsd.art.model.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaintingReq{
    private Long buyerId;
    private Long artistId;
    private BigDecimal prices;
    private String description;
    private  String name;

    public PaintingReq( String name ,String description ,BigDecimal prices,Long artistId ) {
        this.artistId = artistId;
        this.prices = prices;
        this.description = description;
        this.name = name;
    }
}
