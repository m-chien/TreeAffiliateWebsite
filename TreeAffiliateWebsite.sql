IF EXISTS (SELECT * FROM sys.databases WHERE name = 'PlantsAvenue')
BEGIN
    USE master;
    ALTER DATABASE PlantsAvenue SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE PlantsAvenue;
END
GO

CREATE DATABASE PlantsAvenue;
GO

USE PlantsAvenue;
GO

-----------------------------------------------------------
-- 1. BẢNG DANH MỤC & USER
-----------------------------------------------------------
CREATE TABLE [User] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) UNIQUE,
    Hoten NVARCHAR(255),
    soDienThoai NVARCHAR(20),
    MatKhau NVARCHAR(255),
    TrangThai NVARCHAR(50),
    Ngaytao DATETIME DEFAULT GETDATE(),
    VaiTro NVARCHAR(50), 
    avatar NVARCHAR(MAX),
    LanDangNhapCuoi DATETIME
);

CREATE TABLE DanhMucNoiDung (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    tenDanhMuc NVARCHAR(255),
    ngayTao DATETIME DEFAULT GETDATE()
);

CREATE TABLE DanhMucCayCanh (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    tenDanhMuc NVARCHAR(255),
    ngayTao DATETIME DEFAULT GETDATE()
);

-----------------------------------------------------------
-- 2. BẢNG THỰC THỂ CHÍNH: BÀI VIẾT & CÂY CẢNH
-----------------------------------------------------------
CREATE TABLE CayCanh (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    tenCay NVARCHAR(255),
    tenTiengAnh NVARCHAR(255),
    Gia DECIMAL(18, 2),
    moTa NVARCHAR(MAX),
    Anh NVARCHAR(MAX),
    TrangThai NVARCHAR(50),
    MucTraHoaHong DECIMAL(5, 2),
    DiemDanhGia FLOAT,
    LuotXem INT DEFAULT 0,
    NgayTao DATETIME DEFAULT GETDATE(),
    GiaThamKhao NVARCHAR(255),
    AnToanChoThuCung BIT, -- 0: Không an toàn, 1: An toàn
    AnhSangCanThiet NVARCHAR(255),
    LocKhongKhi BIT,
    DoKhoChamSoc INT, 
    KichThuoc NVARCHAR(100)
);

CREATE TABLE BaiViet (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    IDDanhMucNoiDung INT FOREIGN KEY REFERENCES DanhMucNoiDung(ID),
    IdUser INT FOREIGN KEY REFERENCES [User](ID),
    TieuDe NVARCHAR(500),
    NoiDung NVARCHAR(MAX),
    LuotXem INT DEFAULT 0,
    thoiGianDoc INT, 
    NgayTao DATETIME DEFAULT GETDATE()
);

-----------------------------------------------------------
-- 3. BẢNG CHI TIẾT & AFFILIATE
-----------------------------------------------------------
CREATE TABLE LinkAffiliate (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID),
    NhaCungCap NVARCHAR(255), 
    LinkAffiliate NVARCHAR(MAX),
    linkAnh NVARCHAR(MAX),
    GiaGoc DECIMAL(18, 2),
    moTa NVARCHAR(500),
    NgayTao DATETIME DEFAULT GETDATE(),
    TrangThai NVARCHAR(50),
    PhanTramHoaHong DECIMAL(5, 2),
    LuotClick INT DEFAULT 0
);

CREATE TABLE AffiliateOrder (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    IDLinkAffiliate INT FOREIGN KEY REFERENCES LinkAffiliate(ID),
    NenTang NVARCHAR(50),
    MaCode NVARCHAR(100),
    GiaTriDonHang DECIMAL(18, 2),
    HoaHong DECIMAL(18, 2),
    TrangThai NVARCHAR(50),
    NgayDat DATETIME,
    NgayCapNhat DATETIME
);

