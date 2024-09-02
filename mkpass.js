#!/usr/bin/env node

const crypto = require('crypto');

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialChars = "!@#$%^&*()_+-=[]{}|:,.<>?~";
const numbers = "0123456789";
const charset = letters + numbers;
const charsetLen = charset.length;


function genPassword(passwordLen = 14) {
  console.warn('Generating password with size = ', passwordLen);
  const rand = crypto.getRandomValues(new Uint8Array(passwordLen));
  const [specialCharPoint, numberPoint] = crypto.getRandomValues(new Uint8Array(passwordLen)).map(v => v % passwordLen);

  let password = '';
  for (const [i, v] of rand.entries()) {
    switch (i) {
      case specialCharPoint:
        password += specialChars[v % specialChars.length];
        break;
      case numberPoint:
        password += numbers[v % numbers.length];
        break;
      default:
        password += charset[v % charsetLen];
    }
  }
  return password;
}

console.log(genPassword(process.argv[2]));
