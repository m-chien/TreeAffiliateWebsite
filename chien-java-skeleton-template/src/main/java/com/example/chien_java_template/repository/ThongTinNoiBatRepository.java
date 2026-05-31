package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.ThongTinNoiBat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThongTinNoiBatRepository extends JpaRepository<ThongTinNoiBat, Integer> {
    Page<ThongTinNoiBat> findByCayCanhId(Integer cayCanhId, Pageable pageable);
    void deleteByCayCanhId(Integer cayCanhId);
}