-----------------------------------------------------------
-- 4. BẢNG THÔNG TIN PHỤ & MARKETING
-----------------------------------------------------------
CREATE TABLE DanhGia (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID),
    IDUser INT FOREIGN KEY REFERENCES [User](ID),
    NguoiDanhGia NVARCHAR(255),
    Diem INT CHECK (Diem BETWEEN 1 AND 5),
    NoiDung NVARCHAR(MAX),
    NgayDang DATETIME DEFAULT GETDATE(),
    LinkAnh NVARCHAR(MAX)
);

CREATE TABLE HuongDanChamSoc (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID),
    AnhSang NVARCHAR(MAX),
    CheDoNuoc NVARCHAR(MAX),
    DatVaDinhDuong NVARCHAR(MAX),
    DoAnToan NVARCHAR(MAX)
);

CREATE TABLE ThongTinNoiBat (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID),
    Loai NVARCHAR(100), 
    NoiDung NVARCHAR(MAX)
);

CREATE TABLE CauHoiThuongGap (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID),
    CauHoi NVARCHAR(MAX),
    CauTraLoi NVARCHAR(MAX)
);

CREATE TABLE KhuyenMai (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    TenKhuyenMai NVARCHAR(255),
    PhanTramGiam DECIMAL(5, 2)
);

CREATE TABLE Anh (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    TieuDe NVARCHAR(255),
    LinkAnh NVARCHAR(MAX)
);

CREATE TABLE LichSuTiepThi (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    IDUser INT FOREIGN KEY REFERENCES [User](ID),
    IDBaiViet INT FOREIGN KEY REFERENCES BaiViet(ID) NULL,
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID) NULL,
    LoaiNoiDung NVARCHAR(100),
    NgayGui DATETIME DEFAULT GETDATE(),
    TrangThai NVARCHAR(50)
);

-----------------------------------------------------------
-- 5. BẢNG TRUNG GIAN
-----------------------------------------------------------
CREATE TABLE Anh_BaiViet (
    IDBaiViet INT FOREIGN KEY REFERENCES BaiViet(ID),
    IDAnh INT FOREIGN KEY REFERENCES Anh(ID),
    PRIMARY KEY (IDBaiViet, IDAnh)
);

CREATE TABLE BaiViet_LinkAffiliate (
    IDBaiViet INT FOREIGN KEY REFERENCES BaiViet(ID),
    IDLinkAffiliate INT FOREIGN KEY REFERENCES LinkAffiliate(ID),
    LuotClick INT DEFAULT 0,
    PRIMARY KEY (IDBaiViet, IDLinkAffiliate)
);

CREATE TABLE BaiViet_CayCanh (
    IDBaiViet INT FOREIGN KEY REFERENCES BaiViet(ID),
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID),
    PRIMARY KEY (IDBaiViet, IDCayCanh)
);

CREATE TABLE DanhMuc_CayCanh (
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID),
    IDDanhMucCayCanh INT FOREIGN KEY REFERENCES DanhMucCayCanh(ID),
    PRIMARY KEY (IDCayCanh, IDDanhMucCayCanh)
);

CREATE TABLE NguoiDungYeuThich (
    IDNguoiDung INT FOREIGN KEY REFERENCES [User](ID),
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID),
    PRIMARY KEY (IDNguoiDung, IDCayCanh)
);

CREATE TABLE BaiVietYeuThich (
    IDBaiViet INT FOREIGN KEY REFERENCES BaiViet(ID),
    IDUser INT FOREIGN KEY REFERENCES [User](ID),
    PRIMARY KEY (IDBaiViet, IDUser)
);

CREATE TABLE CayCanh_KhuyenMai (
    IDKhuyenMai INT FOREIGN KEY REFERENCES KhuyenMai(ID),
    IDCayCanh INT FOREIGN KEY REFERENCES CayCanh(ID),
    PRIMARY KEY (IDKhuyenMai, IDCayCanh)
);
GO

