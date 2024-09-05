package com.BankingTransactionService.BankingTransactionService.dto;


import java.time.LocalDateTime;
import java.util.UUID;

public record UserDTO(
        UUID id,
        String username,
        String email,
        String password,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
