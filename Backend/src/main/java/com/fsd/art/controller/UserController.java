package com.fsd.art.controller;

import com.fsd.art.model.req.UserReq;
import com.fsd.art.model.res.PaintingRes;
import com.fsd.art.model.res.UserRes;
import com.fsd.art.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserRes> SignUp(@Valid @RequestBody UserReq userReq){
        return ResponseEntity.ok(userService.signUp(userReq));
    }

    @PostMapping("/signin")
    public ResponseEntity<UserRes>  SignIn(@Valid @RequestBody UserReq userReq){
        return ResponseEntity.ok(userService.signIn(userReq));
    }

    @PostMapping("/{userId}/cart/{paintingId}")
    public ResponseEntity<Void> AddPaintingInCart(@PathVariable Long userId, @PathVariable Long paintingId) {
        userService.addPaintingInCart(userId, paintingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserRes> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUser(id));
    }

    @GetMapping("/{userId}/cart")
    public ResponseEntity<Set<PaintingRes>> ViewCart(@PathVariable Long userId){
        return ResponseEntity.ok(userService.viewCart(userId));
    }

    @PostMapping("/{userId}/buy/cart")
    public ResponseEntity<List<Long>> buyCartItem(@PathVariable Long userId){
        return ResponseEntity.ok(userService.buyCartItem(userId));
    }

    @GetMapping("/{userId}/buyitem")
    public ResponseEntity<List<PaintingRes>> allBuyItemByUser(@PathVariable Long userId){
        return ResponseEntity.ok(userService.allBuyItemByUser(userId));
    }
    @GetMapping("/{userId}/solditem")
    public ResponseEntity<List<PaintingRes>> solditems(@PathVariable Long userId){
        return ResponseEntity.ok(userService.allSoldItemByUser(userId));
    }

    @DeleteMapping("/{userId}/remove/cart/{paintingId}")
    public ResponseEntity<Void> RemovePaintingInCart(@PathVariable Long userId, @PathVariable Long paintingId) {
        userService.removePaintingInCart(userId, paintingId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable Long id,@RequestParam String username){
        System.out.println(username);
        userService.updateUser(id,username);

        return ResponseEntity.ok().build();
    }
}