-----------------------------------------------------------
-- DỮ LIỆU MẪU
-----------------------------------------------------------

-- User
INSERT INTO [User] (Email, Hoten, soDienThoai, MatKhau, TrangThai, VaiTro) VALUES  
('admin@plants.com', N'Alex Nguyen', '0987654321', 'pw1', 'Active', 'Admin'),
('chi@gmail.com', N'Lê Kim Chi', '0901234567', 'pw2', 'Active', 'User'),
('hung@gmail.com', N'Trần Mạnh Hùng', '0907654321', 'pw3', 'Active', 'User'),
('lan@gmail.com', N'Vũ Ngọc Lan', '0912345678', 'pw4', 'Active', 'User'),
('minh@gmail.com', N'Đỗ Quang Minh', '0918765432', 'pw5', 'Active', 'User'),
('trang@gmail.com', N'Nguyễn Thu Trang', '0921234567', 'pw6', 'Inactive', 'User'),
('duc@gmail.com', N'Phạm Minh Đức', '0928765432', 'pw7', 'Active', 'User'),
('an@gmail.com', N'Lý Hoài An', '0931234567', 'pw8', 'Active', 'User'),
('vy@gmail.com', N'Hoàng Thảo Vy', '0938765432', 'pw9', 'Active', 'User'),
('thanh@gmail.com', N'Bùi Tiến Thành', '0941234567', 'pw10', 'Active', 'User');

-- Danh mục
INSERT INTO DanhMucNoiDung (tenDanhMuc) VALUES (N'Hướng dẫn chăm sóc'), (N'Mẹo phong thủy'), (N'Top List'), (N'Xu hướng 2026'), (N'Cẩm nang đất trồng'), (N'Phân bón & Dinh dưỡng'), (N'Trang trí nội thất'), (N'Cây mọng nước'), (N'Câu chuyện vườn'), (N'Sự kiện');
INSERT INTO DanhMucCayCanh (tenDanhMuc) VALUES (N'Cây trong nhà'), (N'Cây để bàn'), (N'Cây phong thủy'), (N'Cây lọc không khí'), (N'Cây văn phòng'), (N'Cây mọng nước'), (N'Cây ngoài trời'), (N'Cây dây leo'), (N'Cây có hoa'), (N'Phụ kiện sinh thái');

