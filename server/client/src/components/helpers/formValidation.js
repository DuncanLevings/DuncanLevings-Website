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
        .min(24, "Message too short!")
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

export const dailySchema = yup.object().shape({
    title: yup.string()
        .min(2, "*Title must be at least 2 characters")
        .max(59, "*Title must be less than 59 characters")
        .required("*Title is required"),
    steps: yup.array().of(
        yup.object().shape({
            step: yup.string()
                .required("*Step is required")
        })
    )
});

export const ItemSchema = yup.object().shape({
    name: yup.string()
        .required("*Name is required"),
    wikiURL: yup.string()
        .trim()
        .url("Wiki link must be a valid URL"),
    familiarSize: yup.number()
        .typeError("Size must be a number")
        .integer("Size must not contain decimals")
        .required("*Size is required, can be 0")
});

export const abilitySchema = yup.object().shape({
    name: yup.string()
        .required("*Name is required"),
    styleType: yup.string()
        .required("*Must select a main style")
});

export const farmRunAllSchema = yup.object().shape({
    webURL: yup.string()
        .trim()
        .url("Web guide must be a valid URL"),
    youtubeURL: yup.string()
        .trim()
        .url("Youtube guide must be a valid URL"),
    steps: yup.array().of(
        yup.object().shape({
            title: yup.string()
                .required("*Title is required"),
            type: yup.string()
                .required("*Type is required")
        })
    )
});

export const farmRunSchema = yup.object().shape({
    webURL: yup.string()
        .trim()
        .url("Web guide must be a valid URL"),
    youtubeURL: yup.string()
        .trim()
        .url("Youtube guide must be a valid URL"),
    steps: yup.array().of(
        yup.object().shape({
            title: yup.string()
                .required("*Title is required")
        })
    )
});

export const mapSchema = yup.object().shape({
    mapURL: yup.string()
        .trim()
        .url("Map must be a valid URL")
});

export const activitySchema = yup.object().shape({
    title: yup.string()
        .min(2, "*Title must be at least 2 characters")
        .max(59, "*Title must be less than 59 characters")
        .required("*Title is required")
});

export const pvmSchema = yup.object().shape({
    name: yup.string()
        .min(2, "*Name must be at least 2 characters")
        .max(59, "*Name must be less than 59 characters")
        .required("*Name is required"),
    wikiURL: yup.string()
        .trim()
        .url("Wiki must be a valid URL")
        .required("*Wiki is required")
});

export const pvmTaskSchema = yup.object().shape({
    taskName: yup.string()
        .min(2, "*Task name must be at least 2 characters")
        .max(59, "*Task name must be less than 59 characters")
        .required("*Task name is required")
});

export const BronzeManItemSchema = yup.object().shape({
    name: yup.string()
        .required("*Name is required")
});