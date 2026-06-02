package com.example.chien_java_template.controller;

import com.example.chien_java_template.exception.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/files")
@CrossOrigin("*") // Mở CORS
public class FileUploadController {

    // Lấy đường dẫn từ file application.properties
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<String>> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.<String>builder()
                    .code(400).message("File trống!").build());
        }

        try {
            // Tạo tên file ngẫu nhiên để không bị trùng (vd: 123e4567.jpg)
            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
            String fileName = UUID.randomUUID().toString() + extension;

            // Kiểm tra và tạo thư mục nếu chưa có
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Lưu file vào thư mục đích
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            // Trả về đường dẫn tương đối cho Frontend lưu vào DB
            String fileUrl = "/images/" + fileName;

            return ResponseEntity.ok(ApiResponse.<String>builder()
                    .code(200).message("Upload thành công")
                    .result(fileUrl).build());

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<String>builder()
                            .code(500).message("Lỗi khi lưu file: " + e.getMessage()).build());
        }
    }
}