-- CayCanh (Đã sửa lỗi gán nhầm chuỗi vào cột BIT)
INSERT INTO CayCanh (tenCay, tenTiengAnh, Gia, moTa, Anh, TrangThai, MucTraHoaHong, DiemDanhGia, LuotXem, NgayTao, GiaThamKhao, AnToanChoThuCung, AnhSangCanThiet, LocKhongKhi, DoKhoChamSoc, KichThuoc) VALUES  
(N'Kim Tiền', 'Zamioculcas', 250000, N'Hút lộc', 'kimtien.png', 'Active', 18.0, 4.8, 1200, '2026-01-01', N'220.000đ - 300.000đ', 0, N'Bóng râm', 1, 1, N'Trung bình'),
(N'Lưỡi Hổ', 'Sansevieria', 180000, N'Lọc khí đêm', 'luoiho.png', 'Active', 15.0, 4.9, 2500, '2026-01-02', N'150.000đ - 250.000đ', 0, N'Ít sáng', 1, 1, N'Nhỏ'),
(N'Monstera', 'Deliciosa', 550000, N'Sành điệu', 'monstera.png', 'Active', 15.0, 5.0, 3450, '2026-01-03', N'500.000đ - 700.000đ', 0, N'Tán xạ', 1, 2, N'Lớn'),
(N'Sen Đá', 'Succulent', 45000, N'Dễ thương', 'senda.png', 'Active', 10.0, 4.7, 4200, '2026-01-04', N'40.000đ - 80.000đ', 1, N'Chịu được mọi mức sáng', 0, 2, N'Mini'),
(N'Bàng Sing', 'Ficus Lyrata', 320000, N'Hiện đại', 'bangsing.png', 'Active', 20.0, 4.6, 1800, '2026-01-05', N'300.000đ - 450.000đ', 0, N'Nắng nhẹ', 1, 3, N'Lớn'),
(N'Trầu Bà', 'Pothos', 95000, N'Dễ sống', 'trauba.png', 'Active', 12.0, 4.8, 900, '2026-01-06', N'80.000đ - 120.000đ', 0, N'Mọi loại', 1, 1, N'Vừa'),
(N'Lan Ý', 'Peace Lily', 120000, N'Thanh khiết', 'lany.png', 'Active', 15.0, 5.0, 1100, '2026-01-07', N'100.000đ - 180.000đ', 0, N'Ít sáng', 1, 2, N'Vừa'),
(N'Hạnh Phúc', 'Radermachera', 450000, N'Bình an', 'hanhphuc.png', 'Active', 15.0, 4.7, 750, '2026-01-08', N'400.000đ - 600.000đ', 1, N'Ánh sáng gián tiếp sáng', 1, 2, N'Lớn'),
(N'Xương Rồng', 'Cactus', 75000, N'Mạnh mẽ', 'xuongrong.png', 'Active', 10.0, 4.5, 300, '2026-01-09', N'50.000đ - 100.000đ', 1, N'Ánh sáng gián tiếp sáng', 0, 1, N'Nhỏ'),
(N'Ngọc Ngân', 'Aglaonema', 140000, N'Tình yêu', 'ngocngan.png', 'Active', 12.0, 4.8, 600, '2026-01-10', N'120.000đ - 200.000đ', 0, N'Sáng vừa', 1, 2, N'Nhỏ');

-- BaiViet
INSERT INTO BaiViet (IDDanhMucNoiDung, IdUser, TieuDe, LuotXem, thoiGianDoc) VALUES  
(3, 1, N'Top 10 cây lọc không khí tốt nhất', 12500, 5),
(1, 1, N'Cách tưới cây Monstera đúng cách', 8200, 7),
(2, 1, N'Cây phong thủy hợp mệnh Kim', 4500, 6),
(4, 1, N'Xu hướng trang trí 2026', 1500, 8),
(3, 1, N'5 loại sen đá cho người mới', 9200, 4),
(1, 1, N'Phòng sâu bệnh cho Lưỡi Hổ', 3100, 5),
(7, 1, N'Setup bàn làm việc với cây xanh', 11000, 6),
(8, 1, N'Phân biệt các loại xương rồng', 2400, 5),
(5, 1, N'Tự trộn đất trồng sen đá', 6700, 10),
(10, 1, N'Sự kiện triển lãm cây Đà Nẵng', 500, 3);

-- Link Affiliate
INSERT INTO LinkAffiliate (IDCayCanh, NhaCungCap, GiaGoc, PhanTramHoaHong, LuotClick, TrangThai) VALUES  
(1, 'Shopee', 230000, 15.0, 1245, 'Active'),
(1, 'TikTok', 240000, 18.0, 850, 'Active'),
(3, 'Shopee', 520000, 10.0, 3450, 'Active'),
(5, 'TikTok', 300000, 20.0, 2100, 'Active'),
(2, 'Shopee', 160000, 12.0, 1800, 'Active'),
(7, 'Shopee', 110000, 18.0, 950, 'Active'),
(10, 'TikTok', 130000, 12.0, 600, 'Active'),
(4, 'Shopee', 40000, 8.0, 4200, 'Active'),
(8, 'Shopee', 420000, 15.0, 750, 'Active'),
(9, 'TikTok', 70000, 10.0, 300, 'Active');

