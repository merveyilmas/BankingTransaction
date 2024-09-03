package com.BankingTransactionService.BankingTransactionService.utility;


import com.BankingTransactionService.BankingTransactionService.response.FileNodeResponse;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

public class FileUtil {

    static String username = System.getProperty("user.name");

    public static ResponseEntity<Resource> downloadFile(String filePath) {

        try {
            File file = new File(File.separator + "home" + File.separator + username + File.separator + "PakFiles" + File.separator + filePath);

            if (file.exists()) {
                InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());

                return ResponseEntity.ok()
                        .headers(headers)
                        .contentLength(file.length())
                        .contentType(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    public static boolean uploadFile(String directoryName, MultipartFile file) {
        // Dosya yollarını platform bağımsız olarak oluştur
        String directoryPath = File.separator + "home" + File.separator + username + File.separator + "PakFiles" + File.separator + directoryName;
        File directory = new File(directoryPath);

        if (!directory.exists()) {
            directory.mkdirs(); // Klasörü oluştur
        }

        String fileName = file.getOriginalFilename();
        String filePath = directoryPath + File.separator + fileName;

        try {
            // Dosyayı belirtilen yol üzerine kaydet
            Files.copy(file.getInputStream(), Path.of(filePath), StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Dosya başarıyla kaydedildi : ");
            System.out.println(filePath);
        } catch (IOException e) {
            e.printStackTrace();
            // Hata durumunda uygun işlemi yapın
            return false;
        }

        return true;
    }

    public static boolean deleteFile(String directoryName, String fileName) {

        File sourceFile = new File(File.separator + "home" + File.separator + username + File.separator + "PakFiles" + File.separator + directoryName, fileName);
        if (sourceFile.exists()) {
            try {
                Path sourcePath = sourceFile.toPath();

                Files.delete(sourcePath);
                System.out.println("Dosya başarıyla silindi: " + sourceFile.toString());
                return true;
            } catch (IOException e) {
                System.err.println("Dosya silme hatası: " + e.getMessage());

                return false;
            }
        } else {
            System.err.println("Belirtilen dosya bulunamadı: " + sourceFile.getAbsolutePath());

            return false;
        }

    }

    public static List<FileNodeResponse> listFiles(String directoryPath) {
        File directory = new File(directoryPath);
        return scanDirectory(directory);
    }

    private static List<FileNodeResponse> scanDirectory(File directory) {
        List<FileNodeResponse> nodes = new ArrayList<>();
        File[] files = directory.listFiles();

        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    nodes.add(new FileNodeResponse(file.getName(), scanDirectory(file), true));
                } else {
                    nodes.add(new FileNodeResponse(file.getName(), null, false));
                }
            }
        }

        return nodes;
    }
}
