package com.BankingTransactionService.BankingTransactionService.controller.contract;

import com.BankingTransactionService.BankingTransactionService.dto.TransactionDTO;
import com.BankingTransactionService.BankingTransactionService.request.TransferRequest;
import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;

public interface TransactionControllerContract {

    void transferMoney(@RequestBody TransferRequest transferRequest);
    TransactionDTO getTransactionByAccountId(@PathVariable @NotBlank UUID accountId);
}
