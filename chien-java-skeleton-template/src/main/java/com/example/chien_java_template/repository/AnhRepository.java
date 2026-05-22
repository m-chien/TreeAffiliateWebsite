package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.Anh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnhRepository extends JpaRepository<Anh, Integer> {
    Optional<Anh> findByTieuDe(String tieuDe);
}

