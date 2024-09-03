package com.BankingTransactionService.BankingTransactionService.dto;

import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.enums.EnumTransactionStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionDTO(Long id,
                             Account from,
                             Account to,
                             BigDecimal amount,
                             LocalDateTime transactionDate,
                             EnumTransactionStatus status) {
}
