package com.BankingTransactionService.BankingTransactionService.converter;

import com.BankingTransactionService.BankingTransactionService.dto.AccountDTO;
import com.BankingTransactionService.BankingTransactionService.dto.UserDTO;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.entity.User;
import com.BankingTransactionService.BankingTransactionService.response.AllAccountsResponse;
import org.springframework.stereotype.Service;

@Service
public class Converter {

    public AllAccountsResponse convertAccountToAllAccountsDTO(Account account) {
        AllAccountsResponse dto = new AllAccountsResponse(
                account.getId(),
                account.getNumber(),
                account.getName(),
                account.getBalance(),
                account.getCreatedAt(),
                account.getUpdatedAt(),
                convertUserToDTO(account.getUser())
                );

        return dto;
    }

    public UserDTO convertUserToDTO(User user) {
        UserDTO dto = new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );

        return dto;
    }
}
