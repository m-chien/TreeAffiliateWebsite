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
    IDBaiViet INT NOT NULL,
    IDLinkAffiliate INT NOT NULL,
    LuotClick INT DEFAULT 0,
    PRIMARY KEY (IDBaiViet, IDLinkAffiliate),
    FOREIGN KEY (IDBaiViet) REFERENCES BaiViet(ID),
    FOREIGN KEY (IDLinkAffiliate) REFERENCES LinkAffiliate(ID)
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
('admin@plants.com', N'Alex Nguyen', '0987654321', 'pw1', 'ACTIVE', 'ADMIN'),
('chi@gmail.com', N'Lê Kim Chi', '0901234567', 'pw2', 'ACTIVE', 'USER'),
('hung@gmail.com', N'Trần Mạnh Hùng', '0907654321', 'pw3', 'ACTIVE', 'USER'),
('lan@gmail.com', N'Vũ Ngọc Lan', '0912345678', 'pw4', 'ACTIVE', 'USER'),
('minh@gmail.com', N'Đỗ Quang Minh', '0918765432', 'pw5', 'ACTIVE', 'USER'),
('trang@gmail.com', N'Nguyễn Thu Trang', '0921234567', 'pw6', 'INACTIVE', 'USER'),
('duc@gmail.com', N'Phạm Minh Đức', '0928765432', 'pw7', 'ACTIVE', 'USER'),
('an@gmail.com', N'Lý Hoài An', '0931234567', 'pw8', 'ACTIVE', 'USER'),
('vy@gmail.com', N'Hoàng Thảo Vy', '0938765432', 'pw9', 'ACTIVE', 'USER'),
('thanh@gmail.com', N'Bùi Tiến Thành', '0941234567', 'pw10', 'ACTIVE', 'USER');

-- Danh mục
INSERT INTO DanhMucNoiDung (tenDanhMuc) VALUES (N'Hướng dẫn chăm sóc'), (N'Mẹo phong thủy'), (N'Top List'), (N'Xu hướng 2026'), (N'Cẩm nang đất trồng'), (N'Phân bón & Dinh dưỡng'), (N'Trang trí nội thất'), (N'Cây mọng nước'), (N'Câu chuyện vườn'), (N'Sự kiện');
INSERT INTO DanhMucCayCanh (tenDanhMuc) VALUES (N'Cây trong nhà'), (N'Cây để bàn'), (N'Cây phong thủy'), (N'Cây lọc không khí'), (N'Cây văn phòng'), (N'Cây mọng nước'), (N'Cây ngoài trời'), (N'Cây dây leo'), (N'Cây có hoa'), (N'Phụ kiện sinh thái');

-- CayCanh (Đã sửa lỗi gán nhầm chuỗi vào cột BIT)
INSERT INTO CayCanh (tenCay, tenTiengAnh, Gia, moTa, Anh, TrangThai, MucTraHoaHong, DiemDanhGia, LuotXem, NgayTao, GiaThamKhao, AnToanChoThuCung, AnhSangCanThiet, LocKhongKhi, DoKhoChamSoc, KichThuoc) VALUES  
(N'Kim Tiền', 'Zamioculcas', 250000, N'Cây Kim Tiền (Phát Tài) là loài cây cảnh văn phòng có lá xanh bóng mọng nước mọc hướng thẳng đứng, mang ý nghĩa thu hút tài lộc, thịnh vượng. Cây rất dễ chăm sóc, chịu hạn tốt và thích hợp với môi trường thiếu sáng.', 'kimtien.png', 'ACTIVE', 18.0, 4.8, 1200, '2026-01-01', N'220.000đ - 300.000đ', 0, N'Bóng râm', 1, 1, N'Trung bình'),
(N'Lưỡi Hổ', 'Sansevieria', 180000, N'Cây Lưỡi Hổ nổi bật với lá cứng cáp vằn hổ viền vàng vươn thẳng kiêu hãnh. Cây có khả năng thanh lọc bụi bẩn, giải phóng oxy vào ban đêm và xua đuổi tà khí rất tốt.', 'luoiho.png', 'ACTIVE', 15.0, 4.9, 2500, '2026-01-02', N'150.000đ - 250.000đ', 0, N'Ít sáng', 1, 1, N'Nhỏ'),
(N'Monstera', 'Deliciosa', 550000, N'Trầu Bà Lá Xẻ Nam Mỹ (Monstera) là biểu tượng trang trí nội thất hiện đại với những chiếc lá to bản có đường xẻ độc đáo. Cây giúp thanh lọc bụi mịn và mang ý nghĩa trường thọ.', 'monstera.png', 'ACTIVE', 15.0, 5.0, 3450, '2026-01-03', N'500.000đ - 700.000đ', 0, N'Tán xạ', 1, 2, N'Lớn'),
(N'Sen Đá', 'Succulent', 45000, N'Sen Đá là loài cây cảnh mini với những chiếc lá mọng nước xếp đều đặn như đóa sen thanh khiết. Cây rất đa dạng về kiểu dáng, ưa nắng và tượng trưng cho tình yêu vĩnh cửu.', 'senda.png', 'ACTIVE', 10.0, 4.7, 4200, '2026-01-04', N'40.000đ - 80.000đ', 1, N'Chịu được mọi mức sáng', 0, 2, N'Mini'),
(N'Bàng Sing', 'Ficus Lyrata', 320000, N'Bàng Singapore là cây thân gỗ nội thất cao cấp mang phong cách hiện đại từ châu Âu. Cây có lá to tròn xanh đậm khỏe khoắn, biểu trưng cho may mắn và năng lượng tích cực.', 'bangsing.png', 'ACTIVE', 20.0, 4.6, 1800, '2026-01-05', N'300.000đ - 450.000đ', 0, N'Nắng nhẹ', 1, 3, N'Lớn'),
(N'Trầu Bà', 'Pothos', 95000, N'Cây Trầu Bà là loài thân leo quốc dân dẻo dai, dễ sống trong mọi điều kiện. Cây lọc khí cực tốt, loại bỏ bức xạ điện tử và đem lại bình an, thịnh vượng cho gia chủ.', 'trauba.png', 'ACTIVE', 12.0, 4.8, 900, '2026-01-06', N'80.000đ - 120.000đ', 0, N'Mọi loại', 1, 1, N'Vừa'),
(N'Lan Ý', 'Peace Lily', 120000, N'Cây Lan Ý mang hoa trắng muốt vươn cao kiêu sa trên nền lá xanh thẫm. Cây có khả năng hấp thụ các hóa chất độc hại từ sơn tường và cân bằng năng lượng tích cực.', 'lany.png', 'ACTIVE', 15.0, 5.0, 1100, '2026-01-07', N'100.000đ - 180.000đ', 0, N'Ít sáng', 1, 2, N'Vừa'),
(N'Hạnh Phúc', 'Radermachera', 450000, N'Cây Hạnh Phúc mang dáng vẻ uy nghiêm với những chùm lá xanh mướt mát mắt, tượng trưng cho sự gắn kết và bình an gia đình. Cây lọc sạch không khí hiệu quả.', 'hanhphuc.png', 'ACTIVE', 15.0, 4.7, 750, '2026-01-08', N'400.000đ - 600.000đ', 1, N'Ánh sáng gián tiếp sáng', 1, 2, N'Lớn'),
(N'Xương Rồng', 'Cactus', 75000, N'Xương Rồng kiên cường mọng nước với các gai nhọn độc đáo. Cây đại diện cho ý chí sắt đá, sức chịu đựng phi thường, thích hợp trang trí bàn làm việc và hút bức xạ máy tính.', 'xuongrong.png', 'ACTIVE', 10.0, 4.5, 300, '2026-01-09', N'50.000đ - 100.000đ', 1, N'Ánh sáng gián tiếp sáng', 0, 1, N'Nhỏ'),
(N'Ngọc Ngân', 'Aglaonema', 140000, N'Cây Ngọc Ngân sở hữu những chiếc lá đốm trắng bạc nổi bật trên nền viền xanh lục. Cây đại diện cho tình yêu chung thủy, tài lộc hanh thông và có rễ trắng thanh tao.', 'ngocngan.png', 'ACTIVE', 12.0, 4.8, 600, '2026-01-10', N'120.000đ - 200.000đ', 0, N'Sáng vừa', 1, 2, N'Nhỏ');

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
INSERT INTO LinkAffiliate 
(IDCayCanh, NhaCungCap, LinkAffiliate, linkAnh, GiaGoc, moTa, PhanTramHoaHong, LuotClick, TrangThai) 
VALUES  
(1, 'Shopee', 'https://shopee.vn/kim-tien', 'kimtien-affiliate.jpg', 230000, N'Cây Kim Tiền phong thủy để bàn', 15.0, 1245, 'ACTIVE'),

(1, 'TikTok', 'https://tiktok.com/kim-tien', 'kimtien-tiktok.jpg', 240000, N'Cây Kim Tiền chậu sứ cao cấp', 18.0, 850, 'ACTIVE'),

(3, 'Shopee', 'https://shopee.vn/monstera', 'monstera-affiliate.jpg', 520000, N'Monstera lá xẻ nhập khẩu', 10.0, 3450, 'ACTIVE'),

(5, 'TikTok', 'https://tiktok.com/bang-sing', 'bangsing-affiliate.jpg', 300000, N'Bàng Sing decor phòng khách', 20.0, 2100, 'ACTIVE'),

(2, 'Shopee', 'https://shopee.vn/luoi-ho', 'luoiho-affiliate.jpg', 160000, N'Lưỡi Hổ lọc không khí mini', 12.0, 1800, 'ACTIVE'),

(7, 'Shopee', 'https://shopee.vn/lan-y', 'lany-affiliate.jpg', 110000, N'Lan Ý để văn phòng', 18.0, 950, 'ACTIVE'),

(10, 'TikTok', 'https://tiktok.com/ngoc-ngan', 'ngocngan-affiliate.jpg', 130000, N'Ngọc Ngân phong thủy', 12.0, 600, 'ACTIVE'),

(4, 'Shopee', 'https://shopee.vn/sen-da', 'senda-affiliate.jpg', 40000, N'Sen đá mini nhiều màu', 8.0, 4200, 'ACTIVE'),

(8, 'Shopee', 'https://shopee.vn/hanh-phuc', 'hanhphuc-affiliate.jpg', 420000, N'Cây Hạnh Phúc chậu lớn', 15.0, 750, 'ACTIVE'),

(9, 'TikTok', 'https://tiktok.com/xuong-rong', 'xuongrong-affiliate.jpg', 70000, N'Xương Rồng mini để bàn', 10.0, 300, 'ACTIVE');

