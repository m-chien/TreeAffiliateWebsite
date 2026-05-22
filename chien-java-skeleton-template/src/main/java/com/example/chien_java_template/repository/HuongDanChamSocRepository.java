package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.HuongDanChamSoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HuongDanChamSocRepository extends JpaRepository<HuongDanChamSoc, Integer> {
    Optional<HuongDanChamSoc> findByCayCanhId(Integer cayCanhId);
}

