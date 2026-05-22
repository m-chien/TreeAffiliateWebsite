package com.example.chien_java_template.service;

import com.example.chien_java_template.dto.request.UserLoginRequest;
import com.example.chien_java_template.dto.response.AuthResponse;
import com.example.chien_java_template.enums.AuthProvider;
import com.example.chien_java_template.exception.AppException;
import com.example.chien_java_template.exception.ErrorCode;
import com.example.chien_java_template.mapper.UserMapper;
import com.example.chien_java_template.model.User;
import com.example.chien_java_template.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(UserLoginRequest request) {
        // Kiểm tra email có tồn tại không
        User existingUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Kiểm tra mật khẩu
        if (!passwordEncoder.matches(request.getPassword(), existingUser.getPassword())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }


        // Tạo access token
        String accessToken = jwtService.createToken(existingUser);

        // Tạo refresh token
        String refreshToken = jwtService.createRefreshToken(existingUser);
        log.debug("Refresh token created for user: {}", existingUser.getId());

        // Lưu refresh token vào Redis
        jwtService.saveRefreshToken(refreshToken, existingUser.getId().toString());

        // Cập nhật thời gian đăng nhập cuối cùng
        userRepository.updateLastLoginTime(existingUser.getId());

        return AuthResponse.builder()
                .token(accessToken)
                .refreshToken(refreshToken)
                .user(userMapper.toDTO(existingUser))
                .build();
    }

    public void logout(String refreshToken) {
        jwtService.logout(refreshToken);
        log.info("User logged out successfully");
    }

    public AuthResponse refresh(HttpServletRequest request) {
        String refreshToken = extractRefreshTokenFromCookie(request);

        if (refreshToken == null) {
            log.warn("Refresh token not found in cookie");
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        String newAccessToken = jwtService.refreshAccessToken(refreshToken);
        log.debug("Access token refreshed successfully");

        return AuthResponse.builder()
                .token(newAccessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private String extractRefreshTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }

        for (Cookie cookie : request.getCookies()) {
            if ("refreshToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}