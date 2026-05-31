package com.example.chien_java_template.repository;

import com.example.chien_java_template.model.DoiTac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoiTacRepository extends JpaRepository<DoiTac, Integer> {
}
