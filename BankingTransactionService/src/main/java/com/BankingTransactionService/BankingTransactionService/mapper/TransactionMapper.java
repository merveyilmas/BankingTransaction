package com.BankingTransactionService.BankingTransactionService.mapper;

import com.BankingTransactionService.BankingTransactionService.dto.TransactionDTO;
import com.BankingTransactionService.BankingTransactionService.dto.UserDTO;
import com.BankingTransactionService.BankingTransactionService.entity.Transaction;
import com.BankingTransactionService.BankingTransactionService.entity.User;
import com.BankingTransactionService.BankingTransactionService.request.TransferRequest;
import com.BankingTransactionService.BankingTransactionService.request.UserSaveRequest;
import com.BankingTransactionService.BankingTransactionService.request.UserUpdateRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TransactionMapper {

    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);

    Transaction converToTransaction(TransferRequest saveRequest);

    TransactionDTO converToTransactionDTO(Transaction transaction);

    List<TransactionDTO> convertToTransactionDTOs(List<Transaction> transactions);
}
