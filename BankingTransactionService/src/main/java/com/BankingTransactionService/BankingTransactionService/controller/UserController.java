package com.BankingTransactionService.BankingTransactionService.controller;

import com.BankingTransactionService.BankingTransactionService.controller.contract.UserControllerContract;
import com.BankingTransactionService.BankingTransactionService.request.LoginRequest;
import com.BankingTransactionService.BankingTransactionService.dto.UserDTO;
import com.BankingTransactionService.BankingTransactionService.general.RestResponse;
import com.BankingTransactionService.BankingTransactionService.request.UserSaveRequest;


import com.BankingTransactionService.BankingTransactionService.response.JwtAuthResponse;
import com.BankingTransactionService.BankingTransactionService.service.AuthService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserControllerContract userControllerContract;
    private final AuthService authService;

    public UserController(UserControllerContract userControllerContract, AuthService authService) {
        this.userControllerContract = userControllerContract;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginRequest loginRequest){
        String token = authService.login(loginRequest);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<RestResponse<UserDTO>> registerNewUser(@RequestBody UserSaveRequest saveRequest){

        UserDTO userDTO = this.userControllerContract.registerNewUser(saveRequest);
        return ResponseEntity.ok(RestResponse.of(userDTO));
    }

    @GetMapping("/with-usernameOrEmail/{usernameOrEmail}")
    public ResponseEntity<RestResponse<UserDTO>> getUserByUsernameOrEmail(@PathVariable @NotBlank String usernameOrEmail){

       UserDTO userDTO = this.userControllerContract.getByEmailOrUsername(usernameOrEmail,usernameOrEmail);

        return ResponseEntity.ok(RestResponse.of(userDTO));
    }
}
