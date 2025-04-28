package com.fsd.art.configuration;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Map;

@Configuration
public class CloudinaryConfiguration {

    private final String CLOUD_NAME;
    private final String API_KEY;
    private final String API_SECRET;

    public CloudinaryConfiguration(
            @Value("${cloudinary.name}") String name,
            @Value("${cloudinary.api.key}") String apiKey,
            @Value("${cloudinary.api.secret-key}") String apiSecret
    ) {
        this.CLOUD_NAME = name;
        this.API_KEY = apiKey;
        this.API_SECRET = apiSecret;
    }

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(Map.of(
                "cloud_name", CLOUD_NAME,
                "api_key", API_KEY,
                "api_secret", API_SECRET
        ));
    }
}
