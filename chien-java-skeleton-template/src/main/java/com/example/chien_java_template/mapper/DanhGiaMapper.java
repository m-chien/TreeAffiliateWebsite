package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateDanhGiaDTO;
import com.example.chien_java_template.dto.UpdateDanhGiaDTO;
import com.example.chien_java_template.dto.DanhGiaDTO;
import com.example.chien_java_template.model.DanhGia;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DanhGiaMapper {

    // 1. Chuyển từ Entity sang DTO (Lấy dữ liệu ra)
    @Mapping(source = "cayCanh.id", target = "cayCanhId")
    @Mapping(source = "plantsUser.id", target = "userId") // Thay "plantsUser" bằng tên biến Object User trong Entity của bạn
    DanhGiaDTO toDTO(DanhGia danhGia);

    // 2. Chuyển từ DTO sang Entity (Lưu dữ liệu vào)
    @Mapping(source = "cayCanhId", target = "cayCanh.id")
    @Mapping(source = "userId", target = "plantsUser.id") // Tương tự, đổi "plantsUser" cho đúng tên biến
    DanhGia toEntity(DanhGiaDTO danhGiaDTO);

    // 3. Chuyển từ Create DTO sang Entity
    @Mapping(source = "cayCanhId", target = "cayCanh.id")
    @Mapping(source = "userId", target = "plantsUser.id")
    DanhGia toEntityFromCreateDTO(CreateDanhGiaDTO createDanhGiaDTO);

    void updateEntityFromDTO(UpdateDanhGiaDTO updateDanhGiaDTO, @MappingTarget DanhGia danhGia);
}