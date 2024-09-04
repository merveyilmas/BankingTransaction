package com.BankingTransactionService.BankingTransactionService.service.entityService;

import com.BankingTransactionService.BankingTransactionService.dao.TransactionRepository;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import com.BankingTransactionService.BankingTransactionService.general.BaseEntityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TransactionEntityService extends BaseEntityService<Transaction, Long, TransactionRepository> {
    private final TransactionRepository transactionRepository;
    private final AccountEntityService accountEntityService;
    protected TransactionEntityService(TransactionRepository repository, TransactionRepository transactionRepository, AccountEntityService accountEntityService) {
        super(repository);
        this.transactionRepository = transactionRepository;
        this.accountEntityService = accountEntityService;
    }

    public List<Transaction> getTransactionByAccountId(UUID accountId){

        Account account = this.accountEntityService.findByIdWithControl(accountId);
        return this.transactionRepository.findByFromOrTo(account, account);

    }
}
