package com.BankingTransactionService.BankingTransactionService.controller;

import com.BankingTransactionService.BankingTransactionService.controller.contract.TransactionControllerContract;
import com.BankingTransactionService.BankingTransactionService.dto.TransactionDTO;
import com.BankingTransactionService.BankingTransactionService.general.RestResponse;
import com.BankingTransactionService.BankingTransactionService.request.MoneyTransferRequest;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionControllerContract transactionControllerContract;

    public TransactionController(TransactionControllerContract transactionControllerContract) {
        this.transactionControllerContract = transactionControllerContract;
    }

    @PostMapping("/transfer")
    public ResponseEntity<RestResponse<String>> transferMoney(@RequestBody MoneyTransferRequest moneyTransferRequest){

        this.transactionControllerContract.transferMoney(moneyTransferRequest);
        return ResponseEntity.ok(RestResponse.of("Transfer successful"));
    }


    @GetMapping("/account/{accountId}")
    public ResponseEntity<RestResponse<List<TransactionDTO>>> getTransactionsByAccountId(@PathVariable UUID accountId){

        List<TransactionDTO> response = this.transactionControllerContract.getTransactionsByAccountId(accountId);
        return ResponseEntity.ok(RestResponse.of(response));
    }
}
