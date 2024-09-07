package com.BankingTransactionService.BankingTransactionService.request;

import java.math.BigDecimal;
import java.util.UUID;

public record MoneyTransferRequest(UUID sourceAccountId,
                                   String destinationAccountNumber,
                                   BigDecimal amount) {
}