-- Affiliate Order
INSERT INTO AffiliateOrder (IDLinkAffiliate, NenTang, MaCode, GiaTriDonHang, HoaHong, TrangThai, NgayDat) VALUES  
(1, 'Shopee', 'SP101', 230000, 34500, 'COMPLETED', '2026-04-01'),
(3, 'Shopee', 'SP102', 520000, 52000, 'COMPLETED', '2026-04-02'),
(4, 'TikTok', 'TT201', 300000, 60000, 'PENDING', '2026-04-05'),
(5, 'Shopee', 'SP103', 160000, 19200, 'COMPLETED', '2026-04-06'),
(1, 'Shopee', 'SP104', 230000, 34500, 'CANCELLED', '2026-04-07'),
(8, 'Shopee', 'SP105', 40000, 3200, 'COMPLETED', '2026-04-08'),
(10, 'TikTok', 'TT202', 70000, 7000, 'COMPLETED', '2026-04-09'),
(3, 'Shopee', 'SP106', 520000, 52000, 'COMPLETED', '2026-04-09'),
(1, 'Shopee', 'SP107', 230000, 34500, 'COMPLETED', '2026-04-10'),
(6, 'Shopee', 'SP108', 110000, 19800, 'COMPLETED', '2026-04-10');

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
-- ThongTinNoiBat (Mỗi cây có 6 trường: 3 ưu điểm, 3 nhược điểm)
INSERT INTO ThongTinNoiBat (IDCayCanh, Loai, NoiDung) VALUES
(1, 'Uu', N'Dễ sống, thích nghi tốt với môi trường thiếu sáng'),
(1, 'Uu', N'Mang ý nghĩa phong thủy tốt, thu hút tài lộc và may mắn'),
(1, 'Uu', N'Không cần tưới nước thường xuyên, chịu hạn tốt'),
(1, 'Nhuoc', N'Lá và thân có chứa độc tính nhẹ (canxi oxalat), gây kích ứng nếu ăn phải'),
(1, 'Nhuoc', N'Rất dễ bị thối rễ nếu tưới quá nhiều nước'),
(1, 'Nhuoc', N'Phát triển tương đối chậm trong điều kiện thiếu dưỡng chất'),

(2, 'Uu', N'Khả năng lọc không khí vượt trội, giải phóng oxy vào ban đêm'),
(2, 'Uu', N'Cực kỳ dễ chăm sóc, hầu như không bị sâu bệnh'),
(2, 'Uu', N'Phù hợp trang trí nhiều không gian từ phòng ngủ đến văn phòng'),
(2, 'Nhuoc', N'Có độc tính nhẹ đối với chó, mèo nếu nhai phải'),
(2, 'Nhuoc', N'Nhạy cảm với lạnh và ngập úng'),
(2, 'Nhuoc', N'Khó ra hoa nếu không đủ ánh sáng tự nhiên'),

(3, 'Uu', N'Lá xẻ độc đáo, mang phong cách decor hiện đại và sang trọng'),
(3, 'Uu', N'Tăng độ ẩm không khí và thanh lọc bụi bẩn tốt'),
(3, 'Uu', N'Kích thước lớn, tạo điểm nhấn xanh mát cho căn phòng'),
(3, 'Nhuoc', N'Giá thành tương đối cao hơn so với các cây cảnh thông thường'),
(3, 'Nhuoc', N'Chiếm nhiều diện tích không gian khi cây phát triển lớn'),
(3, 'Nhuoc', N'Cần ánh sáng gián tiếp và độ ẩm ổn định để giữ lá đẹp'),

(4, 'Uu', N'Kích thước nhỏ gọn, thích hợp để bàn làm việc, cửa sổ'),
(4, 'Uu', N'Rất đa dạng về chủng loại, màu sắc và hình dáng dễ thương'),
(4, 'Uu', N'An toàn tuyệt đối cho con người và vật nuôi'),
(4, 'Nhuoc', N'Cần rất nhiều ánh sáng tự nhiên, dễ bị héo hoặc vươn dài nếu thiếu nắng'),
(4, 'Nhuoc', N'Rất kỵ úng nước, dễ thối nhũn chỉ sau một lần tưới sai cách'),
(4, 'Nhuoc', N'Tốc độ sinh trưởng chậm và nhạy cảm với nhiệt độ cao'),

(5, 'Uu', N'Dáng thẳng đứng hiện đại, lá to xanh mướt tạo vẻ đẹp sang trọng'),
(5, 'Uu', N'Khả năng thanh lọc bụi mịn tốt trong không gian kín'),
(5, 'Uu', N'Giúp giảm căng thẳng và tạo cảm giác thư thái'),
(5, 'Nhuoc', N'Khó chăm sóc, dễ bị rụng lá hoặc đốm lá nếu thay đổi môi trường'),
(5, 'Nhuoc', N'Nhựa cây có độc tính nhẹ, có thể gây ngứa da khi tiếp xúc'),
(5, 'Nhuoc', N'Cần vị trí có nắng nhẹ để duy trì màu sắc lá'),

(6, 'Uu', N'Sinh trưởng nhanh, dễ nhân giống bằng cách giâm cành'),
(6, 'Uu', N'Lọc sạch các khí độc hại như formaldehyde, benzene'),
(6, 'Uu', N'Có thể trồng đất hoặc trồng thủy sinh linh hoạt'),
(6, 'Nhuoc', N'Chứa tinh thể canxi oxalat gây rát lưỡi và kích ứng cho thú cưng'),
(6, 'Nhuoc', N'Dây leo phát triển nhanh cần cắt tỉa thường xuyên để gọn gàng'),
(6, 'Nhuoc', N'Lá dễ bị vàng và rụng nếu đất quá khô hoặc quá ẩm kéo dài'),

(7, 'Uu', N'Hoa màu trắng thanh khiết, sang trọng và lâu tàn'),
(7, 'Uu', N'Khả năng hấp thụ bức xạ từ các thiết bị điện tử rất tốt'),
(7, 'Uu', N'Thích nghi tốt với môi trường thiếu sáng trong phòng máy lạnh'),
(7, 'Nhuoc', N'Nhạy cảm với nguồn nước máy chứa nhiều clo (gây cháy mép lá)'),
(7, 'Nhuoc', N'Hơi độc đối với chó mèo khi nuốt phải lá hoặc hoa'),
(7, 'Nhuoc', N'Cần tưới nước định kỳ vì cây ưa ẩm, lá sẽ rũ xuống nhanh khi thiếu nước'),

(8, 'Uu', N'Lá xanh bóng mọc rậm rạp, tượng trưng cho sự đầm ấm, hạnh phúc'),
(8, 'Uu', N'Thân gỗ chắc chắn, tạo cảm giác bề thế và vững chãi'),
(8, 'Uu', N'Thân thiện và an toàn đối với cả trẻ nhỏ và vật nuôi'),
(8, 'Nhuoc', N'Cần lượng nước tưới vừa đủ và đều đặn, không chịu được khô hạn quá lâu'),
(8, 'Nhuoc', N'Thích hợp đặt ở nơi thoáng mát, dễ rụng lá hàng loạt nếu bí khí'),
(8, 'Nhuoc', N'Khó di chuyển khi cây đạt kích thước lớn'),

(9, 'Uu', N'Sức sống vô cùng bền bỉ, chịu hạn cực tốt'),
(9, 'Uu', N'Kiểu dáng gai góc, cá tính và độc lạ'),
(9, 'Uu', N'Không tốn thời gian và công sức chăm sóc định kỳ'),
(9, 'Nhuoc', N'Gai nhọn có thể gây trầy xước, không phù hợp nhà có trẻ nhỏ/thú cưng'),
(9, 'Nhuoc', N'Rất dễ chết do úng nước nếu đất trồng không thoát nước tốt'),
(9, 'Nhuoc', N'Cần ánh nắng trực tiếp tối thiểu vài giờ mỗi ngày để phát triển khỏe mạnh'),

(10, 'Uu', N'Lá có đốm trắng xanh độc đáo, bắt mắt và mang tính thẩm mỹ cao'),
(10, 'Uu', N'Mang ý nghĩa phong thủy tốt lành về tài lộc và tình yêu'),
(10, 'Uu', N'Lọc bụi bẩn và các chất độc hại trong không khí hiệu quả'),
(10, 'Nhuoc', N'Độc nhẹ cho thú cưng (chó, mèo) nếu ăn phải lượng lớn'),
(10, 'Nhuoc', N'Nhạy cảm với ánh nắng trực tiếp gay gắt (dễ bị cháy lá)'),
(10, 'Nhuoc', N'Dễ bị thối bẹ lá nếu tưới nước đọng lại trên ngọn cây quá lâu');

-- CauHoiThuongGap (Mỗi cây có 3 câu hỏi)
INSERT INTO CauHoiThuongGap (IDCayCanh, CauHoi, CauTraLoi) VALUES
(1, N'Tưới nước cho cây Kim Tiền bao nhiêu lần một tuần?', N'Chỉ nên tưới 1 lần mỗi 1-2 tuần, hoặc khi đất đã khô hoàn toàn. Tưới quá nhiều sẽ làm thối rễ cây.'),
(1, N'Cây Kim Tiền có thích hợp để trong phòng máy lạnh không?', N'Có, cây thích nghi tốt trong môi trường văn phòng máy lạnh, nhưng cần tránh luồng gió lạnh thổi trực tiếp.'),
(1, N'Tại sao lá cây Kim Tiền bị vàng?', N'Thường là do tưới quá nhiều nước dẫn đến úng rễ, hoặc do cây đặt ở vị trí quá tối trong thời gian dài.'),

(2, N'Có nên để cây Lưỡi Hổ trong phòng ngủ không?', N'Rất nên. Lưỡi Hổ là một trong số ít cây quang hợp CAM, giúp giải phóng oxy và hấp thụ carbon dioxide vào ban đêm.'),
(2, N'Làm sao biết cây Lưỡi Hổ đang thiếu nước hay thừa nước?', N'Nếu thừa nước, lá sẽ mềm, nhũn và chuyển sang màu vàng; nếu thiếu nước quá lâu, lá sẽ hơi nhăn nheo và co lại.'),
(2, N'Cây Lưỡi Hổ có cần nhiều ánh sáng không?', N'Không cần nhiều, cây sống được ở nơi thiếu sáng nhưng sẽ phát triển đẹp và nhanh hơn nếu có ánh sáng gián tiếp nhẹ.'),

(3, N'Tại sao cây Monstera của tôi không xẻ lá?', N'Cây non thường chưa xẻ lá. Ngoài ra, thiếu ánh sáng cũng là nguyên nhân khiến lá mới mọc ra không xẻ sâu.'),
(3, N'Cần lau lá Monstera như thế nào để giữ độ bóng đẹp?', N'Dùng khăn ẩm mềm lau nhẹ nhàng bề mặt lá định kỳ 1-2 tuần/lần để sạch bụi bẩn và giúp cây quang hợp tốt hơn.'),
(3, N'Cây Monstera có cần bón phân thường xuyên không?', N'Nên bón phân hữu cơ hoặc NPK loãng mỗi tháng một lần vào mùa sinh trưởng (xuân, hè) để kích thích ra lá to.'),

(4, N'Làm thế nào để sen đá không bị vươn cao và thưa lá?', N'Hãy đặt sen đá ở nơi nhận được ít nhất 4-6 tiếng ánh nắng tự nhiên mỗi ngày để cây giữ dáng tròn lùn đẹp mắt.'),
(4, N'Khi nào là thời điểm thích hợp nhất để tưới nước cho sen đá?', N'Chỉ tưới khi đất khô hoàn toàn và các lá bên dưới có dấu hiệu hơi mềm hoặc nhăn lại. Tưới vào gốc, tránh đọng nước trên lá.'),
(4, N'Sen đá trồng trong nhà có sống được lâu không?', N'Khó sống lâu nếu thiếu nắng. Bạn nên mang cây ra phơi nắng sáng thường xuyên hoặc dùng đèn quang hợp chuyên dụng.'),

