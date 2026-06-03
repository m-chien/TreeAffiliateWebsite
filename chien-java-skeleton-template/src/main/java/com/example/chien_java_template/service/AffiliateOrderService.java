package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.CreateAffiliateOrderDTO;
import com.example.chien_java_template.dto.UpdateAffiliateOrderDTO;
import com.example.chien_java_template.dto.AffiliateOrderDTO;
import com.example.chien_java_template.enums.Platform;
import com.example.chien_java_template.enums.Status;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.AffiliateOrderMapper;
import com.example.chien_java_template.model.AffiliateOrder;
import com.example.chien_java_template.model.LinkAffiliate; // Bổ sung Model này
import com.example.chien_java_template.repository.AffiliateOrderRepository;
import com.example.chien_java_template.repository.LinkAffiliateRepository; // Bổ sung Repository này
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AffiliateOrderService {
    private final AffiliateOrderRepository affiliateOrderRepository;
    private final AffiliateOrderMapper affiliateOrderMapper;

    // 1. GỌI THÊM REPOSITORY CỦA BẢNG LINK
    private final LinkAffiliateRepository linkAffiliateRepository;

    @Transactional
    public AffiliateOrderDTO createAffiliateOrder(CreateAffiliateOrderDTO createAffiliateOrderDTO) {
        AffiliateOrder affiliateOrder = affiliateOrderMapper.toEntityFromCreateDTO(createAffiliateOrderDTO);
        if (createAffiliateOrderDTO.getTrangThai() != null) {
            affiliateOrder.setTrangThai(createAffiliateOrderDTO.getTrangThai());
        } else {
            affiliateOrder.setTrangThai(Status.PENDING);
        }
        if (createAffiliateOrderDTO.getNgayDat() != null) {
            affiliateOrder.setNgayDat(createAffiliateOrderDTO.getNgayDat());
        } else {
            affiliateOrder.setNgayDat(LocalDateTime.now());
        }
        AffiliateOrder savedAffiliateOrder = affiliateOrderRepository.save(affiliateOrder);
        return affiliateOrderMapper.toDTO(savedAffiliateOrder);
    }

    public AffiliateOrderDTO getAffiliateOrderById(Integer id) {
        AffiliateOrder affiliateOrder = affiliateOrderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        return affiliateOrderMapper.toDTO(affiliateOrder);
    }

    public Page<AffiliateOrderDTO> getAllAffiliateOrder(Pageable pageable) {
        return affiliateOrderRepository.findAll(pageable)
                .map(affiliateOrderMapper::toDTO);
    }

    public Page<AffiliateOrderDTO> getAffiliateOrderByLinkAffiliate(Integer linkAffiliateId, Pageable pageable) {
        return affiliateOrderRepository.findByLinkAffiliateId(linkAffiliateId, pageable)
                .map(affiliateOrderMapper::toDTO);
    }

    public Page<AffiliateOrderDTO> getAffiliateOrderByStatus(Status status, Pageable pageable) {
        return affiliateOrderRepository.findByTrangThai(status, pageable)
                .map(affiliateOrderMapper::toDTO);
    }

    @Transactional
    public AffiliateOrderDTO updateAffiliateOrder(Integer id, UpdateAffiliateOrderDTO updateAffiliateOrderDTO) {
        AffiliateOrder affiliateOrder = affiliateOrderRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_ID));
        affiliateOrderMapper.updateEntityFromDTO(updateAffiliateOrderDTO, affiliateOrder);
        AffiliateOrder updatedAffiliateOrder = affiliateOrderRepository.save(affiliateOrder);
        return affiliateOrderMapper.toDTO(updatedAffiliateOrder);
    }

    @Transactional
    public void deleteAffiliateOrder(Integer id) {
        if (!affiliateOrderRepository.existsById(id)) {
            throw new AppException(ErrorCode.INVALID_ID);
        }
        affiliateOrderRepository.deleteById(id);
    }

    // =========================================================================
    // KHU VỰC IMPORT DỮ LIỆU TỪ EXCEL VÀ TEXT (TỰ ĐỘNG DÒ TÌM ID LINK)
    // =========================================================================

    @Transactional
    public void importFromFile(MultipartFile file, String doiTac) throws Exception {
        List<AffiliateOrder> orderList = new ArrayList<>();

        // Tải sẵn toàn bộ Link lên để dò tìm (Tối ưu hiệu năng, tránh query N+1)
        List<LinkAffiliate> allLinks = linkAffiliateRepository.findAll();

        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;

                AffiliateOrder order = new AffiliateOrder();
                order.setNenTang(parsePlatform(doiTac));

                if (row.getCell(0) != null) order.setMaCode(getCellValueAsString(row.getCell(0)));

                if (row.getCell(1) != null) {
                    String tenSP = getCellValueAsString(row.getCell(1));
                    order.setTenSanPham(tenSP);

                    // TỰ ĐỘNG DÒ TÌM LINK TỪ TÊN SẢN PHẨM
                    LinkAffiliate matchedLink = findMatchingLinkObject(tenSP, allLinks);
                    if (matchedLink != null) {
                        order.setLinkAffiliate(matchedLink); // Gán nguyên Object vào đây!
                    }
                }

                try {
                    if (row.getCell(2) != null) order.setGiaTriDonHang(BigDecimal.valueOf(row.getCell(2).getNumericCellValue()));
                    if (row.getCell(3) != null) order.setHoaHong(BigDecimal.valueOf(row.getCell(3).getNumericCellValue()));
                } catch (Exception e) {}

                order.setTrangThai(parseStatus(row.getCell(4) != null ? row.getCell(4).getStringCellValue() : ""));
                order.setNgayDat(LocalDateTime.now());
                order.setNgayCapNhat(LocalDateTime.now());

                orderList.add(order);
            }
        }
        affiliateOrderRepository.saveAll(orderList);
    }

    @Transactional
    public void importFromText(String rawData, String doiTac) {
        List<AffiliateOrder> orderList = new ArrayList<>();
        String[] lines = rawData.split("\n");

        // Tải sẵn toàn bộ Link lên
        List<LinkAffiliate> allLinks = linkAffiliateRepository.findAll();

        for (String line : lines) {
            if (line.trim().isEmpty()) continue;

            String[] columns = line.split("\t");
            if (columns.length >= 4) {
                AffiliateOrder order = new AffiliateOrder();

                order.setNenTang(parsePlatform(doiTac));
                order.setMaCode(columns[0]);

                String tenSP = columns[1];
                order.setTenSanPham(tenSP);

                // TỰ ĐỘNG DÒ TÌM LINK TỪ TÊN SẢN PHẨM
                LinkAffiliate matchedLink = findMatchingLinkObject(tenSP, allLinks);
                if (matchedLink != null) {
                    order.setLinkAffiliate(matchedLink); // Gán nguyên Object vào đây!
                }

                try {
                    String gmvStr = columns[2].replace(",", "").replace(".", "").replace("đ", "").trim();
                    String hhStr = columns[3].replace(",", "").replace(".", "").replace("đ", "").trim();
                    order.setGiaTriDonHang(new BigDecimal(gmvStr));
                    order.setHoaHong(new BigDecimal(hhStr));
                } catch (Exception e) {}

                String statusStr = columns.length >= 5 ? columns[4] : "";
                order.setTrangThai(parseStatus(statusStr));
                order.setNgayDat(LocalDateTime.now());
                order.setNgayCapNhat(LocalDateTime.now());

                orderList.add(order);
            }
        }
        affiliateOrderRepository.saveAll(orderList);
    }

    // --- CÁC HÀM TIỆN ÍCH HỖ TRỢ IMPORT ---

    // Thuật toán dò tìm trả về luôn Object LinkAffiliate
    private LinkAffiliate findMatchingLinkObject(String productName, List<LinkAffiliate> allLinks) {
        if (productName == null || productName.trim().isEmpty()) return null;
        String lowerProductName = productName.toLowerCase();

        for (LinkAffiliate link : allLinks) {
            String linkDesc = link.getMoTa() != null ? link.getMoTa().toLowerCase() : "";

            if (!linkDesc.isEmpty() && lowerProductName.contains(linkDesc)) {
                return link; // Trả về nguyên cái Object thay vì chỉ trả về ID
            }
        }
        return null;
    }

    private String getCellValueAsString(Cell cell) {
        switch (cell.getCellType()) {
            case STRING: return cell.getStringCellValue();
            case NUMERIC: return String.valueOf((long) cell.getNumericCellValue());
            default: return "";
        }
    }

    private Status parseStatus(String statusStr) {
        if (statusStr == null || statusStr.trim().isEmpty()) return Status.PENDING;
        String lower = statusStr.toLowerCase();

        if (lower.contains("đã quyết toán") || lower.contains("thành công") || lower.contains("hoàn thành")) {
            return Status.COMPLETED;
        } else if (lower.contains("hủy")) {
            return Status.CANCELLED;
        }
        return Status.PENDING;
    }

    private Platform parsePlatform(String doiTac) {
        if (doiTac == null) return null;
        String lower = doiTac.toLowerCase();

        if (lower.contains("shopee")) {
            return Platform.Shopee;
        } else if (lower.contains("tiktok")) {
            return Platform.TikTok;
        } else if (lower.contains("lazada") || lower.contains("eco")) {
            return Platform.LAZADA;
        }
        return null;
    }
}