package com.example.chien_java_template.repository;

import com.example.chien_java_template.enums.ContentType;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.model.LichSuTiepThi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LichSuTiepThiRepository extends JpaRepository<LichSuTiepThi, Integer> {
    Page<LichSuTiepThi> findByPlantsUserId(Integer userId, Pageable pageable);

    Page<LichSuTiepThi> findByTrangThai(Status trangThai, Pageable pageable);

    Page<LichSuTiepThi> findByLoaiNoiDung(ContentType loaiNoiDung, Pageable pageable);
}

