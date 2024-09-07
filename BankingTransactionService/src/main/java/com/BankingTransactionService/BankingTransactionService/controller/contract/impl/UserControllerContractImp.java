package com.BankingTransactionService.BankingTransactionService.controller.contract.impl;


import com.BankingTransactionService.BankingTransactionService.controller.contract.UserControllerContract;
import com.BankingTransactionService.BankingTransactionService.dto.UserDTO;
import com.BankingTransactionService.BankingTransactionService.entity.User;
import com.BankingTransactionService.BankingTransactionService.mapper.UserMapper;
import com.BankingTransactionService.BankingTransactionService.request.UserSaveRequest;
import com.BankingTransactionService.BankingTransactionService.service.entityService.UserEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserControllerContractImp implements UserControllerContract {

    private final UserEntityService userEntityService;

    @Override
    @Transactional
    public UserDTO registerNewUser(UserSaveRequest saveRequest) {

        User user = UserMapper.INSTANCE.converToUser(saveRequest);

        user = userEntityService.save(user);

        return UserMapper.INSTANCE.converToUserDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {

        List<User> users = userEntityService.findAll();

        List<UserDTO> userDTOS = UserMapper.INSTANCE.convertToUserDTOs(users);

        return userDTOS;
    }


    @Override
    public UserDTO getByEmailOrUsername(String emailOrUsername, String usernameOrEmail) {

        User user = this.userEntityService.findByUsernameOrEmail(emailOrUsername,usernameOrEmail);

        return UserMapper.INSTANCE.converToUserDTO(user);
    }
}
