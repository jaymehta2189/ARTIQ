package com.fsd.art.service;

import com.fsd.art.model.Payment;
import com.fsd.art.model.PaymentItem;
import com.fsd.art.repository.PaymentItemRepository;
import com.fsd.art.repository.PaymentRepository;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentItemRepository paymentItemRepository;

    public Map<String, String> createPaymentIntent(Long amountInCents) throws Exception {
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amountInCents)
                        .setCurrency("usd")
                        .setDescription("ArtiQ Purchase")
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                        .setEnabled(true)
                                        .build())
                        .build();

        PaymentIntent intent = PaymentIntent.create(params);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("clientSecret", intent.getClientSecret());
        responseData.put("id", intent.getId());
        return responseData;
    }

    public boolean verifyPayment(String paymentIntentId, String userId, List<Map<String, Object>> items) {
        try {
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            if (!"succeeded".equals(intent.getStatus())) {
                return false;
            }
            System.out.println("h23");
            double totalAmount = intent.getAmount() / 100.0;

            Payment payment = Payment.builder()
                    .transactionId(intent.getId())
                    .userId(userId)
                    .totalAmount(totalAmount)
                    .currency(intent.getCurrency())
                    .status(intent.getStatus())
                    .createdAt(LocalDateTime.now())
                    .build();

            payment = paymentRepository.save(payment);
            System.out.println("h23");

            for (Map<String, Object> item : items) {
                String productId = item.get("productId").toString();
                double price = Double.parseDouble(item.get("price").toString());
                int quantity = Integer.parseInt(item.get("quantity").toString());
                double subtotal = price * quantity;

                PaymentItem paymentItem = PaymentItem.builder()
                        .payment(payment)
                        .productId(productId)
                        .price(price)
                        .quantity(quantity)
                        .subtotal(subtotal)
                        .build();

                paymentItemRepository.save(paymentItem);
            }
            System.out.println("h23");

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

