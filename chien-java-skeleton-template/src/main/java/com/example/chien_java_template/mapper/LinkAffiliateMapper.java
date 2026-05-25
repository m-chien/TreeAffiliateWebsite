package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateLinkAffiliateDTO;
import com.example.chien_java_template.dto.UpdateLinkAffiliateDTO;
import com.example.chien_java_template.dto.LinkAffiliateDTO;
import com.example.chien_java_template.model.LinkAffiliate;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LinkAffiliateMapper {

    // Map thẳng chữ trong DB ra DTO, giữ nguyên hoa thường
    @Mapping(source = "cayCanh.id", target = "cayCanhId")
    @Mapping(source = "nhaCungCap", target = "nenTang")
    LinkAffiliateDTO toDTO(LinkAffiliate linkAffiliate);

    @Mapping(target = "cayCanh", ignore = true)
    @Mapping(source = "nenTang", target = "nhaCungCap")
    LinkAffiliate toEntity(LinkAffiliateDTO linkAffiliateDTO);

    @Mapping(target = "cayCanh", ignore = true)
    @Mapping(source = "nenTang", target = "nhaCungCap")
    LinkAffiliate toEntityFromCreateDTO(CreateLinkAffiliateDTO createLinkAffiliateDTO);

    @Mapping(target = "cayCanh", ignore = true)
    @Mapping(source = "nenTang", target = "nhaCungCap")
    void updateEntityFromDTO(UpdateLinkAffiliateDTO updateLinkAffiliateDTO, @MappingTarget LinkAffiliate linkAffiliate);
}