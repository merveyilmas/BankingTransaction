package com.BankingTransactionService.BankingTransactionService.service.entityService;

import com.BankingTransactionService.BankingTransactionService.dao.AccountRepository;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.general.BaseEntityService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountEntityService extends BaseEntityService<Account, UUID, AccountRepository> {
    protected AccountEntityService(AccountRepository repository) {
        super(repository);
    }
}
