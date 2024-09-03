package com.BankingTransactionService.BankingTransactionService.general;


import com.BankingTransactionService.BankingTransactionService.exceptions.ItemNotFoundException;
import lombok.Getter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

@Getter
public abstract class BaseEntityService<E, ID, R extends JpaRepository<E, ID>> {

    private final R repository;

    protected BaseEntityService(R repository) {
        this.repository = repository;
    }

    public E save(E entity) {

        entity = repository.save(entity);
        return entity;
    }

    public List<E> findAll() {
        return repository.findAll();
    }

    public E findByIdWithControl(ID id) {
        Optional<E> optionalE = repository.findById(id);
        E entity;
        if (optionalE.isPresent()) {
            entity = optionalE.get();
        } else {
            throw new ItemNotFoundException(GeneralErrorMessage.ITEM_NOT_FOUND);
        }

        return entity;
    }

    public Optional<E> findById(ID id){
        return repository.findById(id);
    }

    public void deleteById(ID id) {
        repository.deleteById(id);
    }

    public void delete(E entity){
        repository.delete(entity);
    }

    public boolean existById(ID id){
        return repository.existsById(id);
    }
}