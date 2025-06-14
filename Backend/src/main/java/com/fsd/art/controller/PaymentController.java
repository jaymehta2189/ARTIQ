package com.fsd.art.controller;

import com.fsd.art.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public Map<String, String> createPaymentIntent(@RequestBody Map<String, Object> data) throws Exception {
        Long amount = Long.parseLong(data.get("amount").toString());
        return paymentService.createPaymentIntent(amount);
    }

    @PostMapping("/verify-payment")
    public String verifyPayment(@RequestBody Map<String, Object> data) {
        String paymentIntentId = data.get("paymentIntentId").toString();
        System.out.println(paymentIntentId+"    d");
        String userId = data.get("userId").toString();
        List<Map<String, Object>> items = (List<Map<String, Object>>) data.get("items");
        System.out.println(items);
        System.out.println(items.getFirst());
        boolean verified = paymentService.verifyPayment(paymentIntentId, userId, items);
        return verified ? "Payment verified and stored." : "Payment verification failed.";
    }
}
