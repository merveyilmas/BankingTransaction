package com.BankingTransactionService.BankingTransactionService.controller.contract;

import com.BankingTransactionService.BankingTransactionService.dto.TransactionDTO;
import com.BankingTransactionService.BankingTransactionService.request.MoneyTransferRequest;

import java.util.List;
import java.util.UUID;

public interface TransactionControllerContract {

    void transferMoney(MoneyTransferRequest moneyTransferRequest);
    List<TransactionDTO> getTransactionsByAccountId(UUID accountId);
}
