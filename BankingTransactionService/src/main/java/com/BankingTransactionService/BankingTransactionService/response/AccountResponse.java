package com.BankingTransactionService.BankingTransactionService.response;

import com.BankingTransactionService.BankingTransactionService.dto.UserDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record AccountResponse(UUID id,
                              String number,
                              String name,
                              BigDecimal balance,
                              LocalDateTime createdAt,
                              LocalDateTime updatedAt,
                              UserDTO user) {
}
