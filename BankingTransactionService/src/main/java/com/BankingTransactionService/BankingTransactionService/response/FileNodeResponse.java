package com.BankingTransactionService.BankingTransactionService.response;

import java.util.List;

public record FileNodeResponse(String name,
                               List<FileNodeResponse>children,
                               boolean isDirectory) {
}
