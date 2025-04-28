package com.fsd.art.model.req;

public record UserReq(
        String name,
        String email,
        String password,
        String role
) {
}