-- Affiliate Order
INSERT INTO AffiliateOrder (IDLinkAffiliate, NenTang, MaCode, GiaTriDonHang, HoaHong, TrangThai, NgayDat) VALUES  
(1, 'Shopee', 'SP101', 230000, 34500, 'Completed', '2026-04-01'),
(3, 'Shopee', 'SP102', 520000, 52000, 'Completed', '2026-04-02'),
(4, 'TikTok', 'TT201', 300000, 60000, 'Pending', '2026-04-05'),
(5, 'Shopee', 'SP103', 160000, 19200, 'Completed', '2026-04-06'),
(1, 'Shopee', 'SP104', 230000, 34500, 'Cancelled', '2026-04-07'),
(8, 'Shopee', 'SP105', 40000, 3200, 'Completed', '2026-04-08'),
(10, 'TikTok', 'TT202', 70000, 7000, 'Completed', '2026-04-09'),
(3, 'Shopee', 'SP106', 520000, 52000, 'Completed', '2026-04-09'),
(1, 'Shopee', 'SP107', 230000, 34500, 'Completed', '2026-04-10'),
(6, 'Shopee', 'SP108', 110000, 19800, 'Completed', '2026-04-10');

-- Đánh giá
INSERT INTO DanhGia (IDCayCanh, IDUser, NguoiDanhGia, Diem, NoiDung, NgayDang, LinkAnh) VALUES  
(1, 2, N'Lê Kim Chi', 5, N'Cây rất khỏe, đóng gói kỹ.', '2026-04-05', 'review1.jpg'),
(2, 3, N'Mạnh Hùng', 4, N'Giao hàng nhanh, cây tươi.', '2026-04-06', 'review2.jpg'),
(3, 4, N'Ngọc Lan', 5, N'Lá to đẹp cực, sành điệu.', '2026-04-07', 'review3.jpg'),
(4, 5, N'Quang Minh', 3, N'Hơi nhỏ so với hình.', '2026-04-08', 'review4.jpg'),
(5, 7, N'Minh Đức', 5, N'Đáng tiền, shop tư vấn nhiệt tình.', '2026-04-09', 'review5.jpg'),
(6, 8, N'Hoài An', 5, N'Dễ chăm, lớn nhanh lắm.', '2026-04-10', 'review6.jpg'),
(7, 9, N'Thảo Vy', 4, N'Hơi héo lúc nhận nhưng đã hồi.', '2026-04-10', 'review7.jpg'),
(1, 10, N'Tiến Thành', 5, N'Tài lộc về thật, cây đẹp.', '2026-04-10', 'review8.jpg'),
(3, 2, N'Kim Chi', 5, N'Mua cái thứ 2 rồi, vẫn ưng.', '2026-04-10', 'review9.jpg'),
(10, 5, N'Quang Minh', 4, N'Xanh mát văn phòng.', '2026-04-10', 'review10.jpg');

