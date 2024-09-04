package com.BankingTransactionService.BankingTransactionService.controller.contract.impl;

import com.BankingTransactionService.BankingTransactionService.controller.contract.AccountControllerContract;
import com.BankingTransactionService.BankingTransactionService.dto.AccountDTO;
import com.BankingTransactionService.BankingTransactionService.entity.Account;
import com.BankingTransactionService.BankingTransactionService.mapper.AccountMapper;
import com.BankingTransactionService.BankingTransactionService.mapper.UserMapper;
import com.BankingTransactionService.BankingTransactionService.request.AccountUpdateRequest;
import com.BankingTransactionService.BankingTransactionService.service.entityService.AccountEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountControllerContractImpl implements AccountControllerContract {

    private final AccountEntityService accountEntityService;
    @Override
    public AccountDTO createAccount() {
        Account account = accountEntityService.createAccount();
        return AccountMapper.INSTANCE.converToAccountDTO(account);
    }

    @Override
    public List<AccountDTO> searchAccounts(String number, String name) {
        List<Account> accounts =  this.accountEntityService.searchAccount(number, name);
        return AccountMapper.INSTANCE.convertToAccountDTOs(accounts);
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
    public AccountDTO getAccountById(UUID id) {
        Account account = this.accountEntityService.findByIdWithControl(id);
        return AccountMapper.INSTANCE.converToAccountDTO(account);
    }
}
