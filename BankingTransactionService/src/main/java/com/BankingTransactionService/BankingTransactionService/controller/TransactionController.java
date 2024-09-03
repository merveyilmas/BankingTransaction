package com.BankingTransactionService.BankingTransactionService.controller;

import com.BankingTransactionService.BankingTransactionService.controller.contract.TransactionControllerContract;
import com.BankingTransactionService.BankingTransactionService.dto.TransactionDTO;
import com.BankingTransactionService.BankingTransactionService.general.RestResponse;
import com.BankingTransactionService.BankingTransactionService.request.TransferRequest;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionControllerContract transactionControllerContract;

    public TransactionController(TransactionControllerContract transactionControllerContract) {
        this.transactionControllerContract = transactionControllerContract;
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transferMoney(@RequestBody TransferRequest transferRequest){

        this.transactionControllerContract.transferMoney(transferRequest);

        return new ResponseEntity<>("Transfer successful", HttpStatus.OK);
    }


    @GetMapping("/account/{accountId}")
    public ResponseEntity<RestResponse<TransactionDTO>> getTransactionByAccountId(@PathVariable @NotBlank UUID accountId){

        TransactionDTO response = this.transactionControllerContract.getTransactionByAccountId(accountId);

        return ResponseEntity.ok(RestResponse.of(response));
    }
}