(5, N'Tại sao bàng Singapore bị rụng lá từ dưới gốc lên?', N'Nguyên nhân phổ biến là do đất quá ẩm ướt liên tục hoặc do cây bị thiếu ánh sáng nghiêm trọng.'),
(5, N'Cây bàng Singapore cần ánh sáng như thế nào?', N'Cây cần ánh sáng gián tiếp sáng sủa, đặt gần cửa sổ là tốt nhất. Tránh nắng gắt trực tiếp làm cháy lá.'),
(5, N'Cắt tỉa ngọn bàng Singapore có giúp cây đẻ nhánh không?', N'Có, bấm ngọn sẽ kích thích các chồi nách phát triển, giúp cây phân nhiều cành và tạo tán tròn đẹp hơn.'),

(6, N'Cây trầu bà trồng thủy sinh cần lưu ý điều gì?', N'Thay nước 1 lần/tuần, vệ sinh rễ bị thối và thêm vài giọt dung dịch thủy canh để cung cấp dinh dưỡng cho cây.'),
(6, N'Làm sao để cây trầu bà leo tường hoặc leo cột tốt?', N'Bạn nên chuẩn bị cọc phủ xơ dừa ẩm ở giữa chậu để rễ khí sinh bám vào, giúp cây leo nhanh và lá to hơn.'),
(6, N'Trầu bà bị héo rũ lá là do đâu?', N'Do thiếu nước trầm trọng hoặc do đất bị nén chặt không thoát nước làm thối rễ, hãy kiểm tra độ ẩm của đất để xử lý.'),

(7, N'Làm sao để cây Lan Ý ra nhiều hoa?', N'Đặt cây ở nơi có ánh sáng gián tiếp sáng sủa (tránh nắng gắt) và bón phân giàu lân định kỳ 2 tháng một lần.'),
(7, N'Tại sao đầu lá Lan Ý bị khô và cháy sậm màu?', N'Do độ ẩm không khí quá thấp hoặc do tưới nước máy có chứa nhiều clo/fluoride. Nên dùng nước đã lọc hoặc nước mưa.'),
(7, N'Cây Lan Ý rũ lá xuống đất có phải đã chết không?', N'Không, đó là cách Lan Ý báo hiệu đang khát nước. Sau khi tưới đẫm nước vài giờ, lá cây sẽ tự động dựng thẳng lại đứng.'),

(8, N'Tại sao cây Hạnh Phúc đột ngột rụng rất nhiều lá xanh?', N'Thường do thay đổi vị trí đột ngột gây sốc nhiệt/sốc ánh sáng, hoặc do đất trồng quá bí bách khiến rễ bị ngạt khí.'),
(8, N'Đất trồng thích hợp nhất cho cây Hạnh Phúc là gì?', N'Đất giàu mùn, tơi xốp, trộn thêm xơ dừa, tro trấu và đá perlite để vừa giữ ẩm vừa thoát nước tốt.'),
(8, N'Cây Hạnh Phúc có cần phun sương lên lá không?', N'Có, cây rất thích độ ẩm cao, việc phun sương nhẹ lên tán lá hàng ngày giúp lá xanh tươi và hạn chế bụi bẩn.'),

(9, N'Xương rồng có cần tưới nước vào mùa đông không?', N'Vào mùa đông nhiệt độ thấp, cây ngủ đông nên hầu như không cần tưới, khoảng 1 tháng tưới một lượng rất nhỏ là đủ.'),
(9, N'Tại sao xương rồng của tôi bị mềm nhũn và chuyển màu đen ở gốc?', N'Đây là dấu hiệu của bệnh thối rễ do tưới quá nhiều nước hoặc đất không thoát nước. Cần cắt bỏ phần thối ngay để cứu cây.'),
(9, N'Làm sao để xương rồng ra hoa rực rỡ?', N'Cho cây phơi nắng trực tiếp ít nhất 6 tiếng mỗi ngày, hạn chế tưới nước và bổ sung phân bón kích hoa thích hợp.'),

(10, N'Cây Ngọc Ngân có trồng thủy canh được không?', N'Có, Ngọc Ngân phát triển rất đẹp khi trồng thủy canh. Cần chú ý rửa sạch rễ đất trước khi cho vào bình nước.'),
(10, N'Làm sao để giữ màu đốm trắng trên lá Ngọc Ngân luôn đẹp?', N'Đặt cây ở nơi có ánh sáng tán xạ vừa đủ. Thiếu sáng sẽ làm lá chuyển hẳn sang màu xanh lục và mất đi các đốm trắng.'),
(10, N'Cây Ngọc Ngân có an toàn cho trẻ em không?', N'Nhựa cây có chứa chất gây ngứa và kích ứng nhẹ niêm mạc. Nên đặt cây ở vị trí cao, tránh tầm tay trẻ em và thú nuôi.');

INSERT INTO KhuyenMai (TenKhuyenMai, PhanTramGiam) VALUES (N'Chào hè', 10), (N'Flash Sale', 50), (N'Black Friday', 30), (N'Mừng khai trương', 20), (N'Tết Nguyên Đán', 15), (N'Ngày của mẹ', 10), (N'8/3 Sale', 12), (N'Cuối tháng', 5), (N'Mua kèm deal sốc', 7), (N'Member Only', 25);
INSERT INTO Anh (TieuDe, LinkAnh) VALUES (N'Kim tiền đại', 'img1.jpg'), (N'Lưỡi hổ vàng', 'img2.jpg'), (N'Monstera lá xẻ', 'img3.jpg'), (N'Sen đá hồng', 'img4.jpg'), (N'Bàng Sing to', 'img5.jpg'), (N'Trầu bà leo', 'img6.jpg'), (N'Lan ý trắng', 'img7.jpg'), (N'Hạnh phúc xanh', 'img8.jpg'), (N'Xương rồng tròn', 'img9.jpg'), (N'Ngọc ngân lá đốm', 'img10.jpg');
INSERT INTO LichSuTiepThi (IDUser, IDBaiViet, IDCayCanh, LoaiNoiDung, TrangThai) VALUES (2, 1, NULL, 'BLOG', 'ACTIVE'), (3, 2, NULL, 'GUIDE', 'ACTIVE'), (4, NULL, 3, 'OTHER', 'ACTIVE'), (5, 5, NULL, 'BLOG', 'ACTIVE'), (7, NULL, 1, 'OTHER', 'INACTIVE'), (8, 7, NULL, 'BLOG', 'ACTIVE'), (9, 3, NULL, 'OTHER', 'ACTIVE'), (10, NULL, 5, 'OTHER', 'ACTIVE'), (2, NULL, 2, 'OTHER', 'ACTIVE'), (3, 10, NULL, 'OTHER', 'ACTIVE');

-- Bảng trung gian
INSERT INTO Anh_BaiViet VALUES (1,1), (1,2), (2,3), (3,4), (5,5), (7,6), (8,7), (9,8), (10,9), (1,10);
INSERT INTO BaiViet_LinkAffiliate VALUES (1,3,1500), (2,4,2100), (5,8,4200), (7,1,500), (3,5,1200);
INSERT INTO BaiViet_CayCanh VALUES (1,2), (1,7), (1,10), (2,3), (5,4), (3,1), (7,6);
INSERT INTO DanhMuc_CayCanh VALUES (1,1), (1,3), (2,2), (2,3), (3,2), (4,4), (5,5), (6,6);
INSERT INTO NguoiDungYeuThich VALUES (2,1), (2,3), (3,2), (5,10), (9,8), (10,1);
INSERT INTO BaiVietYeuThich VALUES (2,1), (2,2), (3,5), (5,7), (10,1);
INSERT INTO CayCanh_KhuyenMai VALUES (1,1), (2,1), (3,3), (4,4), (5,2);
GO


-- Thêm dữ liệu đầy đủ cho 10 cây cảnh
INSERT INTO HuongDanChamSoc (IDCayCanh, AnhSang, CheDoNuoc, DatVaDinhDuong, DoAnToan) 
VALUES 
-- 1. Kim Tiền
(1, N'Cây ưa thích ánh sáng tán xạ nhẹ (sáng gián tiếp khoảng 4-6 giờ/ngày) hoặc chịu bóng râm rất tốt trong nhà. Tuyệt đối tránh đặt cây ở vị trí nhận ánh nắng gay gắt trực tiếp của buổi trưa vì sẽ dễ gây cháy đen lá.', N'Chỉ tưới khi đất khô hoàn toàn, trung bình khoảng 10-14 ngày/lần tùy thời tiết. Cây chịu hạn cực tốt nhờ thân củ mọng nước, nhưng rất sợ ngập úng; tưới quá nhiều sẽ làm thối rễ và rụng lá.', N'Sử dụng đất tơi xốp, giàu mùn và thoát nước cực nhanh (như đất trộn xơ dừa, xỉ than hoặc đá perlite). Nên bón bổ sung phân hữu cơ tan chậm hoặc phân bón lá định kỳ 2-3 tháng/lần để giữ lá luôn xanh bóng.', N'Trong lá và thân cây chứa tinh thể canxi oxalat có thể gây kích ứng da, nóng rát niêm mạc miệng. Nên đặt cây ở vị trí cao, xa tầm tay của trẻ nhỏ và các loài thú cưng (chó, mèo).'),

-- 2. Lưỡi Hổ
(2, N'Thích nghi cực kỳ linh hoạt từ nơi thiếu sáng sâu trong phòng đến nơi có ánh sáng mặt trời mạnh. Tuy nhiên, cây phát triển với sắc thái viền vàng đẹp nhất khi được đón ánh sáng gián tiếp nhẹ mỗi ngày.', N'Khả năng chịu hạn cực cao nhờ lá mọng nước dày. Chỉ tưới nước khi đất khô hẳn đáy chậu, khoảng 2-3 tuần/lần. Tránh tuyệt đối tưới đọng vào tâm lá hoặc tưới quá thường xuyên làm thối gốc.', N'Yêu cầu đất trồng thông thoáng, thoát nước nhanh (như đất pha cát hoặc đá perlite). Cây không cần quá nhiều dinh dưỡng, chỉ cần bón phân vi lượng hoặc phân tan chậm loãng khoảng 2 lần một năm.', N'Chứa độc tính nhẹ đối với động vật. Nếu chó hoặc mèo cắn/nhai lá cây có thể gây buồn nôn, tiêu chảy hoặc kích ứng tiêu hóa. Nên đặt cây trên kệ cao hoặc góc phòng kín.'),
(3, N'Cây ưa ánh sáng tán xạ nhẹ (như dưới tán cây khác hoặc rèm cửa sổ). Nếu thiếu sáng lá mới sẽ nhỏ và không xẻ sâu, còn nếu đặt dưới ánh nắng trực tiếp lá sẽ bị cháy sạm và mất thẩm mỹ.', N'Cần tưới nước định kỳ khoảng 1-2 lần/tuần khi kiểm tra thấy lớp đất mặt sâu khoảng 2-3cm đã khô. Thường xuyên phun sương lên mặt lá hoặc dùng khăn ẩm lau bụi lá để giữ độ ẩm tốt hơn.', N'Đất trồng cần giàu mùn, tơi xốp và thoát nước tốt (phù hợp trộn đất thịt, đá perlite và xơ dừa). Bón phân hữu cơ loãng hoặc phân NPK chuyên dụng mỗi tháng một lần trong mùa sinh trưởng.', N'Nhựa cây có chứa chất độc nhẹ gây ngứa rát niêm mạc và kích ứng da nếu tiếp xúc trực tiếp hoặc nuốt phải. Cần đặt chậu ở khu vực ngoài tầm với của trẻ nhỏ và vật nuôi.'),

