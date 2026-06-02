package com.example.chien_java_template.repository;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.model.LinkAffiliate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LinkAffiliateRepository extends JpaRepository<LinkAffiliate, Integer> {
    Optional<LinkAffiliate> findByLinkAffiliate(String linkAffiliate);

    Page<LinkAffiliate> findByCayCanhId(Integer cayCanhId, Pageable pageable);

    Page<LinkAffiliate> findByTrangThai(Status trangThai, Pageable pageable);

    Page<LinkAffiliate> findByNhaCungCap(String nhaCungCap, Pageable pageable);

    @Query("SELECT l FROM LinkAffiliate l ORDER BY l.luotClick DESC")
    Page<LinkAffiliate> findMostClicked(Pageable pageable);

    List<LinkAffiliate> findByCayCanhIdAndTrangThai(Integer cayCanhId, Status trangThai);
    
    Optional<LinkAffiliate> findFirstByCayCanh_Id(Integer id);

    void deleteAllByCayCanh_Id(Integer id);
}

