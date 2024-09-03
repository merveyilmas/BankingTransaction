package com.BankingTransactionService.BankingTransactionService.request;

public record UserSaveRequest(
        String username,
        String email,
        String password

) {}
