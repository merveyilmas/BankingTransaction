package com.BankingTransactionService.BankingTransactionService.dao;

import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    List<Account> findByNumberContainingOrNameContaining(String number, String name);
    boolean existsByNumber(String number);
    boolean existsByName(String name);
}
