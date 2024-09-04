package com.BankingTransactionService.BankingTransactionService.controller.contract;

import com.BankingTransactionService.BankingTransactionService.dto.AccountDTO;
import com.BankingTransactionService.BankingTransactionService.request.AccountUpdateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

public interface AccountControllerContract {

    AccountDTO createAccount();
    List<AccountDTO> searchAccounts(String number, String name);
    AccountDTO updateAccount(UUID id, AccountUpdateRequest request);
    void deleteAccount(UUID id);
   AccountDTO getAccountById( UUID id);
}
