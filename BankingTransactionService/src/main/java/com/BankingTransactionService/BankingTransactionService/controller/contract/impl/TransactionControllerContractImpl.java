package com.BankingTransactionService.BankingTransactionService.controller.contract.impl;

import com.BankingTransactionService.BankingTransactionService.controller.contract.TransactionControllerContract;
import com.BankingTransactionService.BankingTransactionService.dto.TransactionDTO;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import com.BankingTransactionService.BankingTransactionService.mapper.AccountMapper;
import com.BankingTransactionService.BankingTransactionService.mapper.TransactionMapper;
import com.BankingTransactionService.BankingTransactionService.request.TransferRequest;
import com.BankingTransactionService.BankingTransactionService.service.entityService.AccountEntityService;
import com.BankingTransactionService.BankingTransactionService.service.entityService.TransactionEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionControllerContractImpl implements TransactionControllerContract {

    private final TransactionEntityService transactionEntityService;

    @Override
    public void transferMoney(TransferRequest transferRequest) {

    }

    @Override
    public List<TransactionDTO> getTransactionsByAccountId(UUID accountId) {

        List<Transaction> transactions = this.transactionEntityService.getTransactionByAccountId(accountId);
        return TransactionMapper.INSTANCE.convertToTransactionDTOs(transactions);
    }
}
