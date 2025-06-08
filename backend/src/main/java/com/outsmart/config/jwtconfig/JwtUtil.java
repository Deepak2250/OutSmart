package com.outsmart.config.jwtconfig;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {

    @Value("${jwt}")
    private String SECRET_KEY;

    @PostConstruct
    public void checkSecret() {
        System.out.println("JWT Secret: " + SECRET_KEY);
    }

    // Generate the signing key using HMAC SHA algorithm
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Extract username (subject) from the token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extract token expiration date
    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    // Extract all claims from the token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Validate the token (basic validation)
    // Check if token is expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Generate JWT token with roles as claims
    public String generateToken(UserDetails user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList());


        return createToken(claims, user);
    }

    // Create the JWT token
    private String createToken(Map<String, Object> claims, UserDetails user) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000)) // 1 hour
                .signWith(getSigningKey())
                .compact();
    }

    // Validate token (basic validation)
    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }
}
