package com.BankingTransactionService.BankingTransactionService.dao;

import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import com.BankingTransactionService.BankingTransactionService.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    List<Account> findByUserAndNumberContaining(User user, String number);
    List<Account> findByUserAndNameContaining(User user, String nameOrNumber);
    List<Account> findByUser(User user);
    Account findByNumber(String number);
    boolean existsByNumber(String number);
    boolean existsByName(String name);
}
