package com.BankingTransactionService.BankingTransactionService.dao;


import com.BankingTransactionService.BankingTransactionService.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail2);
}
