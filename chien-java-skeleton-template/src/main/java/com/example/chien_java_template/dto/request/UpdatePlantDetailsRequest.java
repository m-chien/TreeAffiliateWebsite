package com.example.chien_java_template.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class UpdatePlantDetailsRequest {
    private HuongDanChamSocRequest huongDanChamSoc;
    private List<ThongTinNoiBatRequest> thongTinNoiBat;
    private List<CauHoiThuongGapRequest> cauHoiThuongGap;
}