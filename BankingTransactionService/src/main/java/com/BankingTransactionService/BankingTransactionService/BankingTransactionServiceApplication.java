package com.BankingTransactionService.BankingTransactionService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class BankingTransactionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankingTransactionServiceApplication.class, args);
	}

}
