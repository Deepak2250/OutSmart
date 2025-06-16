package com.outsmart.exceptions;

public class PlanAlreadyAssignedException extends RuntimeException {
    public PlanAlreadyAssignedException(String message) {
        super(message);
    }
}

