package com.outsmart.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;

@Component
public class EncryptionUtil {

    @Value("${encryption.secret}")
    private String secret;

    private SecretKeySpec secretKey;
    private Cipher cipher;

    @PostConstruct
    public void init() throws Exception {
        try {
            // Ensure key is exactly 32 bytes (256 bits)
            byte[] keyBytes = Arrays.copyOf(
                    secret.getBytes(StandardCharsets.UTF_8),
                    32
            );

            this.secretKey = new SecretKeySpec(keyBytes, "AES");
            this.cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        } catch (Exception e) {
            throw new Exception("Failed to initialize encryption", e);
        }
    }

    public String encrypt(String data) throws Exception {
        try {
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encrypted = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new Exception("Encryption failed", e);
        }
    }

    public String decrypt(String encryptedData) throws Exception {
        try {
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decoded = Base64.getDecoder().decode(encryptedData.trim());
            byte[] decrypted = cipher.doFinal(decoded);
            return new String(decrypted, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new Exception(
                    String.format("Decryption failed for input [%s]. Error: %s",
                            encryptedData, e.getMessage()),
                    e
            );
        }
    }
}