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

export const forgotPassSchema = yup.object().shape({
    email: yup.string()
        .email("Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required")
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

export const projectSchema = yup.object().shape({
    title: yup.string()
        .min(2, "*Title must be at least 2 characters")
        .max(38, "*Title must be less than 39 characters")
        .required("*Title is required"),
    mainIcon: yup.string()
        .required("*Main Icon is required"),
    context: yup.string()
        .min(2, "*Context must be at least 2 characters")
        .max(100, "*Context must be less than 100 characters")
        .required("*Context is required"),
    languages: yup.array()
        .required("*Language is required"),
    tools: yup.array()
        .required("*Tools is required"),
    details: yup.string()
        .min(2, "*Details must be at least 2 characters")
        .max(1000, "*Details must be less than 1000 characters")
        .required("*Details is required"),
    link: yup.string()
        .trim()
        .url("Link must be a valid URL"),
    github: yup.string()
        .trim()
        .url("Github link must be a valid URL")
        .required("*Github link is required"),
});