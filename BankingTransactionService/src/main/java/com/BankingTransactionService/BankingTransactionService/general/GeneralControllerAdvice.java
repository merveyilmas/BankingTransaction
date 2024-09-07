package com.BankingTransactionService.BankingTransactionService.general;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.BankingTransactionService.BankingTransactionService.exceptions.ItemNotFoundException;
import com.BankingTransactionService.BankingTransactionService.service.entityService.LogEntityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@RequiredArgsConstructor
public class GeneralControllerAdvice extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GeneralControllerAdvice.class);
    private final LogEntityService logEntityService;

    @ExceptionHandler(RuntimeException.class)
    public final ResponseEntity<Object> handleRuntimeException(RuntimeException e, WebRequest request) {
        log.error("handleRuntimeException triggered");

        String message = e.getMessage();
        String description = request.getDescription(false);

        GeneralErrorMessages generalErrorMessages = new GeneralErrorMessages(LocalDateTime.now(), message, description);
        RestResponse<GeneralErrorMessages> restResponse = RestResponse.error(generalErrorMessages);

        logEntityService.save("Error message : " + message);

        return new ResponseEntity<>(restResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception e, WebRequest request) {

        log.error("handleAllExceptions triggered");


        String message = e.getMessage();
        String description = request.getDescription(false);

        GeneralErrorMessages generalErrorMessages = new GeneralErrorMessages(LocalDateTime.now(), message, description);
        RestResponse<GeneralErrorMessages> restResponse = RestResponse.error(generalErrorMessages);

        logEntityService.save("Error message : " + message);

        return new ResponseEntity<>(restResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BusinessException.class)
    public final ResponseEntity<Object> handleBusinessException(BusinessException e, WebRequest request) {
        log.error("handleBussinessExceptions triggered");

        String message = e.getBaseErrorMessage().getMessage();
        String description = request.getDescription(false);

        GeneralErrorMessages generalErrorMessages = new GeneralErrorMessages(LocalDateTime.now(), message, description);
        RestResponse<GeneralErrorMessages> restResponse = RestResponse.error(generalErrorMessages);

        logEntityService.save("Error message : " + message);

        return new ResponseEntity<>(restResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ItemNotFoundException.class)
    public final ResponseEntity<Object> handleItemNotFoundException(ItemNotFoundException e, WebRequest request) {
        log.error("handleItemNotFoundExceptions triggered");

        String message = e.getBaseErrorMessage().getMessage();
        String description = request.getDescription(false);

        GeneralErrorMessages generalErrorMessages = new GeneralErrorMessages(LocalDateTime.now(), message, description);
        RestResponse<GeneralErrorMessages> restResponse = RestResponse.error(generalErrorMessages);

        logEntityService.save("Error message : " + message);

        return new ResponseEntity<>(restResponse, HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
                                                                  HttpStatusCode status, WebRequest request) {
        log.error("handleMethodArgumentNotValidExceptions triggered");

        List<Map<String, String>> errorList = ex.getBindingResult().getFieldErrors().stream()
                .map(fieldError ->
                {
                    Map<String, String> errorMap = new HashMap<>();
                    errorMap.put(fieldError.getField(),
                            fieldError.getDefaultMessage());
                    return errorMap;
                }).toList();

        String description = request.getDescription(false);

        var generalErrorMessages = new GeneralErrorMessages(LocalDateTime.now(), errorList.toString(), description);
        var restResponse = RestResponse.error(generalErrorMessages);

        logEntityService.save("Error message : " + generalErrorMessages.message());

        return new ResponseEntity<>(restResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleTransactionalExceptions(TransactionSystemException e, WebRequest request) {
        log.error("handleTransactionSystemExceptions triggered");

        String message = e.getOriginalException().getCause().getMessage();
        String description = request.getDescription(false);

        var generalErrorMessages = new GeneralErrorMessages(LocalDateTime.now(), message, description);
        var restResponse = RestResponse.error(generalErrorMessages);

        logEntityService.save("Error message : " + message);

        return new ResponseEntity<>(restResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
