package com.fsd.art.service;

import com.fsd.art.model.Painting;
import com.fsd.art.model.Role;
import com.fsd.art.model.User;
import com.fsd.art.model.req.UserReq;
import com.fsd.art.model.res.UserRes;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserMapper {
    public User getUser(UserReq userReq) {
        return User.builder()
                .name(userReq.name())
                .email(userReq.email())
                .password(userReq.password())
                .role(Role.fromString(userReq.role()))
                .build();
    }

    public UserRes getUserRes(User user) {
        return new UserRes(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().toString(),
                user.getPurchased_Item() != null ?
                        user.getPurchased_Item().stream().map(Painting::getId).toList() : new ArrayList<>(), // Return empty list if null
                user.getSold_Item() != null ?
                        user.getSold_Item().stream().map(Painting::getId).toList() : new ArrayList<>() // Return empty list if null
        );
    }

}
