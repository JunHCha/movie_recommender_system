package com.recommend.utils.errors;

public class UserNotExistError extends Exception{

    public UserNotExistError() {
        super();
    }

    public void errMessage() {
        System.out.println("Can't find any user whose occupation matchs");
        System.out.println("Program was forced to exit.");
        System.exit(0);
    }
}