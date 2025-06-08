package com.outsmart.exceptions;

public class OAuthException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public OAuthException(String message) {
        super(message);
    }
}