package com.BankingTransactionService.BankingTransactionService.controller.contract.impl;

import com.BankingTransactionService.BankingTransactionService.controller.contract.AccountControllerContract;
import com.BankingTransactionService.BankingTransactionService.converter.Converter;
import com.BankingTransactionService.BankingTransactionService.dto.AccountDTO;
import com.BankingTransactionService.BankingTransactionService.dto.UserDTO;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.entity.User;
import com.BankingTransactionService.BankingTransactionService.mapper.AccountMapper;
import com.BankingTransactionService.BankingTransactionService.mapper.UserMapper;
import com.BankingTransactionService.BankingTransactionService.request.AccountUpdateRequest;
import com.BankingTransactionService.BankingTransactionService.response.AccountResponse;
import com.BankingTransactionService.BankingTransactionService.response.AllAccountsResponse;
import com.BankingTransactionService.BankingTransactionService.response.DetailSpecificAccountResponse;
import com.BankingTransactionService.BankingTransactionService.service.entityService.AccountEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountControllerContractImpl implements AccountControllerContract {

    private final AccountEntityService accountEntityService;
    private final Converter converter;
    @Override
    public AccountDTO createAccount() {
        Account account = accountEntityService.createAccount();
        return AccountMapper.INSTANCE.converToAccountDTO(account);
    }

    @Override
    public List<AccountResponse> searchAccounts(String nameOrNumber) {
        List<Account> accounts =  this.accountEntityService.searchAccount(nameOrNumber);
        return accounts.stream().map(converter::convertAccountToAccountResponse).collect(Collectors.toList());
    }

    @Override
    public AccountDTO updateAccount(UUID id, AccountUpdateRequest request) {
        Account account = this.accountEntityService.findByIdWithControl(id);
        AccountMapper.INSTANCE.updateAccountFields(account, request);

        accountEntityService.save(account);
        return AccountMapper.INSTANCE.converToAccountDTO(account);
    }

    @Override
    public void deleteAccount(UUID id) {
        this.accountEntityService.deleteById(id);
    }

    @Override
    public DetailSpecificAccountResponse getAccountById(UUID id) {
        Account account = this.accountEntityService.findByIdWithControl(id);

        return AccountMapper.INSTANCE.converToDetailSpecificAccountResponse(account);
    }

    @Override
    public List<AllAccountsResponse> getAllAccountsByUser() {
        List<Account> accounts = this.accountEntityService.getAllAccountsByUser();
        return accounts.stream().map(converter::convertAccountToAllAccountsDTO).collect(Collectors.toList());
    }
}
