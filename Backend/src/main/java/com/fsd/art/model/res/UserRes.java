package com.fsd.art.model.res;

import java.util.List;

public record UserRes(
        Long id,
        String name,
        String email,
        String role,
        List<Long> purchased_Item,
        List<Long> sold_Item
) {
}
