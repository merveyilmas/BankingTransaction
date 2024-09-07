package com.BankingTransactionService.BankingTransactionService.service.entityService;

import com.BankingTransactionService.BankingTransactionService.dao.TransactionRepository;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import com.BankingTransactionService.BankingTransactionService.enums.EnumTransactionStatus;
import com.BankingTransactionService.BankingTransactionService.exceptions.ItemNotFoundException;
import com.BankingTransactionService.BankingTransactionService.general.BaseEntityService;
import com.BankingTransactionService.BankingTransactionService.general.GeneralErrorMessage;
import com.BankingTransactionService.BankingTransactionService.request.MoneyTransferRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
            transactionRepository.save(transaction);
            throw e;
        }

        transactionRepository.save(transaction);
    }
}
