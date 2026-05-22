package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.DanhMucCayCanh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DanhMucCayCanhRepository extends JpaRepository<DanhMucCayCanh, Integer> {
    Optional<DanhMucCayCanh> findByTenDanhMuc(String tenDanhMuc);
}