-- 4. Sen Đá
(4, N'Cần nhiều ánh sáng tự nhiên trực tiếp, tối thiểu 4-6 tiếng mỗi ngày (tốt nhất là nắng sáng). Thiếu nắng cây sẽ bị vươn dài, lá thưa và mất đi phom dáng tròn xếp lớp đặc trưng.', N'Tưới nước cực kỳ tiết kiệm, chỉ tưới khi lá bắt đầu hơi nhăn hoặc đất khô cằn hoàn toàn (khoảng 1-2 tuần/lần). Tránh tưới trực tiếp lên thân lá và tuyệt đối không để nước đọng ở kẽ lá.', N'Bắt buộc dùng đất trồng chuyên dụng siêu thoát nước (phối trộn đá pumice, perlite, akadama và phân trùn quế). Chỉ cần bón phân lỏng pha thật loãng định kỳ khoảng 1-2 lần mỗi năm.', N'Hoàn toàn lành tính, không chứa bất kỳ độc tố nào, an toàn tuyệt đối cho trẻ nhỏ và các loài thú cưng khi tiếp xúc gần hoặc vô tình cắn phải.'),

-- 5. Bàng Sing
(5, N'Ưa chuộng ánh sáng gián tiếp cường độ mạnh, thích hợp đặt cạnh cửa sổ lớn hoặc ban công có mái che. Nên xoay chậu 90 độ mỗi tuần để cây phát triển thẳng đều, tránh bị nghiêng.', N'Tưới nước vừa phải, khoảng 1-2 lần/tuần khi mặt đất đã khô se sâu 3cm. Không tưới dồn dập khiến rễ bị ngộp nước, cũng không để đất bị khô hạn nứt nẻ quá lâu làm rụng lá.', N'Đất trồng cần tơi xốp, thoáng khí và giàu mùn dinh dưỡng. Định kỳ 2 tháng một lần nên bón phân NPK cân bằng. Thường xuyên lau sạch bụi bám trên lá để cây quang hợp tối ưu.', N'Nhựa cây bàng Singapore có thể gây ngứa rát nhẹ ngoài da hoặc gây kích ứng hệ tiêu hóa đối với chó mèo nếu chúng nhai lá. Nên đặt chậu cây ở vị trí cố định an toàn.'),

-- 6. Trầu Bà
(6, N'Thích nghi rất tốt với ánh sáng yếu, bóng râm hoặc ánh đèn huỳnh quang văn phòng. Lá cây sẽ giữ được các đường vân vàng đẹp mắt nhất khi được đón ánh sáng gián tiếp nhẹ.', N'Tưới nước đều đặn 1-2 lần/tuần để duy trì độ ẩm vừa phải cho đất, tránh ngập úng gây úa vàng lá. Nếu trồng thủy sinh, cần chú ý thay nước và vệ sinh rễ định kỳ 1 tuần/lần.', N'Phù hợp với hầu hết mọi loại đất trồng tơi xốp và giữ ẩm tốt. Bón phân đạm loãng hoặc phân vi sinh định kỳ mỗi tháng một lần để kích thích dây leo phát triển dài và nhanh.', N'Lá và thân chứa tinh thể canxi oxalat gây nóng rát môi, lưỡi và kích ứng cổ họng nếu nuốt phải. Cần treo giỏ cây lên cao hoặc đặt ngoài tầm với của trẻ nhỏ và vật nuôi.'),

-- 7. Lan Ý
(7, N'Phát triển tốt nhất trong môi trường bán râm hoặc thiếu sáng (như phòng ngủ, phòng tắm). Tránh ánh nắng trực tiếp gay gắt vì sẽ làm cháy sém mép lá và làm hoa nhanh héo tàn.', N'Là loài cây ưa ẩm, cần tưới nước 2-3 lần/tuần khi thấy bề mặt đất chậu bắt đầu khô nhẹ. Khi thiếu nước cây sẽ tự động rủ lá xuống, và sẽ tươi tỉnh trở lại rất nhanh sau khi được tưới nước.', N'Sử dụng đất giàu chất dinh dưỡng, giữ ẩm tốt nhưng vẫn đảm bảo thoát nước hiệu quả. Nên tưới bằng nước lọc hoặc nước máy đã để qua đêm nhằm tránh clo làm đầu lá bị cháy khô.', N'Cây có chứa độc tính nhẹ tương tự họ trầu bà, có thể gây sưng rát khoang miệng nếu vật nuôi vô tình nuốt phải. Cần chú ý cẩn thận khi đặt chậu cây dưới sàn nhà.'),

-- 8. Hạnh Phúc
(8, N'Cây ưa chuộng ánh sáng gián tiếp nhẹ, không gian thoáng đãng và có sự lưu thông không khí tốt. Không đặt cây ở nơi quá tối tăm hoặc bí bách vì sẽ làm lá rụng hàng loạt.', N'Tưới nước ở mức độ vừa phải, đều đặn khoảng 1-2 lần/tuần tùy vào độ ẩm phòng. Nên kết hợp phun sương giữ ẩm cho tán lá mỗi ngày để lá luôn giữ được màu xanh mướt mát.', N'Đất trồng cần xốp mịn, nhiều mùn hữu cơ và thoát nước nhanh. Nên bón phân NPK định kỳ 2-3 tháng/lần và thường xuyên cắt tỉa những cành lá khô già để cây giữ phom đẹp.', N'Hoàn toàn thân thiện, không có chứa độc tính, rất an toàn khi trồng trong nhà có trẻ nhỏ năng động hoặc nuôi các loại thú cưng như chó, mèo.'),

-- 9. Xương Rồng
(9, N'Đòi hỏi ánh nắng mặt trời trực tiếp và không khí thông thoáng tối đa, lý tưởng nhất là đặt tại ban công hướng Nam hoặc bậu cửa sổ. Thiếu sáng cây sẽ còi cọc và không ra hoa.', N'Chịu hạn cực tốt nhờ cấu trúc giữ nước dồi dào. Chỉ tưới đẫm gốc khoảng 3-4 tuần một lần khi đất chậu đã khô rang hoàn toàn. Tránh tưới vào những ngày mưa ẩm cao.', N'Yêu cầu đất cát pha sỏi hoặc đá núi lửa (như đá pumice, perlite) thoát nước siêu nhanh. Không cần bón phân nhiều, chỉ bón phân chuyên dùng cho xương rồng vào mùa xuân.', N'Thân cây không độc nhưng hệ thống gai nhọn cứng rất dễ gây trầy xước da hoặc tổn thương khi vô tình va chạm. Cần đặt cây tránh xa khu vực trẻ nhỏ và vật nuôi vui chơi.'),

-- 10. Ngọc Ngân
(10, N'Cần ánh sáng tán xạ vừa phải đến trung bình. Tránh đặt nơi tối tăm quá lâu lá sẽ bị nhạt màu mất đi các đốm bạc, cũng không phơi nắng gắt vì lá sẽ bị cháy sạm bợt màu.', N'Giữ đất ẩm nhẹ, tưới nước khoảng 1-2 lần/tuần khi kiểm tra thấy lớp đất mặt chậu hơi se khô. Nếu trồng thủy sinh cần thay nước sạch và nhỏ thêm dung dịch dinh dưỡng 1 tuần/lần.', N'Đất trồng cần tơi xốp, thoáng khí và giàu mùn hữu cơ. Nên bổ sung phân bón lá dạng loãng định kỳ mỗi tháng để lá cây luôn giữ được màu sắc căng tràn và rực rỡ nhất.', N'Nhựa cây có chứa độc tính nhẹ, có thể gây nóng rát miệng, sưng lưỡi và khó tiêu nếu thú cưng ăn phải. Nên trưng bày trên bàn làm việc cao hoặc tủ kệ để đảm bảo an toàn.');
GO

-----------------------------------------------------------
-- 6. BẢNG ĐỐI TÁC
-----------------------------------------------------------
CREATE TABLE DoiTac (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    TenDoiTac NVARCHAR(255),
    LogoUrl NVARCHAR(MAX),
    Website NVARCHAR(255),
    LoaiHinh NVARCHAR(50),
    TrangThai NVARCHAR(50),
    NgayBatDau DATE,
    HoaHong DECIMAL(5, 2)
);

