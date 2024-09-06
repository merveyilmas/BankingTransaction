package com.BankingTransactionService.BankingTransactionService.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DetailSpecificAccountResponse(String number,
                                            String name,
                                            BigDecimal balance,
                                            LocalDateTime createdAt
                                            ) {
}
