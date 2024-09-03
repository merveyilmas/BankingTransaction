package com.BankingTransactionService.BankingTransactionService.controller.contract.impl;

import com.BankingTransactionService.BankingTransactionService.controller.contract.TransactionControllerContract;
import com.BankingTransactionService.BankingTransactionService.dto.TransactionDTO;
import com.BankingTransactionService.BankingTransactionService.request.TransferRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionControllerContractImpl implements TransactionControllerContract {
    @Override
    public void transferMoney(TransferRequest transferRequest) {

    }

    @Override
    public TransactionDTO getTransactionByAccountId(UUID accountId) {
        return null;
    }
}
