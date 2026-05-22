package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, Integer> {
    Optional<KhuyenMai> findByTenKhuyenMai(String tenKhuyenMai);
}

