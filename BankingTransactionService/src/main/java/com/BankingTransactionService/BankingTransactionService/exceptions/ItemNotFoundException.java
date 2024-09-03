package com.BankingTransactionService.BankingTransactionService.exceptions;


import com.BankingTransactionService.BankingTransactionService.general.BaseErrorMessage;
import com.BankingTransactionService.BankingTransactionService.general.BusinessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ItemNotFoundException extends BusinessException {

    public ItemNotFoundException(BaseErrorMessage baseErrorMessage) {
        super(baseErrorMessage);
    }
}
