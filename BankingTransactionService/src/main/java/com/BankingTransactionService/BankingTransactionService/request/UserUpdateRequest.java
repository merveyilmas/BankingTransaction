package com.BankingTransactionService.BankingTransactionService.request;

public record UserUpdateRequest(

        Long id,
        String username,
        String email,
        String password,
        String role // Kullanıcı rolü (örneğin, "ROLE_ADMIN" veya "ROLE_USER")
) {
}
