package com.BankingTransactionService.BankingTransactionService.logging;

import com.BankingTransactionService.BankingTransactionService.service.entityService.LogEntityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartup {
    private static final Logger logger = LoggerFactory.getLogger(ApplicationStartup.class);
    private final LogEntityService logEntityService;

    public ApplicationStartup(LogEntityService logEntityService) {
        this.logEntityService = logEntityService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        String logMessage = "Application started successfully.";

        logEntityService.save(logMessage);
    }

    @EventListener(ContextClosedEvent.class)
    public void onApplicationClosed() {
        String logMessage = "Application closed.";

        logEntityService.save(logMessage);
    }
}
