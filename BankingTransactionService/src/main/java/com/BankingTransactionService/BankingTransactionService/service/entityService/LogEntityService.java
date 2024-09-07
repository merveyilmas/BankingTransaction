package com.BankingTransactionService.BankingTransactionService.service.entityService;

import com.BankingTransactionService.BankingTransactionService.dao.LogRepository;
import com.BankingTransactionService.BankingTransactionService.entity.Log;
import com.BankingTransactionService.BankingTransactionService.general.BaseEntityService;
import com.BankingTransactionService.BankingTransactionService.service.AuthService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LogEntityService extends BaseEntityService<Log, Long, LogRepository> {

    private final AuthService authService;
    private final LogRepository logRepository;

    protected LogEntityService(AuthService authService, LogRepository logRepository) {
        super(logRepository);
        this.authService = authService;
        this.logRepository = logRepository;
    }

    public void save(String desc){

        Log log = new Log();
        UUID userId = authService.getUserId();

        log.setUserId(userId);
        log.setDescription(desc);

        logRepository.save(log);
    }
}
