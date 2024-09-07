package com.BankingTransactionService.BankingTransactionService.service;

import com.BankingTransactionService.BankingTransactionService.dao.TransactionRepository;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TransactionLogService {

    private final TransactionRepository transactionRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveTransaction(Transaction transaction) {

        try {
            transactionRepository.save(transaction);
        } catch (Exception e) {
            throw e;
        }
    }
}
