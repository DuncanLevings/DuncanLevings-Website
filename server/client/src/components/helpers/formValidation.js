/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string()
        .trim()
        .email("Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
    password: yup.string()
        .trim()
        .matches(/^\S*$/, "Password cannot contain spaces!")
        .min(4, "*Password must be at least 4 characters")
        .max(100, "*Password must be less than 100 characters")
        .required("*Password is required")
  });

export const signUpSchema = yup.object().shape({
    username: yup.string()
        .min(2, "*Username must be at least 2 characters")
        .max(30, "*Username must be less than 30 characters")
        .required("*Username is required"),
    email: yup.string()
        .email("Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
    password: yup.string()
        .trim()
        .matches(/^\S*$/, "Password cannot contain spaces!")
        .min(4, "*Password must be at least 4 characters")
        .max(100, "*Password must be less than 100 characters")
        .required("*Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("*Must confirm password")
  });

export const contactSchema = yup.object().shape({
    email: yup.string()
        .trim()
        .email("Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
    message: yup.string()
        .required("*Message is required")
  });