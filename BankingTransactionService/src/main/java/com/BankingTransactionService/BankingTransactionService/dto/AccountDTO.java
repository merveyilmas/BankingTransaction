package com.BankingTransactionService.BankingTransactionService.dto;

import com.BankingTransactionService.BankingTransactionService.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

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