INSERT INTO DoiTac (TenDoiTac, LogoUrl, Website, LoaiHinh, TrangThai, NgayBatDau, HoaHong) VALUES
('Shopee Vietnam', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg', 'https://shopee.vn', 'Shopee', 'Active', '2023-01-15', 12.5),
('TikTok Shop', 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg', 'https://tiktok.com', 'TikTok', 'Active', '2023-06-20', 15.0),
('Eco Garden', '', 'https://ecogarden.vn', 'Garden Center', 'Active', '2022-11-10', 8.0);
GO

-- Kiểm tra kết quả
SELECT * FROM CayCanh;
SELECT * FROM HuongDanChamSoc;
SELECT * FROM LinkAffiliate;
SELECT * FROM AffiliateOrder;
SELECT * FROM BaiViet;
select * from Anh;
select * from Anh_BaiViet;
select * from BaiViet_CayCanh;
select * from BaiViet_LinkAffiliate;
select * from DanhMucNoiDung;

-- Chỉnh lại cho đúng với tên đặt trong UseRole của backend
UPDATE [User] 
SET vaitro = 'ADMIN' 
WHERE vaitro = 'Admin';

UPDATE [User] 
SET vaitro = 'USER' 
WHERE vaitro = 'User';

-- Chỉnh sửa đường dẫn ảnh cho đúng với tên ảnh trong thư mục Images
UPDATE Anh SET LinkAnh = 'kimtien.png' WHERE ID = 1;
UPDATE Anh SET LinkAnh = 'luoiho.png' WHERE ID = 2;
UPDATE Anh SET LinkAnh = 'monstera.png' WHERE ID = 3;
UPDATE Anh SET LinkAnh = 'senda.png' WHERE ID = 4;
UPDATE Anh SET LinkAnh = 'cay1.png' WHERE ID = 5;
UPDATE Anh SET LinkAnh = 'cay2.png' WHERE ID = 6;
UPDATE Anh SET LinkAnh = 'cay3.png' WHERE ID = 7;
UPDATE Anh SET LinkAnh = 'cay4.png' WHERE ID = 8;

--Cập nhận nội dung của bài viết
--ID1
UPDATE BaiViet SET NoiDung = N'
<p><strong>Không gian sống của bạn đang bị "ngộp thở" bởi bụi mịn và các hợp chất độc hại?</strong> Đã đến lúc mang thiên nhiên vào nhà. Không chỉ là vật trang trí, 10 loại cây dưới đây được NASA và các chuyên gia môi trường mệnh danh là "những chiếc máy lọc sinh học" quyền năng nhất, giúp thanh lọc không khí và mang lại nguồn sống tươi mới cho gia đình bạn.</p>

<blockquote class="expert-note">  
    <strong>Lưu ý chuyên gia:</strong> Để phát huy khả năng lọc không khí tốt nhất, hãy lau bụi trên lá cây hàng tuần. Một chiếc lá sạch sẽ hấp thụ bụi mịn và độc tố hiệu quả hơn gấp đôi so với lá bám bụi.
</blockquote>

<h3>1. Tại sao "Top 10 cây lọc khí" lại là xu hướng tất yếu năm 2026?</h3>
<p>Trong môi trường đô thị hiện đại, các hợp chất hữu cơ dễ bay hơi (VOCs) từ sơn tường, thiết bị điện tử và khói bụi luôn hiện hữu. Việc sở hữu những loài cây lọc khí không chỉ giúp không gian trong lành hơn mà còn là giải pháp phong thủy tuyệt vời để giảm căng thẳng sau ngày dài.</p>

<img src="/images/cay_loc_khi.jpg" alt="Top 10 cây lọc không khí tốt nhất" />

<blockquote class="highlight-quote">
  "Một ngôi nhà có cây xanh là một ngôi nhà có sự sống. Mỗi lá cây bạn trồng chính là một món quà sức khỏe vô giá cho những người thân yêu."
</blockquote>

<h3>2. Danh sách 10 "Chiến binh xanh" thanh lọc không khí</h3>
<p>Dưới đây là 10 gương mặt vàng trong làng lọc khí, vừa đẹp, vừa khỏe, vừa dễ chăm:</p>

<ul class="care-rules">
  <li><strong>1. Cây Lưỡi Hổ:</strong> "Vô địch" lọc khí vào ban đêm, giải phóng oxy ngay cả khi không có ánh sáng.</li>
  <li><strong>2. Cây Lan Ý:</strong> Chuyên gia hấp thụ các loại nấm mốc và hóa chất như formaldehyde, benzene.</li>
  <li><strong>3. Cây Trầu Bà:</strong> Khả năng "ăn" các hợp chất độc hại từ thiết bị điện tử rất mạnh mẽ.</li>
  <li><strong>4. Cây Nhện (Spider Plant):</strong> Loại bỏ tới 90% độc tố formaldehyde trong nhà chỉ trong vài ngày.</li>
  <li><strong>5. Cây Nha Đam:</strong> Không chỉ dưỡng da, nha đam còn báo động tình trạng ô nhiễm không khí qua các đốm nâu trên lá.</li>
  <li><strong>6. Cây Đa Búp Đỏ:</strong> Khả năng chuyển hóa độc tố thành oxy cực nhanh với bộ lá lớn.</li>
  <li><strong>7. Cây Cọ Cảnh:</strong> Đặc biệt hiệu quả trong việc loại bỏ ammonia và các chất khí từ hóa chất tẩy rửa.</li>
  <li><strong>8. Cây Thiết Mộc Lan:</strong> Vừa lọc khí tốt, vừa mang ý nghĩa phong thủy đại cát đại lợi.</li>
  <li><strong>9. Cây Dương Xỉ:</strong> "Máy làm ẩm" tự nhiên, giúp giảm khô da trong không gian có máy lạnh.</li>
  <li><strong>10. Cây Vạn Niên Thanh:</strong> Lọc khí ổn định, phù hợp đặt tại hành lang hoặc cửa sổ.</li>
</ul>

<h3>3. Lời kết</h3>
<p>Đầu tư vào những "máy lọc khí tự nhiên" này không chỉ là một khoản đầu tư cho thẩm mỹ, mà là khoản đầu tư cho sức khỏe lâu dài. Hãy chọn cho mình ít nhất một loài cây phù hợp và bắt đầu thanh lọc không gian sống ngay hôm nay. Chỉ cần một chút chăm sóc, chúng sẽ đền đáp lại cho bạn bằng bầu không khí trong lành và nguồn năng lượng tích cực bất tận.</p>
[PRODUCT_LINK:7]'
WHERE ID = 1;

--ID2
UPDATE BaiViet SET NoiDung = N'
<p><strong>Bạn sở hữu một chậu Monstera (trầu bà lá xẻ) tuyệt đẹp nhưng lá cứ dần vàng úa?</strong> Đừng vội buồn, vì bạn không cô đơn! Monstera là "nữ hoàng" của không gian nội thất, nhưng nàng ta lại cực kỳ "đỏng đảnh" về nhu cầu nước. Tưới thiếu thì lá héo, tưới thừa thì rễ thối – vậy đâu là điểm cân bằng hoàn hảo?</p>

<blockquote class="expert-note">
    <strong>Góc nhìn chuyên gia:</strong> Sai lầm lớn nhất khiến 90% cây Monstera bị chết chính là tưới nước theo "lịch trình cứng nhắc" (ví dụ: ngày nào cũng tưới). Hãy nhớ, cây cần nước dựa trên độ ẩm thực tế của đất, không phải dựa trên đồng hồ của bạn!
</blockquote>

<h3>1. Hiểu về "cơ chế giải khát" của Monstera</h3>
<p>Trong tự nhiên, Monstera sống dưới tán rừng nhiệt đới, nơi đất ẩm nhưng cực kỳ tơi xốp và thoáng khí. Bộ rễ của chúng cần oxy nhiều như cần nước vậy. Nếu đất bị nén chặt và quá ẩm, rễ sẽ bị "ngạt thở" và dẫn đến tình trạng vàng lá, thậm chí thối rễ.</p>

<img src="/images/monstera.png" alt="Cách tưới nước cho cây Monstera" />

<blockquote class="highlight-quote">
  "Tưới nước không chỉ là cung cấp sự sống, đó là hành động thấu hiểu nhu cầu của cây. Một người chơi cây giỏi là người biết lắng nghe tiếng nói từ độ ẩm của đất."
</blockquote>

<h3>2. Quy tắc "Ngón tay vàng" – Bí quyết không bao giờ tưới sai</h3>
<p>Thay vì đoán mò, hãy sử dụng chính đôi tay của mình. Đây là phương pháp đơn giản nhất mà bất kỳ "phù thủy cây cảnh" nào cũng sử dụng:</p>

<ul class="care-rules">
  <li><strong>Bước 1:</strong> Dùng ngón tay trỏ ấn sâu xuống đất khoảng 3-5 cm.</li>
  <li><strong>Bước 2:</strong> Nếu cảm thấy đất vẫn còn ẩm hoặc mát, hãy dừng lại, chưa cần tưới.</li>
  <li><strong>Bước 3:</strong> Nếu đất khô khốc và không bám dính vào ngón tay, đó chính là lúc "cần giải khát" cho cây.</li>
</ul>

<h3>3. Kỹ thuật tưới sâu – Đánh thức bộ rễ</h3>
<p>Khi đã đến lúc tưới, hãy tưới cho "tới nơi tới chốn":</p>
<ul class="care-rules">
  <li><strong>Tưới đẫm:</strong> Tưới chậm quanh gốc cho đến khi thấy nước bắt đầu thoát ra ở lỗ đáy chậu. Điều này đảm bảo toàn bộ hệ thống rễ đều được tiếp nước.</li>
  <li><strong>Đổ bỏ nước thừa:</strong> Sau khi tưới xong, đừng để chậu cây ngâm trong đĩa hứng đầy nước. Hãy đổ bỏ phần nước thừa đi ngay để tránh rễ bị úng.</li>
  <li><strong>Phun sương lá:</strong> Monstera rất thích độ ẩm không khí. Hãy dùng bình xịt phun sương nhẹ nhàng lên lá 1-2 lần/tuần để giữ lá luôn bóng mượt.</li>
</ul>

<h3>4. Lời kết</h3>
<p>Chăm sóc một chậu Monstera không khó như bạn nghĩ, chỉ cần một chút kiên nhẫn và quan sát. Khi bạn nắm vững "nhịp điệu" tưới nước, nàng Monstera sẽ trả ơn bạn bằng những chiếc lá xẻ độc đáo và tốc độ lớn nhanh chóng mặt. Hãy cùng bắt đầu thói quen chăm cây nhẹ nhàng từ hôm nay nhé!</p>
[PRODUCT_LINK:3]'
WHERE ID = 2;

--ID3
UPDATE BaiViet SET NoiDung = N'
<p><strong>Bạn là người mệnh Kim và đang tìm kiếm một "lá bùa xanh" để bàn làm việc?</strong> Trong phong thủy, việc chọn cây không chỉ để làm đẹp, mà còn là cách để gia tăng sinh khí, cân bằng năng lượng và thu hút may mắn cho sự nghiệp. Đối với người mệnh Kim, những loài cây phù hợp chính là chìa khóa để khai mở những cơ hội mới.</p>

<blockquote class="expert-note">  
    <strong>Lời khuyên từ chuyên gia:</strong> Người mệnh Kim tượng trưng cho sự sắc sảo, kiên định và sức mạnh. Do đó, những loài cây có dáng lá cứng cáp, màu sắc tươi sáng như trắng, vàng hoặc ánh kim sẽ cộng hưởng năng lượng cực tốt cho bản mệnh của bạn.
</blockquote>

<h3>1. Tại sao người mệnh Kim cần một "người bạn xanh" phù hợp?</h3>
<p>Trong ngũ hành, "Kim" đại diện cho kim loại, sự cứng cáp và tính bao dung. Một không gian làm việc hay nhà ở của người mệnh Kim nếu thiếu đi mảng xanh thường dễ trở nên khô khan, căng thẳng. Cây phong thủy đóng vai trò như bộ lọc năng lượng, giúp làm mềm không gian và thúc đẩy luồng khí vượng, giúp bạn làm việc hiệu quả hơn.</p>

<img src="/images/cay_menh_kim.jpg" alt="Các loại cây phong thủy hợp mệnh Kim" />

<blockquote class="highlight-quote">
  "Cây xanh không chỉ đứng yên, chúng là những trạm phát năng lượng. Chọn đúng loài cây hợp mệnh là bạn đang chọn đúng người cộng sự thầm lặng cho sự thành công của mình."
</blockquote>

<h3>2. Danh sách "Bộ ba tài lộc" cho người mệnh Kim</h3>
<p>Dưới đây là 3 cái tên tiêu biểu nhất, đáp ứng hoàn hảo cả yếu tố thẩm mỹ và phong thủy cho bạn:</p>

<ul class="care-rules">
  <li><strong>Cây Bạch Mã Hoàng Tử:</strong> Mang dáng dấp của một quý tộc, loài cây này giúp sự nghiệp của người mệnh Kim luôn tiến triển thuận lợi, tránh được những rắc rối không đáng có.</li>
  <li><strong>Cây Lan Ý:</strong> Với sắc lá xanh mướt điểm xuyết bông hoa trắng tinh khôi, Lan Ý giúp cân bằng âm dương, hấp thụ năng lượng tiêu cực và mang lại cảm giác bình an trong tâm hồn.</li>
  <li><strong>Cây Kim Tiền:</strong> Không cần giới thiệu quá nhiều, Kim Tiền chính là "báu vật" trong làng phong thủy. Đúng như tên gọi, nó thu hút tài lộc, tiền bạc và sự phú quý bền vững cho gia chủ.</li>
</ul>

<h3>3. Bí quyết đặt cây để "Kích hoạt" năng lượng</h3>
<p>Để đạt hiệu quả phong thủy tối đa, vị trí đặt cây cũng cực kỳ quan trọng:</p>
<ul class="care-rules">
  <li><strong>Trên bàn làm việc:</strong> Đặt cây ở góc trái để thu hút may mắn và các mối quan hệ xã giao tốt đẹp.</li>
  <li><strong>Phòng khách:</strong> Đặt nơi có ánh sáng tốt để cây luôn xanh tươi, biểu trưng cho sự phát triển không ngừng của tiền tài.</li>
  <li><strong>Tránh đặt cây trong phòng tắm:</strong> Đối với người mệnh Kim, nơi ẩm thấp và thiếu sáng sẽ làm suy giảm sinh khí của cây.</li>
</ul>

<h3>4. Lời kết</h3>
<p>Chọn cây phong thủy hợp mệnh Kim không đơn thuần là chọn một loài cây, mà là chọn một nguồn năng lượng phù hợp để đồng hành. Hy vọng với những gợi ý trên, bạn sẽ tìm được "tri kỷ xanh" giúp cuộc sống và sự nghiệp của mình thêm phần rực rỡ, thịnh vượng. Hãy bắt đầu ngay hôm nay nhé!</p>
[PRODUCT_LINK:1]'
WHERE ID = 3;

--ID4
UPDATE BaiViet SET NoiDung = N'
<p><strong>Năm 2026 đang mở ra một kỷ nguyên mới cho không gian sống: nơi sự sang trọng không nằm ở sự phô trương, mà ở cách chúng ta hòa quyện thiên nhiên vào từng góc nhỏ.</strong> Bạn đã sẵn sàng để "thay áo mới" cho ngôi nhà của mình theo những xu hướng dẫn đầu năm 2026 chưa?</p>

<blockquote class="expert-note">  
    <strong>Lời khuyên từ chuyên gia:</strong> Xu hướng chủ đạo của năm 2026 là "Sống chậm và Tận hưởng". Đừng cố gắng lấp đầy mọi ngóc ngách bằng đồ đạc, hãy để không gian thở bằng những "khoảng xanh" có mục đích.
</blockquote>

<h3>1. Sự lên ngôi của phong cách "Minimalist Xanh"</h3>
<p>Minimalist (tối giản) chưa bao giờ lỗi thời, nhưng vào năm 2026, nó được nâng tầm lên thành "Minimalist Xanh". Đây là sự kết hợp hoàn hảo giữa những đường nét kiến trúc hình khối và sự mềm mại, phóng khoáng của cây lá nhiệt đới.</p>

<img src="/images/xu_huong_2026.png" alt="Xu hướng trang trí nội thất năm 2026" />

<blockquote class="highlight-quote">
  "Một ngôi nhà đúng chất 2026 là nơi mà mỗi chậu cây đều có một câu chuyện, và mỗi món đồ nội thất đều tôn vinh vẻ đẹp của sự giản đơn."
</blockquote>

<h3>2. Ba điểm nhấn quan trọng trong xu hướng 2026</h3>
<p>Nếu bạn muốn biến không gian làm việc hoặc nhà ở trở thành một nơi thời thượng, hãy chú ý đến 3 yếu tố sau:</p>

<ul class="care-rules">
  <li><strong>Vườn đứng thông minh (Smart Vertical Garden):</strong> Tận dụng các bức tường trống để lắp đặt hệ thống vườn đứng tích hợp tưới tự động. Đây là "cứu cánh" cho những căn hộ có diện tích khiêm tốn.</li>
  <li><strong>Chất liệu hữu cơ tự nhiên:</strong> Sự trở lại của gốm thô, đá tự nhiên và mây tre đan. Những chất liệu này tạo ra sự tương phản tuyệt vời với các thiết bị công nghệ hiện đại.</li>
  <li><strong>Ánh sáng nhân tạo mô phỏng tự nhiên:</strong> Việc sử dụng đèn LED phổ quang đầy đủ để hỗ trợ cây phát triển ngay cả ở những góc thiếu sáng đã trở thành tiêu chuẩn của nội thất cao cấp.</li>
</ul>

<h3>3. Làm sao để bắt nhịp xu hướng mà không tốn kém?</h3>
<p>Bạn không cần phải cải tạo toàn bộ ngôi nhà để theo kịp xu hướng. Hãy bắt đầu từ những thay đổi nhỏ:</p>
<ul class="care-rules">
  <li><strong>Chọn "cây chủ đạo":</strong> Thay vì 10 cây nhỏ, hãy chọn 1 cây lớn (như Bàng Singapore hoặc Monstera) để làm điểm nhấn chính cho phòng khách.</li>
  <li><strong>Đổi mới phụ kiện:</strong> Chỉ cần thay đổi tất cả chậu cây sang cùng một tông màu trung tính (trắng, xám, đất nung), bạn sẽ thấy không gian gọn gàng hơn hẳn.</li>
</ul>

<h3>4. Lời kết</h3>
<p>Xu hướng trang trí 2026 thực chất là sự quay về với giá trị cốt lõi: sự thoải mái và sức khỏe tinh thần. Đừng chạy theo số đông, hãy tạo nên một "căn cứ" mang đậm dấu ấn cá nhân của chính bạn. Chúc bạn sớm biến không gian sống của mình thành nơi mà mỗi khi trở về, bạn đều cảm thấy được yêu thương và tái tạo năng lượng.</p>
[PRODUCT_LINK:6]'
WHERE ID = 4;

--ID5
UPDATE BaiViet SET NoiDung = N'
<p><strong>Bạn đã từng "phải lòng" những đóa sen đá bé xíu xinh xắn nhưng lại e ngại vì sợ chúng... "đoản mệnh"?</strong> Đừng lo, sen đá không hề khó tính như bạn nghĩ! Bí quyết nằm ở việc chọn đúng "chiến binh" phù hợp với người mới bắt đầu. Dưới đây là 5 loại sen đá cực kỳ "dễ tính", sống khỏe và cực kỳ bắt mắt để bạn khởi đầu hành trình làm vườn của mình.</p>

<blockquote class="expert-note">  
    <strong>Lời khuyên từ chuyên gia:</strong> Sen đá "ngủ" rất ít nhưng cần "thở" rất nhiều. Đừng đặt chúng trong phòng kín quá lâu. Hãy cho chúng tắm nắng nhẹ nhàng vào mỗi buổi sáng, bạn sẽ thấy sự khác biệt về màu sắc của chúng chỉ sau vài tuần.
</blockquote>

<h3>1. Tại sao sen đá là "người bạn xanh" lý tưởng nhất?</h3>
<p>Sen đá không chỉ là vật trang trí nhỏ gọn cho bàn làm việc, chúng còn là những bậc thầy về tiết kiệm nước. Nhờ khả năng tích trữ nước trong lá, chúng có thể vượt qua những ngày bạn bận rộn quên tưới. Hơn nữa, nhìn ngắm những chiếc lá mọng nước vươn mình mỗi ngày là một liều thuốc tinh thần cực kỳ hiệu quả.</p>

<img src="/images/sen_da_moi.jpg" alt="Các loại sen đá dễ chăm cho người mới" />

<blockquote class="highlight-quote">
  "Sen đá không cần quá nhiều sự chăm sóc, chúng cần sự thấu hiểu. Khi bạn cho chúng đủ nắng, chúng sẽ nở hoa ngay trên lá."
</blockquote>

<h3>2. Top 5 "Chiến binh xanh" cho người mới bắt đầu</h3>
<p>Dưới đây là danh sách những loài sen đá "siêu khỏe", chịu khó và cực kỳ dễ chăm sóc cho những ai mới bước vào thế giới sen:</p>

<ul class="care-rules">
  <li><strong>Sen đá nâu (Sen đá socola):</strong> Loài sen đá "quốc dân" với sắc nâu trầm ấm. Chúng cực kỳ ưa nắng, càng nắng càng đậm màu, cực kỳ ít bệnh tật.</li>
  <li><strong>Sen đá móng rồng:</strong> Với những đường vân trắng nổi bật trên nền lá xanh, đây là loài sen đá "lì lợm" nhất. Nó có thể chịu được ánh sáng yếu và không đòi hỏi quá nhiều nước.</li>
  <li><strong>Sen đá Kim cương:</strong> Cái tên nói lên tất cả, những chiếc lá trong suốt như pha lê. Đây là loài cây lý tưởng để đặt cạnh cửa sổ, nơi ánh sáng xuyên qua khiến cây như bừng sáng.</li>
  <li><strong>Sen đá hồng (Sen đá thạch ngọc):</strong> Màu hồng phấn ngọt ngào sẽ làm "tan chảy" bất cứ ai. Chúng phát triển khá nhanh và rất dễ nhân giống từ lá.</li>
  <li><strong>Sen đá Phật bà:</strong> Với những chiếc lá xếp tầng như hình đài sen, loài này mang vẻ đẹp cổ điển và sự kiên trì, rất phù hợp để làm điểm nhấn trang trí.</li>
</ul>

<h3>3. "Bỏ túi" bí kíp chăm sóc sen đá bền lâu</h3>
<p>Đừng để sen đá bị "hại" bởi sự tận tâm thái quá của bạn:</p>
<ul class="care-rules">
  <li><strong>Nguyên tắc tưới:</strong> Hãy tưới vào đất, đừng tưới lên lá. Nước đọng lại trên lá lâu ngày sẽ làm lá bị thối và nhũn.</li>
  <li><strong>Đất trồng:</strong> Tuyệt đối không dùng đất thịt. Hãy sử dụng hỗn hợp giá thể thoát nước cực nhanh (đá Perlite, sỏi nhẹ trộn cùng đất sạch).</li>
  <li><strong>Ánh sáng:</strong> Nếu đặt trong phòng, hãy mang cây ra tắm nắng nhẹ ít nhất 2-3 giờ mỗi ngày.</li>
</ul>

<h3>4. Lời kết</h3>
<p>Mỗi chậu sen đá là một thế giới thu nhỏ. Dù bạn chỉ mới bắt đầu hay đã là một "người chơi" lâu năm, những đóa sen đá vẫn luôn mang lại sự bình yên lạ kỳ. Hãy chọn ngay một em sen đá xinh xắn, đặt lên bàn và cùng tận hưởng niềm vui khi thấy chúng lớn lên từng ngày nhé!</p>
[PRODUCT_LINK:4]'
WHERE ID = 5;

--ID6
UPDATE BaiViet SET NoiDung = N'
<p><strong>Cây Lưỡi Hổ từ lâu đã được mệnh danh là "vị vua" trong các dòng cây nội thất nhờ sức sống vô cùng bền bỉ.</strong> Thế nhưng, ngay cả một "chiến binh" mạnh mẽ nhất cũng có lúc cần sự bảo vệ. Việc xuất hiện các đốm lạ hay lá bị héo không có nghĩa là bạn thất bại, đó chỉ là tín hiệu nhắc nhở rằng cây đang cần sự hỗ trợ của bạn.</p>

<blockquote class="expert-note">  
    <strong>Lời khuyên từ chuyên gia:</strong> Lưỡi Hổ rất ghét sự ẩm ướt quá mức. 90% các vấn đề về sâu bệnh trên loài cây này đều bắt nguồn từ một lý do duy nhất: "Tưới nước quá nhiều". Một bộ rễ khỏe mạnh chính là hàng rào phòng bệnh tốt nhất.
</blockquote>

<h3>1. "Bắt bệnh" cho Lưỡi Hổ: Những dấu hiệu cần cảnh giác</h3>
<p>Dù ít khi bị tấn công bởi sâu bệnh, nhưng nếu không gian sống quá bí bách, Lưỡi Hổ vẫn có thể đối mặt với một số vấn đề sau:</p>

<img src="/images/luoi_ho_benh.jpg" alt="Phòng và trị bệnh cho cây Lưỡi Hổ" />

<ul class="care-rules">
  <li><strong>Lá xuất hiện đốm nâu hoặc nhũn nước:</strong> Đây là dấu hiệu của bệnh thối gốc hoặc nấm do đất quá ẩm hoặc thoát nước kém.</li>
  <li><strong>Rệp sáp (những đốm trắng li ti):</strong> Thường xuất hiện ở nách lá, hút nhựa cây khiến lá bị vàng và biến dạng.</li>
  <li><strong>Lá bị héo quắt:</strong> Nếu không phải do thiếu nước, thì có thể rễ đã bị thối, không thể hấp thụ được chất dinh dưỡng.</li>
</ul>

<blockquote class="highlight-quote">
  "Phòng bệnh hơn chữa bệnh. Một không gian sạch sẽ, thoáng đãng chính là liều thuốc kháng sinh tự nhiên tốt nhất cho cây của bạn."
</blockquote>

<h3>2. Bí quyết "vàng" để phòng tránh sâu bệnh</h3>
<p>Để Lưỡi Hổ luôn giữ được sắc xanh quyền năng, hãy áp dụng ngay các quy tắc chăm sóc phòng thủ sau:</p>

<ul class="care-rules">
  <li><strong>Kiểm soát nước tưới:</strong> Chỉ tưới khi lớp đất mặt đã khô hoàn toàn. Đối với Lưỡi Hổ, thà để đất khô hơn là để đất sũng nước.</li>
  <li><strong>Vệ sinh lá định kỳ:</strong> Dùng khăn ẩm sạch lau bụi bẩn trên lá ít nhất 2 tuần/lần. Việc này vừa giúp lá quang hợp tốt hơn, vừa giúp bạn sớm phát hiện sự hiện diện của rệp sáp.</li>
  <li><strong>Đảm bảo lưu thông không khí:</strong> Đừng đặt cây trong góc khuất bí bách. Một luồng gió nhẹ nhàng tự nhiên sẽ giúp cây khô ráo và tránh được sự phát triển của nấm mốc.</li>
</ul>

<h3>3. "Phản ứng nhanh" khi cây có dấu hiệu bệnh</h3>
<p>Nếu chẳng may cây gặp vấn đề, đừng quá lo lắng, hãy xử lý theo quy trình:</p>
<ul class="care-rules">
  <li><strong>Đối với rệp sáp:</strong> Dùng bông gòn thấm dung dịch cồn loãng hoặc xà phòng pha loãng lau sạch vùng bị bệnh. Thực hiện liên tục trong vài ngày cho đến khi sạch hẳn.</li>
  <li><strong>Đối với thối gốc:</strong> Cần lấy cây ra khỏi chậu ngay, cắt bỏ phần rễ/lá bị thối bằng dao sạch, sau đó để cây "nghỉ ngơi" nơi thoáng gió 1-2 ngày trước khi trồng lại vào đất mới sạch khuẩn.</li>
</ul>

<h3>4. Lời kết</h3>
<p>Lưỡi Hổ là loài cây mang đến sự bình an và bảo vệ gia chủ. Khi bạn chăm sóc chúng cẩn thận, chúng cũng sẽ bảo vệ không gian sống của bạn khỏi những độc tố không khí. Hy vọng những chia sẻ trên sẽ giúp bạn tự tin hơn trong việc "làm bạn" với loài cây tuyệt vời này. Hãy cùng Lưỡi Hổ tận hưởng một không gian xanh sạch và tràn đầy sức sống nhé!</p>
[PRODUCT_LINK:2]'
WHERE ID = 6;

--ID7
UPDATE BaiViet SET NoiDung = N'
<p><strong>Bạn có bao giờ cảm thấy cạn kiệt ý tưởng sau vài giờ làm việc liên tục?</strong> Đôi khi, giải pháp không nằm ở việc uống thêm một tách cà phê, mà nằm ở việc thay đổi không gian xung quanh bạn. Một góc làm việc có cây xanh không chỉ là điểm nhấn thẩm mỹ, mà còn là "trạm sạc" tinh thần giúp bạn lấy lại cảm hứng và sự tập trung chỉ trong vài giây nhìn ngắm.</p>

<blockquote class="expert-note">  
    <strong>Lời khuyên từ chuyên gia:</strong> Bàn làm việc thường là nơi có diện tích hạn chế và ánh sáng không quá dồi dào. Hãy ưu tiên các loài cây "ít đòi hỏi", có khả năng chịu bóng tốt và không cần tưới nước thường xuyên để tránh làm hỏng các thiết bị điện tử bên cạnh.
</blockquote>

<h3>1. Tại sao bàn làm việc cần phải có cây xanh?</h3>
<p>Nghiên cứu chỉ ra rằng việc đưa thiên nhiên vào không gian làm việc giúp giảm căng thẳng, tăng khả năng sáng tạo và làm dịu mắt sau nhiều giờ nhìn màn hình máy tính. Không gian xanh giúp nhịp tim của bạn ổn định hơn, tạo ra trạng thái làm việc "tĩnh tại" nhưng tràn đầy năng lượng.</p>

<img src="/images/setup_ban_lam_viec.jpg" alt="Setup bàn làm việc với cây xanh" />

<blockquote class="highlight-quote">
  "Góc làm việc là nơi nuôi dưỡng những ý tưởng lớn. Đừng để nó khô khan, hãy để cây xanh làm bạn đồng hành, làm mát tâm hồn và khơi gợi sự sáng tạo."
</blockquote>

<h3>2. Top 3 "ứng cử viên" sáng giá cho bàn làm việc</h3>
<p>Để setup một góc làm việc xanh chuẩn phong cách 2026, hãy ưu tiên những loài cây vừa nhỏ gọn, vừa mang ý nghĩa phong thủy tốt:</p>

<ul class="care-rules">
  <li><strong>Kim tiền mini:</strong> Đúng như tên gọi, đây là biểu tượng của sự may mắn và tài lộc. Chúng rất bền bỉ, không cần tưới nhiều, phù hợp hoàn hảo với nhịp sống bận rộn.</li>
  <li><strong>Trầu bà đế vương:</strong> Mang ý nghĩa của sự quyền lực và thăng tiến. Màu sắc lá đa dạng từ xanh thẫm đến vàng nhạt giúp góc làm việc của bạn trở nên sang trọng hơn hẳn.</li>
  <li><strong>Cây không khí (Tillandsia):</strong> Đây là "vua" của sự tiện lợi. Không cần đất, không cần chậu, bạn có thể treo chúng lên hoặc đặt trên một giá đỡ gỗ nhỏ. Cực kỳ sạch sẽ và hiện đại.</li>
</ul>

<h3>3. Bí quyết Setup góc xanh khoa học</h3>
<p>Đừng đặt cây một cách ngẫu hứng. Hãy áp dụng tư duy "bố cục" để không gian trở nên chuyên nghiệp hơn:</p>
<ul class="care-rules">
  <li><strong>Nguyên tắc "tầng lớp":</strong> Đặt cây ở góc bàn, tránh chắn tầm mắt khi sử dụng máy tính. Nếu bàn nhỏ, hãy sử dụng các loại kệ nhỏ để tận dụng không gian theo chiều dọc.</li>
  <li><strong>Chọn chậu đồng bộ:</strong> Đầu tư một bộ chậu có cùng tông màu (trắng sứ, đen nhám hoặc gốm đất nung) sẽ giúp bàn làm việc trông gọn gàng, tinh tế và chuyên nghiệp hơn rất nhiều.</li>
  <li><strong>Kết hợp ánh sáng:</strong> Nếu bàn làm việc thiếu sáng, hãy chọn một chiếc đèn học có ánh sáng trung tính – nó vừa giúp bạn làm việc tốt, vừa giúp cây quang hợp nhẹ nhàng.</li>
</ul>

<h3>4. Lời kết</h3>
<p>Góc làm việc chính là tấm gương phản chiếu tâm hồn và sự chỉn chu của mỗi người. Một chút xanh không chỉ mang lại thẩm mỹ, mà còn là sự chăm sóc bản thân cần thiết. Hãy bắt đầu ngay hôm nay, chọn cho mình một người bạn xanh để mỗi ngày làm việc đều trở thành một hành trình đầy cảm hứng. Bạn đã sẵn sàng "nâng cấp" góc làm việc của mình chưa?</p>
[PRODUCT_LINK:8]'
WHERE ID = 7;

--ID8
UPDATE BaiViet SET NoiDung = N'
<p><strong>Xương rồng – những "gã khổng lồ" kiên cường trong thế giới thực vật.</strong> Nhiều người vẫn lầm tưởng xương rồng chỉ là những cây có gai nhọn, sống đơn độc nơi sa mạc. Nhưng thực tế, thế giới xương rồng vô cùng đa dạng, từ những dạng cầu tròn đáng yêu đến những thân cột cao lớn uy nghi hay những loại có hoa rực rỡ như những nữ hoàng.</p>

<blockquote class="expert-note">  
    <strong>Lời khuyên từ chuyên gia:</strong> Xương rồng không chỉ phân biệt bằng hình dáng, mà còn bằng môi trường sống nguyên thủy của chúng. Hiểu được đặc tính của từng nhóm sẽ giúp bạn thiết lập chế độ tưới nước và ánh sáng "chuẩn không cần chỉnh".
</blockquote>

<h3>1. Tại sao xương rồng lại thu hút đến vậy?</h3>
<p>Sức hút của xương rồng nằm ở vẻ đẹp của sự gai góc và kiên cường. Trong phong thủy, xương rồng còn được xem là loài cây có khả năng xua đuổi tà khí, bảo vệ không gian sống, đồng thời là biểu tượng của ý chí vượt khó vươn lên.</p>

<img src="/images/xuong_rong_phan_loai.jpg" alt="Phân biệt các loại xương rồng" />

<blockquote class="highlight-quote">
  "Gai nhọn không chỉ để tự vệ, đó là cách xương rồng giữ lại từng giọt nước quý giá cho chính mình giữa cái nắng khắc nghiệt."
</blockquote>

<h3>2. Ba nhóm xương rồng cơ bản bạn cần biết</h3>
<p>Để bắt đầu chơi xương rồng, bạn hãy làm quen với 3 nhóm đặc trưng này:</p>

<ul class="care-rules">
  <li><strong>Nhóm xương rồng thân cột:</strong> Đây là biểu tượng của sự uy nghi. Với thân cây cao lớn, vững chãi, chúng cực kỳ phù hợp để làm điểm nhấn ở góc phòng khách hoặc hiên nhà. Nhóm này cần rất nhiều nắng để giữ dáng thẳng.</li>
  <li><strong>Nhóm xương rồng thân tròn (Xương rồng bánh bao):</strong> Vẻ ngoài tròn trịa, đáng yêu khiến chúng trở thành món quà tuyệt vời cho bàn làm việc. Chúng nhỏ gọn, dễ chăm và là lựa chọn hàng đầu cho những người yêu thích sự tinh giản.</li>
  <li><strong>Nhóm xương rồng Bát Tiên:</strong> Khác với các dòng xương rồng sa mạc truyền thống, Bát Tiên vừa có gai, vừa có lá và điểm nhấn là những bông hoa rực rỡ. Chúng ưa ẩm hơn một chút và cần môi trường thoáng đãng để ra hoa quanh năm.</li>
</ul>

<h3>3. Làm sao để xương rồng luôn khỏe mạnh?</h3>
<p>Dù là nhóm nào, xương rồng cũng có những "nguyên tắc sống" không thể phá vỡ:</p>
<ul class="care-rules">
  <li><strong>Ánh sáng là tất cả:</strong> Nếu thiếu nắng, xương rồng sẽ bị "vươn dài" (bị ố), thân cây sẽ mất đi vẻ chắc khỏe vốn có. Hãy đặt chúng ở nơi đón nắng trực tiếp ít nhất 4-6 tiếng/ngày.</li>
  <li><strong>Chế độ nước "ngược đời":</strong> Đừng tưới khi đất còn ẩm. Xương rồng thà chịu khát còn hơn bị úng nước. Hãy tưới thật đẫm, sau đó để đất khô hẳn trong vài tuần rồi mới tưới tiếp.</li>
  <li><strong>Giá thể thoát nước:</strong> Luôn đảm bảo đất trồng có tỉ lệ đá (Perlite, Pumice) cao hơn đất mùn.</li>
</ul>

<h3>4. Lời kết</h3>
<p>Xương rồng là minh chứng sống động rằng vẻ đẹp có thể tồn tại ngay cả trong những điều kiện khắc nghiệt nhất. Hy vọng với bảng phân loại đơn giản này, bạn đã tự tin hơn để chọn cho mình một người bạn xương rồng phù hợp. Hãy kiên nhẫn, hãy cho chúng đủ nắng, và bạn sẽ thấy chúng đáp lại bằng những hình thái đầy mê hoặc!</p>
[PRODUCT_LINK:9]'
WHERE ID = 8;

--ID9
UPDATE BaiViet SET NoiDung = N'
<p><strong>Bạn đã bao giờ tự hỏi tại sao sen đá ở tiệm luôn căng mọng, còn khi mang về nhà chỉ vài tuần đã úng rễ?</strong> Bí mật không nằm ở "bàn tay vàng" của người bán, mà nằm ở "công thức đất" mà họ sử dụng. Với sen đá, đất trồng chính là chiếc giường êm ái nhất, nơi rễ cây có thể hít thở và phát triển mạnh mẽ.</p>

<blockquote class="expert-note">  
    <strong>Lời khuyên từ chuyên gia:</strong> Đất trồng sen đá không cần giàu dinh dưỡng, nó cần sự thông thoáng. Đừng dùng đất thịt hay đất vườn, vì chúng sẽ trở thành "hầm ngục" khiến rễ cây bị nghẹt thở và thối rữa chỉ sau một cơn mưa.
</blockquote>

<h3>1. Tại sao phải tự trộn đất thay vì dùng đất bao sẵn?</h3>
<p>Hầu hết các loại đất trộn sẵn ngoài cửa hàng thường giữ ẩm quá lâu. Sen đá vốn là loài cây chịu hạn, nếu rễ cây phải "ngâm" trong môi trường ẩm ướt liên tục, nguy cơ bị nấm bệnh và thối rễ là rất cao. Tự trộn đất giúp bạn kiểm soát được độ thoát nước theo đúng môi trường sống của cây.</p>

<img src="/images/dat_sen_da.jpg" alt="Công thức trộn đất trồng sen đá" />

<blockquote class="highlight-quote">
  "Một hỗn hợp đất lý tưởng là hỗn hợp mà khi bạn tưới nước, nước sẽ chảy qua chậu chỉ trong vài giây."
</blockquote>

<h3>2. "Công thức vàng" cho mọi loại sen đá</h3>
<p>Để trộn đất trồng sen đá đạt chuẩn, bạn cần tuân thủ tỉ lệ "thoát nước là trên hết". Công thức gợi ý của các chuyên gia:</p>

<ul class="care-rules">
  <li><strong>40% Đá Perlite:</strong> Giúp đất tơi xốp, tạo các khe hở nhỏ để rễ cây "thở" dễ dàng.</li>
  <li><strong>40% Đá Pumice (Đá nham thạch):</strong> Giữ độ thoáng cho chậu và giúp rễ bám chặt hơn.</li>
  <li><strong>20% Đất mùn hữu cơ (hoặc phân trùn quế):</strong> Cung cấp một chút dinh dưỡng cần thiết mà không làm đất bị bí chặt.</li>
</ul>

<h3>3. Các bước thực hiện chuyên nghiệp</h3>
<p>Hãy biến việc trộn đất thành một trải nghiệm thư giãn:</p>
<ul class="care-rules">
  <li><strong>Sàng lọc:</strong> Sàng qua đất mùn để loại bỏ các hạt lớn hoặc rác vụn, giúp đất mịn và sạch hơn.</li>
  <li><strong>Khử trùng:</strong> Trước khi trộn, hãy phơi nắng gắt hoặc nướng nhẹ hỗn hợp đất để loại bỏ hoàn toàn nấm bệnh và trứng côn trùng.</li>
  <li><strong>Lót đáy chậu:</strong> Đừng quên đặt một lớp sỏi nhẹ hoặc đá Pumice lớn dưới đáy chậu để hỗ trợ tối đa việc thoát nước.</li>
</ul>

<h3>4. Lời kết</h3>
<p>Việc tự tay trộn đất không chỉ đảm bảo sức khỏe cho cây mà còn là cách để bạn hiểu hơn về nhu cầu của chúng. Khi bạn tự tay chuẩn bị từng nguyên liệu, bạn sẽ thấy mình gắn kết với cây hơn. Hãy kiên nhẫn, thử nghiệm và điều chỉnh tỉ lệ tùy theo độ ẩm ở nơi bạn đặt cây. Chúc bạn có những chậu sen đá khỏe mạnh và bung nở rạng rỡ!</p>
[PRODUCT_LINK:4]'
WHERE ID = 9;

--ID10
UPDATE BaiViet SET NoiDung = N'
<p><strong>Chào mừng cộng đồng yêu cây tại Đà Nẵng đến với sự kiện mong chờ nhất trong năm 2026!</strong> Triển lãm cây cảnh không chỉ là nơi hội tụ của những "tác phẩm xanh" độc đáo mà còn là điểm đến lý tưởng để kết nối những tâm hồn đồng điệu, những nghệ nhân yêu cái đẹp và sự sống.</p>

<blockquote class="expert-note">  
    <strong>Thông tin từ Ban tổ chức:</strong> Triển lãm năm nay không chỉ trưng bày, mà còn là không gian giao lưu kỹ thuật chăm sóc cây quý hiếm. Đây là cơ hội hiếm hoi để bạn tận mắt chiêm ngưỡng những tác phẩm bonsai "độc bản" từ mọi miền Tổ quốc.
</blockquote>

<h3>1. Tại sao sự kiện này là "bến đỗ" cho người yêu cây?</h3>
<p>Đà Nẵng vốn được biết đến là thành phố đáng sống, và sự kiện triển lãm cây cảnh năm nay chính là điểm nhấn tôn vinh phong cách sống xanh mà người dân nơi đây đang theo đuổi. Từ những dáng cây cổ thụ uy nghi đến những góc nội thất tinh tế, triển lãm mở ra một cái nhìn toàn diện về vẻ đẹp của thiên nhiên trong không gian đô thị hiện đại.</p>

<img src="/images/trien_lam_danang.jpg" alt="Sự kiện triển lãm cây cảnh Đà Nẵng 2026" />

<blockquote class="highlight-quote">
  "Cây cảnh không chỉ là vật vô tri, mỗi tác phẩm tại triển lãm là kết tinh của sự kiên trì, đam mê và tình yêu mãnh liệt của người nghệ nhân đối với thiên nhiên."
</blockquote>

<h3>2. Những hoạt động tâm điểm không thể bỏ lỡ</h3>
<p>Để tối ưu hóa trải nghiệm của bạn tại triển lãm, hãy lưu ý những hoạt động đặc sắc sau:</p>

<ul class="care-rules">
  <li><strong>Workshop chuyên sâu:</strong> Tham gia các buổi hướng dẫn trực tiếp từ nghệ nhân hàng đầu về cách tạo dáng, tỉa cành và chăm sóc cây bonsai chuẩn nghệ thuật.</li>
  <li><strong>Giao lưu kỹ thuật:</strong> Bạn sẽ có cơ hội đặt câu hỏi trực tiếp cho các chuyên gia về cách xử lý các loại sâu bệnh khó trị hoặc bí quyết nhân giống các dòng cây quý.</li>
  <li><strong>Khu vực trưng bày độc bản:</strong> Đừng bỏ lỡ khu vực "báu vật xanh", nơi quy tụ những giống cây độc lạ nhất mà bạn khó có thể tìm thấy tại các nhà vườn thông thường.</li>
  <li><strong>Mua sắm cây giống chất lượng:</strong> Cơ hội sở hữu những giống cây nội thất chất lượng cao với mức giá ưu đãi trực tiếp từ các nhà vườn danh tiếng.</li>
</ul>

<h3>3. "Bỏ túi" kinh nghiệm tham quan triển lãm</h3>
<p>Để chuyến đi trọn vẹn và hiệu quả hơn, hãy lưu lại vài mẹo nhỏ:</p>
<ul class="care-rules">
  <li><strong>Đi vào khung giờ sáng sớm:</strong> Triển lãm thường rất đông vào cuối tuần, đi sớm giúp bạn có không gian yên tĩnh để ngắm nhìn và trò chuyện với nghệ nhân.</li>
  <li><strong>Chuẩn bị sổ tay ghi chép:</strong> Bạn sẽ học được vô vàn "bí kíp" chăm cây từ những người đi trước, đừng để chúng trôi đi nhé!</li>
  <li><strong>Mang theo túi vải lớn:</strong> Nếu bạn có ý định rinh vài "em xanh" về nhà, túi vải sẽ giúp bảo vệ cây tốt hơn và cũng bảo vệ môi trường.</li>
</ul>

<h3>4. Lời kết</h3>
<p>Sự kiện triển lãm cây cảnh Đà Nẵng 2026 không chỉ là một sự kiện, đó là một hành trình kết nối cộng đồng. Dù bạn là người chơi lâu năm hay mới chớm nở tình yêu với cây cối, triển lãm vẫn luôn dành một vị trí đặc biệt cho bạn. Hẹn gặp bạn tại không gian xanh đầy cảm hứng này nhé!</p>
[PRODUCT_LINK:5]'
WHERE ID = 10;

--Thêm trường trạng thái vào bài viết
ALTER TABLE BaiViet ADD TrangThai NVARCHAR(50) DEFAULT 'PUBLISHED';
GO

-- Cập nhật giả lập 1 bài viết thành DRAFT để test bộ lọc
UPDATE BaiViet SET TrangThai = 'DRAFT' WHERE ID = 3;
GO
