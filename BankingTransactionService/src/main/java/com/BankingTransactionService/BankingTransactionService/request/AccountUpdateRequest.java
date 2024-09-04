package com.BankingTransactionService.BankingTransactionService.request;

import com.BankingTransactionService.BankingTransactionService.entity.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AccountUpdateRequest(String number,
                                   String name,
                                   BigDecimal balance) {
}
