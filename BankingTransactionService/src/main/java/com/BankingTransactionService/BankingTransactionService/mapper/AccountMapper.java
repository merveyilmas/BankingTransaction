package com.BankingTransactionService.BankingTransactionService.mapper;

import com.BankingTransactionService.BankingTransactionService.dto.AccountDTO;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.request.AccountUpdateRequest;
import com.BankingTransactionService.BankingTransactionService.response.DetailSpecificAccountResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AccountMapper {

    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);

    AccountDTO converToAccountDTO(Account account);

    DetailSpecificAccountResponse converToDetailSpecificAccountResponse(Account account);

    List<AccountDTO> convertToAccountDTOs(List<Account> accounts);

    @Mapping(target = "id" , ignore = true)
    @Mapping(target = "createdAt" , ignore = true)
    @Mapping(target = "updatedAt" , ignore = true)
    @Mapping(target = "user" , ignore = true)
    void updateAccountFields(@MappingTarget Account account, AccountUpdateRequest updateRequest);
}
