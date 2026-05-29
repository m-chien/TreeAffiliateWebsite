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
('admin@plants.com', N'Alex Nguyen', '0987654321', 'pw1', 'ACTIVE', 'Admin'),
('chi@gmail.com', N'Lê Kim Chi', '0901234567', 'pw2', 'ACTIVE', 'User'),
('hung@gmail.com', N'Trần Mạnh Hùng', '0907654321', 'pw3', 'ACTIVE', 'User'),
('lan@gmail.com', N'Vũ Ngọc Lan', '0912345678', 'pw4', 'ACTIVE', 'User'),
('minh@gmail.com', N'Đỗ Quang Minh', '0918765432', 'pw5', 'ACTIVE', 'User'),
('trang@gmail.com', N'Nguyễn Thu Trang', '0921234567', 'pw6', 'INACTIVE', 'User'),
('duc@gmail.com', N'Phạm Minh Đức', '0928765432', 'pw7', 'ACTIVE', 'User'),
('an@gmail.com', N'Lý Hoài An', '0931234567', 'pw8', 'ACTIVE', 'User'),
('vy@gmail.com', N'Hoàng Thảo Vy', '0938765432', 'pw9', 'ACTIVE', 'User'),
('thanh@gmail.com', N'Bùi Tiến Thành', '0941234567', 'pw10', 'ACTIVE', 'User');

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


-- Thêm dữ liệu đầy đủ cho 10 cây cảnh
INSERT INTO HuongDanChamSoc (IDCayCanh, AnhSang, CheDoNuoc, DatVaDinhDuong, DoAnToan) 
VALUES 
-- 1. Kim Tiền
(1, N'Cây ưa thích ánh sáng tán xạ nhẹ (sáng gián tiếp khoảng 4-6 giờ/ngày) hoặc chịu bóng râm rất tốt trong nhà. Tuyệt đối tránh đặt cây ở vị trí nhận ánh nắng gay gắt trực tiếp của buổi trưa vì sẽ dễ gây cháy đen lá.', N'Chỉ tưới khi đất khô hoàn toàn, trung bình khoảng 10-14 ngày/lần tùy thời tiết. Cây chịu hạn cực tốt nhờ thân củ mọng nước, nhưng rất sợ ngập úng; tưới quá nhiều sẽ làm thối rễ và rụng lá.', N'Sử dụng đất tơi xốp, giàu mùn và thoát nước cực nhanh (như đất trộn xơ dừa, xỉ than hoặc đá perlite). Nên bón bổ sung phân hữu cơ tan chậm hoặc phân bón lá định kỳ 2-3 tháng/lần để giữ lá luôn xanh bóng.', N'Trong lá và thân cây chứa tinh thể canxi oxalat có thể gây kích ứng da, nóng rát niêm mạc miệng. Nên đặt cây ở vị trí cao, xa tầm tay của trẻ nhỏ và các loài thú cưng (chó, mèo).'),

-- 2. Lưỡi Hổ
(2, N'Thích nghi cực kỳ linh hoạt từ nơi thiếu sáng sâu trong phòng đến nơi có ánh sáng mặt trời mạnh. Tuy nhiên, cây phát triển với sắc thái viền vàng đẹp nhất khi được đón ánh sáng gián tiếp nhẹ mỗi ngày.', N'Khả năng chịu hạn cực cao nhờ lá mọng nước dày. Chỉ tưới nước khi đất khô hẳn đáy chậu, khoảng 2-3 tuần/lần. Tránh tuyệt đối tưới đọng vào tâm lá hoặc tưới quá thường xuyên làm thối gốc.', N'Yêu cầu đất trồng thông thoáng, thoát nước nhanh (như đất pha cát hoặc đá perlite). Cây không cần quá nhiều dinh dưỡng, chỉ cần bón phân vi lượng hoặc phân tan chậm loãng khoảng 2 lần một năm.', N'Chứa độc tính nhẹ đối với động vật. Nếu chó hoặc mèo cắn/nhai lá cây có thể gây buồn nôn, tiêu chảy hoặc kích ứng tiêu hóa. Nên đặt cây trên kệ cao hoặc góc phòng kín.'),

-- 3. Monstera
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
-- Kiểm tra kết quả
SELECT * FROM CayCanh;
SELECT * FROM HuongDanChamSoc;
SELECT * FROM LinkAffiliate;
SELECT * FROM AffiliateOrder;