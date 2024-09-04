package com.BankingTransactionService.BankingTransactionService.controller.contract;



import com.BankingTransactionService.BankingTransactionService.dto.UserDTO;
import com.BankingTransactionService.BankingTransactionService.request.UserSaveRequest;
import com.BankingTransactionService.BankingTransactionService.request.UserUpdateRequest;

import java.util.List;
import java.util.UUID;

public interface UserControllerContract {

    UserDTO registerNewUser(UserSaveRequest saveRequest);

    List<UserDTO> getAllUsers();

    UserDTO getByEmailOrUsername(String emailOrUsername,String usernameOrEmail);

}
