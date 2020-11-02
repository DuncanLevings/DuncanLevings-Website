/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const ACCESS_TOKEN_TTL = 30 * (60 * 1000); // 30 min
const REMEMBER_TOKEN_TTL = 30 * 24 * 60 * (60 * 1000); // 30 day
const CONNECT_TTL = 60 * (60 * 1000); // 1 hour

module.exports = {
    ACCESS_TOKEN_TTL,
    REMEMBER_TOKEN_TTL,
    CONNECT_TTL
}