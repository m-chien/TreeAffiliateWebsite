package com.example.chien_java_template.repository;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.model.PlantsUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlantsUserRepository extends JpaRepository<PlantsUser, Integer> {
    Optional<PlantsUser> findByEmail(String email);

    boolean existsByEmail(String email);

    Page<PlantsUser> findByTrangThai(Status trangThai, Pageable pageable);

    @Query("SELECT DISTINCT u FROM PlantsUser u " +
           "JOIN u.yeThichCayCanhList p " +
           "JOIN p.danhMucs cat " +
           "WHERE cat.id IN (SELECT c.id FROM CayCanh pc JOIN pc.danhMucs c WHERE pc.id = :plantId)")
    List<PlantsUser> findUsersForPlantMarketing(@Param("plantId") Integer plantId);

    @Query("SELECT DISTINCT u FROM PlantsUser u " +
           "JOIN u.yeThichCayCanhList p " +
           "JOIN p.danhMucs cat " +
           "WHERE cat.tenDanhMuc = :categoryName")
    List<PlantsUser> findUsersForCategoryMarketing(@Param("categoryName") String categoryName);
}

