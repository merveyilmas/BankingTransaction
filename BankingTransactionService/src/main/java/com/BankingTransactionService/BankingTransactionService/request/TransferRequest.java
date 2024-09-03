package com.BankingTransactionService.BankingTransactionService.request;

import java.util.UUID;

public record TransferRequest(UUID sourceAccountId,
                              UUID destinationAccountId,
                              double amount) {
}
