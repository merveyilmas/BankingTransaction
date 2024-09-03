package com.BankingTransactionService.BankingTransactionService.dao;

import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    //List<Transaction> findByAccountId(UUID accountId);
}
