package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CayCanhDTO;
import com.example.chien_java_template.dto.CreateCayCanhDTO;
import com.example.chien_java_template.dto.UpdateCayCanhDTO;
import com.example.chien_java_template.model.CayCanh;
import com.example.chien_java_template.model.DanhMucCayCanh;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CayCanhMapper {

    // Ánh xạ từ "danhMucs" (Entity) sang "danhMucList" (DTO)
    @Mapping(target = "danhMucList", source = "danhMucs", qualifiedByName = "mapToTenDanhMucList")
    CayCanhDTO toDTO(CayCanh cayCanh);

    CayCanh toEntityFromCreateDTO(CreateCayCanhDTO createCayCanhDTO);

    void updateEntityFromDTO(UpdateCayCanhDTO updateCayCanhDTO, @MappingTarget CayCanh cayCanh);

    // Hàm custom để trích xuất tên danh mục từ Object DanhMucCayCanh
    @Named("mapToTenDanhMucList")
    default List<String> mapToTenDanhMucList(List<DanhMucCayCanh> danhMucs) {
        if (danhMucs == null || danhMucs.isEmpty()) {
            return null;
        }
        return danhMucs.stream()
                .map(DanhMucCayCanh::getTenDanhMuc) // Lấy ra chuỗi tên danh mục
                .collect(Collectors.toList());
    }
}