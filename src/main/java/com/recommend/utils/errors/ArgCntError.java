package com.recommend.utils.errors;

import java.util.Arrays;

public class ArgCntError extends IllegalArgumentException{
    public String[] user_input;
    public int number;

    public ArgCntError(String[] args, int argc) {
        user_input = args;
        number = argc;
    }
    public void errMessage() {
        System.out.println("[ERROR : ArgCntError]");
        System.out.println("  The number of argument should be 2.");
        System.out.println("    You have currently put " + this.number + " argument(s).");
        System.out.println("    Your arguments : " + Arrays.toString(this.user_input));
    }
}