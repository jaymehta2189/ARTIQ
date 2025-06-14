package com.fsd.art.repository;

import com.fsd.art.model.PaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentItemRepository extends JpaRepository<PaymentItem,Long> {
}
