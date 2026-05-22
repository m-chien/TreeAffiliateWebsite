package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.DanhMucNoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DanhMucNoiDungRepository extends JpaRepository<DanhMucNoiDung, Integer> {
    Optional<DanhMucNoiDung> findByTenDanhMuc(String tenDanhMuc);
}

