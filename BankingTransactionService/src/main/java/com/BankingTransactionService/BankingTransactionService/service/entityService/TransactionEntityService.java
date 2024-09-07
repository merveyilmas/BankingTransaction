package com.BankingTransactionService.BankingTransactionService.service.entityService;

import com.BankingTransactionService.BankingTransactionService.dao.TransactionRepository;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import com.BankingTransactionService.BankingTransactionService.enums.EnumTransactionStatus;
import com.BankingTransactionService.BankingTransactionService.general.BaseEntityService;
import com.BankingTransactionService.BankingTransactionService.request.MoneyTransferRequest;
import com.BankingTransactionService.BankingTransactionService.service.TransactionLogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class TransactionEntityService extends BaseEntityService<Transaction, Long, TransactionRepository> {
    private final TransactionRepository transactionRepository;
    private final AccountEntityService accountEntityService;
    private final TransactionLogService transactionLogService;

    protected TransactionEntityService(TransactionRepository transactionRepository, AccountEntityService accountEntityService, TransactionLogService transactionLogService) {
        super(transactionRepository);
        this.transactionRepository = transactionRepository;
        this.accountEntityService = accountEntityService;
        this.transactionLogService = transactionLogService;
    }

    public List<Transaction> getTransactionByAccountId(UUID accountId) {

        Account account = this.accountEntityService.findByIdWithControl(accountId);
        return this.transactionRepository.findByFromOrTo(account, account);
    }

    @Transactional
    public void transferMoney(MoneyTransferRequest transferRequest) {
        BigDecimal amount = transferRequest.amount();
        Account fromAccount = accountEntityService.findByIdWithControl(transferRequest.sourceAccountId());
        Account toAccount = accountEntityService.getAccountByNumber(transferRequest.destinationAccountNumber());

        Transaction transaction = new Transaction();
        transaction.setFrom(fromAccount);
        transaction.setTo(toAccount);
        transaction.setAmount(amount);
        transaction.setStatus(EnumTransactionStatus.FAILED);

        try {
            accountEntityService.transferMoney(fromAccount, toAccount, amount);
            transaction.setStatus(EnumTransactionStatus.SUCCESS);
        } catch (Exception e) {

            transactionLogService.saveTransaction(transaction);
            throw e;
        }
        transactionLogService.saveTransaction(transaction);
    }

}
