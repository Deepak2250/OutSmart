package com.outsmart.exceptions;


public class InvalidPlanTypeException extends RuntimeException {
    public InvalidPlanTypeException(String value) {
        super("Invalid plan type: " + value);
    }
}
