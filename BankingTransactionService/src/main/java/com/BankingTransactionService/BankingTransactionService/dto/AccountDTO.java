package com.BankingTransactionService.BankingTransactionService.dto;

import com.BankingTransactionService.BankingTransactionService.entity.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record AccountDTO(UUID id,
                         String number,
                         String name,
                         BigDecimal balance,
                         LocalDateTime createdAt,
                         LocalDateTime updatedAt,
                         User user) {
}
