package com.BankingTransactionService.BankingTransactionService.exceptions;


import com.BankingTransactionService.BankingTransactionService.general.BaseErrorMessage;
import com.BankingTransactionService.BankingTransactionService.general.BusinessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)

public class FileUploadException extends BusinessException {
    public FileUploadException(BaseErrorMessage baseErrorMessage) {
        super(baseErrorMessage);
    }
}
