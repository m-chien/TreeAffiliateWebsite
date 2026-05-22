package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateLinkAffiliateDTO;
import com.example.chien_java_template.dto.UpdateLinkAffiliateDTO;
import com.example.chien_java_template.dto.LinkAffiliateDTO;
import com.example.chien_java_template.model.LinkAffiliate;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LinkAffiliateMapper {
    LinkAffiliateDTO toDTO(LinkAffiliate linkAffiliate);

    LinkAffiliate toEntity(LinkAffiliateDTO linkAffiliateDTO);

    LinkAffiliate toEntityFromCreateDTO(CreateLinkAffiliateDTO createLinkAffiliateDTO);

    void updateEntityFromDTO(UpdateLinkAffiliateDTO updateLinkAffiliateDTO, @MappingTarget LinkAffiliate linkAffiliate);
}

