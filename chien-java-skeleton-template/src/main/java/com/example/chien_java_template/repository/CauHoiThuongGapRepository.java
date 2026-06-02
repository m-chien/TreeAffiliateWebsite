package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.CauHoiThuongGap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CauHoiThuongGapRepository extends JpaRepository<CauHoiThuongGap, Integer> {
    Page<CauHoiThuongGap> findByCayCanhId(Integer cayCanhId, Pageable pageable);
    void deleteByCayCanhId(Integer cayCanhId);
}

