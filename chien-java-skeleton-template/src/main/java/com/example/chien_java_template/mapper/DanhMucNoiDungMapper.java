package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateDanhMucNoiDungDTO;
import com.example.chien_java_template.dto.UpdateDanhMucNoiDungDTO;
import com.example.chien_java_template.dto.DanhMucNoiDungDTO;
import com.example.chien_java_template.model.DanhMucNoiDung;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DanhMucNoiDungMapper {
    DanhMucNoiDungDTO toDTO(DanhMucNoiDung danhMucNoiDung);

    DanhMucNoiDung toEntity(DanhMucNoiDungDTO danhMucNoiDungDTO);

    DanhMucNoiDung toEntityFromCreateDTO(CreateDanhMucNoiDungDTO createDanhMucNoiDungDTO);

    void updateEntityFromDTO(UpdateDanhMucNoiDungDTO updateDanhMucNoiDungDTO, @MappingTarget DanhMucNoiDung danhMucNoiDung);
}

