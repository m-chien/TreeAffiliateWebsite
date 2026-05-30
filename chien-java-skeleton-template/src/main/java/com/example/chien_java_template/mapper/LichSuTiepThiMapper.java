package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateLichSuTiepThiDTO;
import com.example.chien_java_template.dto.UpdateLichSuTiepThiDTO;
import com.example.chien_java_template.dto.LichSuTiepThiDTO;
import com.example.chien_java_template.model.LichSuTiepThi;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LichSuTiepThiMapper {
    @Mapping(source = "plantsUser.id", target = "userId")
    @Mapping(source = "baiViet.id", target = "baiVietId")
    @Mapping(source = "cayCanh.id", target = "cayCanhId")
    LichSuTiepThiDTO toDTO(LichSuTiepThi lichSuTiepThi);

    @Mapping(source = "userId", target = "plantsUser.id")
    @Mapping(source = "baiVietId", target = "baiViet.id")
    @Mapping(source = "cayCanhId", target = "cayCanh.id")
    LichSuTiepThi toEntity(LichSuTiepThiDTO lichSuTiepThiDTO);

    @Mapping(source = "userId", target = "plantsUser.id")
    @Mapping(source = "baiVietId", target = "baiViet.id")
    @Mapping(source = "cayCanhId", target = "cayCanh.id")
    LichSuTiepThi toEntityFromCreateDTO(CreateLichSuTiepThiDTO createLichSuTiepThiDTO);

    void updateEntityFromDTO(UpdateLichSuTiepThiDTO updateLichSuTiepThiDTO, @MappingTarget LichSuTiepThi lichSuTiepThi);
}

