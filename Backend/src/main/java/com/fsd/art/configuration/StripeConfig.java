package com.fsd.art.configuration;
import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class StripeConfig {

    @Value("${stripe.api-key}")
    private String api_key;

    @PostConstruct
    public void init() {
        Stripe.apiKey = api_key;
    }
}
