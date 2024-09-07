package com.BankingTransactionService.BankingTransactionService.mapper;


import com.BankingTransactionService.BankingTransactionService.dto.UserDTO;
import com.BankingTransactionService.BankingTransactionService.entity.User;
import com.BankingTransactionService.BankingTransactionService.request.UserSaveRequest;
import com.BankingTransactionService.BankingTransactionService.request.UserUpdateRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User converToUser(UserSaveRequest saveRequest);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "username", source = "username")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "password", source = "password")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "updatedAt", source = "updatedAt")
    UserDTO converToUserDTO(User user);

    List<UserDTO> convertToUserDTOs(List<User> users);

    @Mapping(target = "id" , ignore = true)
    void updateUserFields(@MappingTarget User user, UserUpdateRequest updateRequest);

}
