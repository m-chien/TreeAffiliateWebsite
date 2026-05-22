package com.example.chien_java_template.repository;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.model.PlantsUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlantsUserRepository extends JpaRepository<PlantsUser, Integer> {
    Optional<PlantsUser> findByEmail(String email);

    boolean existsByEmail(String email);

    Page<PlantsUser> findByTrangThai(Status trangThai, Pageable pageable);
}

