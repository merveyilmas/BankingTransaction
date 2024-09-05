package com.BankingTransactionService.BankingTransactionService.controller;

import com.BankingTransactionService.BankingTransactionService.controller.contract.AccountControllerContract;
import com.BankingTransactionService.BankingTransactionService.dto.AccountDTO;
import com.BankingTransactionService.BankingTransactionService.request.AccountUpdateRequest;
import com.BankingTransactionService.BankingTransactionService.response.AllAccountsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountControllerContract accountControllerContract;

    public AccountController(AccountControllerContract accountControllerContract) {
        this.accountControllerContract = accountControllerContract;
    }

    @PostMapping
    public ResponseEntity<AccountDTO> createAccount() {
        AccountDTO createdAccount = this.accountControllerContract.createAccount();
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
    }

    @PostMapping("/search")
    public ResponseEntity<List<AccountDTO>> searchAccounts(
            @RequestParam(required = false) String number,
            @RequestParam(required = false) String name
    ) {
        List<AccountDTO> accounts = this.accountControllerContract.searchAccounts(number, name);
        return ResponseEntity.ok(accounts);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountDTO> updateAccount(@PathVariable UUID id, @RequestBody AccountUpdateRequest request) {
        AccountDTO updatedAccount = this.accountControllerContract.updateAccount(id, request);
        return ResponseEntity.ok(updatedAccount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable UUID id) {
        this.accountControllerContract.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> getAccountById(@PathVariable UUID id) {
        AccountDTO account = this.accountControllerContract.getAccountById(id);
        return ResponseEntity.ok(account);
    }

    @GetMapping
    public ResponseEntity<List<AllAccountsResponse>> getAllAccountsByUser() {
        List<AllAccountsResponse> accounts = this.accountControllerContract.getAllAccountsByUser();
        return ResponseEntity.ok(accounts);
    }
}
