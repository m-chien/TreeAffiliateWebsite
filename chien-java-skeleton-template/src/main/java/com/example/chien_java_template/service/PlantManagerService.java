package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.request.ManagedPlantRequest;
import com.example.chien_java_template.dto.response.ManagedPlantResponse;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.model.CayCanh;
import com.example.chien_java_template.model.DanhMucCayCanh;
import com.example.chien_java_template.repository.CayCanhRepository;
import com.example.chien_java_template.repository.DanhMucCayCanhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class PlantManagerService {

    private final CayCanhRepository cayCanhRepository;
    private final DanhMucCayCanhRepository danhMucRepository;

    @Transactional(readOnly = true)
    public Page<ManagedPlantResponse> getManagedPlants(String searchTerm, String platform, Pageable pageable) {
        // Truyền rỗng platform vì không còn dùng LinkAffiliate
        Page<CayCanh> cayCanhs = cayCanhRepository.searchManagedPlants(
                searchTerm == null ? "" : searchTerm,
                "all",
                pageable
        );
        return cayCanhs.map(this::mapToResponse);
    }

    @Transactional
    public ManagedPlantResponse createPlant(ManagedPlantRequest request) {
        CayCanh cayCanh = new CayCanh();
        mapRequestToEntity(request, cayCanh);

        // Đặt mặc định các trường không nhập từ FE
        cayCanh.setLuotXem(0);
        cayCanh.setDiemDanhGia(0.0f);

        CayCanh savedPlant = cayCanhRepository.save(cayCanh);
        return mapToResponse(savedPlant);
    }

    @Transactional
    public ManagedPlantResponse updatePlant(Integer id, ManagedPlantRequest request) {
        CayCanh cayCanh = cayCanhRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));

        mapRequestToEntity(request, cayCanh);

        CayCanh updatedPlant = cayCanhRepository.save(cayCanh);
        return mapToResponse(updatedPlant);
    }

    @Transactional
    public void deletePlant(Integer id) {
        CayCanh cayCanh = cayCanhRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        cayCanh.getDanhMucs().clear(); // Xóa quan hệ danh mục
        cayCanhRepository.delete(cayCanh);
    }

    // --- Utility Methods ---

    private void mapRequestToEntity(ManagedPlantRequest request, CayCanh cayCanh) {
        cayCanh.setTenCay(request.getName());
        cayCanh.setTenTiengAnh(request.getTenTiengAnh());
        cayCanh.setGia(request.getGia());
        cayCanh.setGiaThamKhao(request.getGiaThamKhao());
        cayCanh.setAnhSangCanThiet(request.getAnhSangCanThiet());
        cayCanh.setKichThuoc(request.getKichThuoc());
        cayCanh.setDoKhoChamSoc(request.getDoKhoChamSoc());
        cayCanh.setAnToanChoThuCung(request.getAnToanChoThuCung() != null ? request.getAnToanChoThuCung() : false);
        cayCanh.setLocKhongKhi(request.getLocKhongKhi() != null ? request.getLocKhongKhi() : false);
        cayCanh.setMoTa(request.getMoTa());
        cayCanh.setAnh(request.getImageUrl());

        if (request.getCommission() != null) {
            cayCanh.setMucTraHoaHong(BigDecimal.valueOf(request.getCommission()));
        }
        cayCanh.setTrangThai(convertStringToStatus(request.getStatus()));

        // Xử lý Danh mục
        DanhMucCayCanh danhMuc = danhMucRepository.findByTenDanhMuc(request.getCategory())
                .orElseGet(() -> {
                    DanhMucCayCanh newDm = new DanhMucCayCanh();
                    newDm.setTenDanhMuc(request.getCategory());
                    return danhMucRepository.save(newDm);
                });

        if (cayCanh.getDanhMucs() == null) {
            cayCanh.setDanhMucs(new ArrayList<>());
        }
        cayCanh.getDanhMucs().clear();
        cayCanh.getDanhMucs().add(danhMuc);
    }

    private ManagedPlantResponse mapToResponse(CayCanh cayCanh) {
        String category = "N/A";
        if (cayCanh.getDanhMucs() != null && !cayCanh.getDanhMucs().isEmpty()) {
            category = cayCanh.getDanhMucs().get(0).getTenDanhMuc();
        }

        Double commission = cayCanh.getMucTraHoaHong() != null ? cayCanh.getMucTraHoaHong().doubleValue() : 0.0;
        String statusStr = cayCanh.getTrangThai() != null && cayCanh.getTrangThai().name().equalsIgnoreCase("ACTIVE") ? "Active" : "Inactive";

        return ManagedPlantResponse.builder()
                .id(String.valueOf(cayCanh.getId()))
                .name(cayCanh.getTenCay())
                .tenTiengAnh(cayCanh.getTenTiengAnh())
                .gia(cayCanh.getGia())
                .giaThamKhao(cayCanh.getGiaThamKhao())
                .anhSangCanThiet(cayCanh.getAnhSangCanThiet())
                .kichThuoc(cayCanh.getKichThuoc())
                .doKhoChamSoc(cayCanh.getDoKhoChamSoc())
                .anToanChoThuCung(cayCanh.getAnToanChoThuCung())
                .locKhongKhi(cayCanh.getLocKhongKhi())
                .moTa(cayCanh.getMoTa())
                .category(category)
                .commission(commission)
                .status(statusStr)
                .imageUrl(cayCanh.getAnh())
                .build();
    }

    private Status convertStringToStatus(String statusStr) {
        if (statusStr == null) return Status.INACTIVE;
        try {
            return Status.valueOf(statusStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            return Status.INACTIVE;
        }
    }
}