package com.BankingTransactionService.BankingTransactionService.controller;

import com.BankingTransactionService.BankingTransactionService.controller.contract.AccountControllerContract;
import com.BankingTransactionService.BankingTransactionService.dto.AccountDTO;
import com.BankingTransactionService.BankingTransactionService.request.AccountUpdateRequest;
import com.BankingTransactionService.BankingTransactionService.response.AccountResponse;
import com.BankingTransactionService.BankingTransactionService.response.AllAccountsResponse;
import com.BankingTransactionService.BankingTransactionService.response.DetailSpecificAccountResponse;
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
    public ResponseEntity<List<AccountResponse>> searchAccounts(@RequestParam(required = false) String nameOrNumber) {
        List<AccountResponse> accounts = this.accountControllerContract.searchAccounts(nameOrNumber);
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
    public ResponseEntity<DetailSpecificAccountResponse> getAccountById(@PathVariable UUID id) {
        DetailSpecificAccountResponse account = this.accountControllerContract.getAccountById(id);
        return ResponseEntity.ok(account);
    }

    @GetMapping("/with-number/{number}")
    public ResponseEntity<AccountResponse> getAccountByNumber(@PathVariable String number) {
        AccountResponse account = this.accountControllerContract.getAccountByNumber(number);
        return ResponseEntity.ok(account);
    }

    @GetMapping
    public ResponseEntity<List<AllAccountsResponse>> getAllAccountsByUser() {
        List<AllAccountsResponse> accounts = this.accountControllerContract.getAllAccountsByUser();
        return ResponseEntity.ok(accounts);
    }
}
