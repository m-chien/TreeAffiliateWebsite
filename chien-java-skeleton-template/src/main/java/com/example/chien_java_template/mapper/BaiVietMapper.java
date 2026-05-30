package com.example.chien_java_template.mapper;

import com.example.chien_java_template.dto.CreateBaiVietDTO;
import com.example.chien_java_template.dto.UpdateBaiVietDTO;
import com.example.chien_java_template.dto.BaiVietDTO;
import com.example.chien_java_template.model.BaiViet;
import com.example.chien_java_template.model.Anh;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

// Thêm unmappedTargetPolicy để bỏ qua các cảnh báo màu vàng
@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface BaiVietMapper {

    // Đã sửa lại thành hoTen (chữ T viết hoa)
    @Mapping(source = "plantsUser.hoTen", target = "tenTacGia")
    @Mapping(source = "danhMucNoiDung.tenDanhMuc", target = "tenDanhMuc")
    @Mapping(target = "anhDaiDien", expression = "java(extractAnhDaiDien(baiViet.getAnhList()))")
    BaiVietDTO toDTO(BaiViet baiViet);

    BaiViet toEntity(BaiVietDTO baiVietDTO);

    BaiViet toEntityFromCreateDTO(CreateBaiVietDTO createBaiVietDTO);

    void updateEntityFromDTO(UpdateBaiVietDTO updateBaiVietDTO, @MappingTarget BaiViet baiViet);

    default String extractAnhDaiDien(List<Anh> anhList) {
        if (anhList != null && !anhList.isEmpty()) {
            Anh anhDauTien = anhList.get(0);
            if (anhDauTien != null && anhDauTien.getLinkAnh() != null) {
                return anhDauTien.getLinkAnh(); // Đảm bảo thuộc tính trong Entity Anh là linkAnh
            }
        }
        return "default-blog-image.jpg";
    }
}