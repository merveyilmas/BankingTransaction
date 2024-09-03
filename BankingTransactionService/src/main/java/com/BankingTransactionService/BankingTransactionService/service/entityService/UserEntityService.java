package com.BankingTransactionService.BankingTransactionService.service.entityService;


import com.BankingTransactionService.BankingTransactionService.dao.UserRepository;
import com.BankingTransactionService.BankingTransactionService.entity.User;
import com.BankingTransactionService.BankingTransactionService.exceptions.ItemNotFoundException;
import com.BankingTransactionService.BankingTransactionService.general.BaseEntityService;
import com.BankingTransactionService.BankingTransactionService.general.GeneralErrorMessage;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserEntityService extends BaseEntityService<User, UUID, UserRepository> {

    protected UserEntityService(UserRepository repository) {
        super(repository);
    }

    public User findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail2){

        Optional<User> optionalUser = getRepository().findByUsernameOrEmail(usernameOrEmail,usernameOrEmail2);
        User user;
        if(optionalUser.isPresent()){

            user = optionalUser.get();

        }else{

            throw new ItemNotFoundException(GeneralErrorMessage.ITEM_NOT_FOUND);
        }

        return user;
    }
}
