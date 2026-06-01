package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, Integer> {

    Optional<KhuyenMai> findByTenKhuyenMai(String tenKhuyenMai);

    @Query("""
        SELECT DISTINCT km
        FROM KhuyenMai km
        JOIN km.cayCanhList cc
        WHERE cc.id = :cayCanhId
    """)
    Page<KhuyenMai> findByCayCanhId(
            @Param("cayCanhId") Integer cayCanhId,
            Pageable pageable);
}