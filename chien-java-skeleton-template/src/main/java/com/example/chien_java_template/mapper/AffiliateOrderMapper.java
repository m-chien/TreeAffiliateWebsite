package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateAffiliateOrderDTO;
import com.example.chien_java_template.dto.UpdateAffiliateOrderDTO;
import com.example.chien_java_template.dto.AffiliateOrderDTO;
import com.example.chien_java_template.model.AffiliateOrder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AffiliateOrderMapper {
    @Mapping(source = "linkAffiliate.id", target = "linkAffiliateId")
    AffiliateOrderDTO toDTO(AffiliateOrder affiliateOrder);

    @Mapping(source = "linkAffiliateId", target = "linkAffiliate.id")
    AffiliateOrder toEntity(AffiliateOrderDTO affiliateOrderDTO);

    @Mapping(source = "linkAffiliateId", target = "linkAffiliate.id")
    AffiliateOrder toEntityFromCreateDTO(CreateAffiliateOrderDTO createAffiliateOrderDTO);

    void updateEntityFromDTO(UpdateAffiliateOrderDTO updateAffiliateOrderDTO, @MappingTarget AffiliateOrder affiliateOrder);
}

