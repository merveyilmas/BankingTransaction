package com.BankingTransactionService.BankingTransactionService.exceptions;


import com.BankingTransactionService.BankingTransactionService.general.BaseErrorMessage;
import com.BankingTransactionService.BankingTransactionService.general.BusinessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class FileDeleteException extends BusinessException {
    public FileDeleteException(BaseErrorMessage baseErrorMessage) {
        super(baseErrorMessage);
    }
}
