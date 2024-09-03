package com.BankingTransactionService.BankingTransactionService.general;

public enum GeneralErrorMessage implements BaseErrorMessage {

    ITEM_NOT_FOUND("Item not found!"),
    FILE_NOT_FOUND("The file not exist!"),
    FILE_DELETE_ERROR("File could not be deleted!"),
    FILE_UPLOAD_ERROR("File upload failed!");

    private final String message;

    GeneralErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return message;
    }
}
