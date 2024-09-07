package com.BankingTransactionService.BankingTransactionService.mapper;

import com.BankingTransactionService.BankingTransactionService.dto.TransactionDTO;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import com.BankingTransactionService.BankingTransactionService.request.MoneyTransferRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TransactionMapper {

    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);

    Transaction converToTransaction(MoneyTransferRequest saveRequest);

    TransactionDTO converToTransactionDTO(Transaction transaction);

    List<TransactionDTO> convertToTransactionDTOs(List<Transaction> transactions);
}
