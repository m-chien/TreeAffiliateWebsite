package com.example.chien_java_template.repository;

import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.model.AffiliateOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AffiliateOrderRepository extends JpaRepository<AffiliateOrder, Integer> {
    Page<AffiliateOrder> findByLinkAffiliateId(Integer linkAffiliateId, Pageable pageable);

    Page<AffiliateOrder> findByTrangThai(Status trangThai, Pageable pageable);
}

