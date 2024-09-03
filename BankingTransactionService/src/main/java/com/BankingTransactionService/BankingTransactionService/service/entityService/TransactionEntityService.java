package com.BankingTransactionService.BankingTransactionService.service.entityService;

import com.BankingTransactionService.BankingTransactionService.dao.TransactionRepository;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import com.BankingTransactionService.BankingTransactionService.general.BaseEntityService;
import org.springframework.stereotype.Service;

@Service
public class TransactionEntityService extends BaseEntityService<Transaction, Long, TransactionRepository> {
    protected TransactionEntityService(TransactionRepository repository) {
        super(repository);
    }
}
