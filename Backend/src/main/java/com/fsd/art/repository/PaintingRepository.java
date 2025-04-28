package com.fsd.art.repository;

import com.fsd.art.model.Painting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaintingRepository extends JpaRepository<Painting,Long> {
}