-- Các bảng khác...
INSERT INTO HuongDanChamSoc (IDCayCanh, AnhSang, CheDoNuoc) VALUES (1, N'Ít sáng', N'7 ngày/lần'), (2, N'Bóng râm', N'10 ngày/lần'), (3, N'Sáng tán xạ', N'3 ngày/lần'), (4, N'Nắng gắt', N'2 tuần/lần'), (5, N'Sáng mạnh', N'5 ngày/lần'), (6, N'Bất kỳ', N'Hàng ngày'), (7, N'Yếu', N'Luôn ẩm'), (8, N'Vừa', N'Phun sương'), (9, N'Nắng', N'Ít nước'), (10, N'Sáng', N'Phun lá');
INSERT INTO ThongTinNoiBat (IDCayCanh, Loai, NoiDung) VALUES (1, 'Uu', N'Dễ sống'), (1, 'Nhuoc', N'Lá có độc'), (3, 'Uu', N'Đẹp sang'), (3, 'Nhuoc', N'Giá cao'), (2, 'Uu', N'Lọc khí tốt'), (4, 'Uu', N'Nhỏ gọn'), (5, 'Nhuoc', N'Khó chăm'), (7, 'Uu', N'Hoa đẹp'), (9, 'Uu', N'Không cần tưới nhiều'), (10, 'Uu', N'Xanh mát');
INSERT INTO CauHoiThuongGap (IDCayCanh, CauHoi, CauTraLoi) VALUES (1, N'Tưới nhiều có sao không?', N'Dễ thối rễ'), (2, N'Để phòng ngủ được không?', N'Rất tốt'), (3, N'Lá có xẻ không?', N'Cây lớn mới xẻ'), (4, N'Nắng trực tiếp được không?', N'Sẽ cháy lá'), (5, N'Tại sao rụng lá?', N'Do sốc nhiệt'), (6, N'Leo tường được không?', N'Rất tốt'), (7, N'Có cần bón phân?', N'2 tháng/lần'), (8, N'Cây to bao nhiêu?', N'Đến 2 mét'), (9, N'Sống được bao lâu?', N'Vài chục năm'), (10, N'Thay chậu khi nào?', N'Khi rễ mọc ra ngoài');
INSERT INTO KhuyenMai (TenKhuyenMai, PhanTramGiam) VALUES (N'Chào hè', 10), (N'Flash Sale', 50), (N'Black Friday', 30), (N'Mừng khai trương', 20), (N'Tết Nguyên Đán', 15), (N'Ngày của mẹ', 10), (N'8/3 Sale', 12), (N'Cuối tháng', 5), (N'Mua kèm deal sốc', 7), (N'Member Only', 25);
INSERT INTO Anh (TieuDe, LinkAnh) VALUES (N'Kim tiền đại', 'img1.jpg'), (N'Lưỡi hổ vàng', 'img2.jpg'), (N'Monstera lá xẻ', 'img3.jpg'), (N'Sen đá hồng', 'img4.jpg'), (N'Bàng Sing to', 'img5.jpg'), (N'Trầu bà leo', 'img6.jpg'), (N'Lan ý trắng', 'img7.jpg'), (N'Hạnh phúc xanh', 'img8.jpg'), (N'Xương rồng tròn', 'img9.jpg'), (N'Ngọc ngân lá đốm', 'img10.jpg');
INSERT INTO LichSuTiepThi (IDUser, IDBaiViet, IDCayCanh, LoaiNoiDung, TrangThai) VALUES (2, 1, NULL, 'Blog', 'Sent'), (3, 2, NULL, 'Guide', 'Sent'), (4, NULL, 3, 'Product', 'Sent'), (5, 5, NULL, 'Blog', 'Sent'), (7, NULL, 1, 'Product', 'Error'), (8, 7, NULL, 'Blog', 'Sent'), (9, 3, NULL, 'Promo', 'Sent'), (10, NULL, 5, 'Product', 'Sent'), (2, NULL, 2, 'Product', 'Sent'), (3, 10, NULL, 'Event', 'Sent');

-- Bảng trung gian
INSERT INTO Anh_BaiViet VALUES (1,1), (1,2), (2,3), (3,4), (5,5), (7,6), (8,7), (9,8), (10,9), (1,10);
INSERT INTO BaiViet_LinkAffiliate VALUES (1,3,1500), (2,4,2100), (5,8,4200), (7,1,500), (3,5,1200);
INSERT INTO BaiViet_CayCanh VALUES (1,2), (1,7), (1,10), (2,3), (5,4), (3,1), (7,6);
INSERT INTO DanhMuc_CayCanh VALUES (1,1), (1,3), (2,2), (2,3), (3,2), (4,4), (5,5), (6,6);
INSERT INTO NguoiDungYeuThich VALUES (2,1), (2,3), (3,2), (5,10), (9,8), (10,1);
INSERT INTO BaiVietYeuThich VALUES (2,1), (2,2), (3,5), (5,7), (10,1);
INSERT INTO CayCanh_KhuyenMai VALUES (1,1), (2,1), (3,3), (4,4), (5,2);
GO

-- Kiểm tra kết quả
SELECT * FROM CayCanh;