package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateAffiliateOrderDTO;
import com.example.chien_java_template.dto.UpdateAffiliateOrderDTO;
import com.example.chien_java_template.dto.AffiliateOrderDTO;
import com.example.chien_java_template.model.AffiliateOrder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AffiliateOrderMapper {
    AffiliateOrderDTO toDTO(AffiliateOrder affiliateOrder);

    AffiliateOrder toEntity(AffiliateOrderDTO affiliateOrderDTO);

    AffiliateOrder toEntityFromCreateDTO(CreateAffiliateOrderDTO createAffiliateOrderDTO);

    void updateEntityFromDTO(UpdateAffiliateOrderDTO updateAffiliateOrderDTO, @MappingTarget AffiliateOrder affiliateOrder);
}

