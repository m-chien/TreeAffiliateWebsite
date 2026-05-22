package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateKhuyenMaiDTO;
import com.example.chien_java_template.dto.UpdateKhuyenMaiDTO;
import com.example.chien_java_template.dto.KhuyenMaiDTO;
import com.example.chien_java_template.model.KhuyenMai;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface KhuyenMaiMapper {
    KhuyenMaiDTO toDTO(KhuyenMai khuyenMai);

    KhuyenMai toEntity(KhuyenMaiDTO khuyenMaiDTO);

    KhuyenMai toEntityFromCreateDTO(CreateKhuyenMaiDTO createKhuyenMaiDTO);

    void updateEntityFromDTO(UpdateKhuyenMaiDTO updateKhuyenMaiDTO, @MappingTarget KhuyenMai khuyenMai);
}

