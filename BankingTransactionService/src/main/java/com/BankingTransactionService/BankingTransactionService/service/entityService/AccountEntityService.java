package com.BankingTransactionService.BankingTransactionService.service.entityService;

import com.BankingTransactionService.BankingTransactionService.dao.AccountRepository;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.general.BaseEntityService;
import com.BankingTransactionService.BankingTransactionService.service.AuthService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class AccountEntityService extends BaseEntityService<Account, UUID, AccountRepository> {
    private final AccountRepository accountRepository;
    private final AuthService authService;

    protected AccountEntityService(AccountRepository repository, AccountRepository accountRepository, AuthService authService) {
        super(repository);
        this.accountRepository = accountRepository;
        this.authService = authService;
    }

    public Account createAccount(){

        String userName = this.authService.getUserInfo().getUsername();

        // Generate unique account number
        String uniqueNumber = UUID.randomUUID().toString().replace("-", "").substring(0, 12);

        while (accountRepository.existsByNumber(uniqueNumber)) {
            uniqueNumber = UUID.randomUUID().toString().replace("-", "").substring(0, 12); // Yeniden oluştur
        }

        // Create a unique account name
        String uniqueName = userName + "-" + new Random().nextInt(9999);

        while (accountRepository.existsByName(uniqueName)) {
            uniqueName = userName + "-" + new Random().nextInt(9999); // Yeniden oluştur
        }

        Account account = new Account();
        account.setName(uniqueName);
        account.setNumber(uniqueNumber);

        return accountRepository.save(account);
    }

    public List<Account> searchAccount(String number, String name){

        List<Account> accounts = accountRepository.findByNumberContainingOrNameContaining(number, name);
        return accounts;
    }
    }
