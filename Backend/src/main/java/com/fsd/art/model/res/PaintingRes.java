package com.fsd.art.model.res;

import java.math.BigDecimal;

public record PaintingRes(
        Long id,
        String name,
        String url,
        BigDecimal prices,
        Long buyerId,
        Boolean isBuy,
        String description,
        String artistName
) {
}
