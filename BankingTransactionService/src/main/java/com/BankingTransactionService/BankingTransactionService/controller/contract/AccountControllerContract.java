package com.BankingTransactionService.BankingTransactionService.controller.contract;

import com.BankingTransactionService.BankingTransactionService.dto.AccountDTO;
import com.BankingTransactionService.BankingTransactionService.request.AccountUpdateRequest;
import com.BankingTransactionService.BankingTransactionService.response.AccountResponse;
import com.BankingTransactionService.BankingTransactionService.response.AllAccountsResponse;
import com.BankingTransactionService.BankingTransactionService.response.DetailSpecificAccountResponse;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

public interface AccountControllerContract {

    AccountDTO createAccount();
    List<AccountResponse> searchAccounts(String nameOrNumber);
    AccountDTO updateAccount(UUID id, AccountUpdateRequest request);
    void deleteAccount(UUID id);
    DetailSpecificAccountResponse getAccountById(UUID id);
    AccountResponse getAccountByNumber(String number);
    List<AllAccountsResponse> getAllAccountsByUser();
}
