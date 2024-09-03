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
import java.util.Optional;
import java.util.Set;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserMapper INTANCE = Mappers.getMapper(UserMapper.class);

    User converToUser(UserSaveRequest saveRequest);

    UserDTO converToUserDTO(User user);

    List<UserDTO> convertToUserDTOs(List<User> users);

    @Mapping(target = "id" , ignore = true)
    void updateUserFields(@MappingTarget User user, UserUpdateRequest updateRequest);

}
