package com.chupryna.anime.exceptions;

public class PasswordsDoNotMatchException extends RuntimeException{

    public PasswordsDoNotMatchException(String msg){
        super(msg);
    }

}
