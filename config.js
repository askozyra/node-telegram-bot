import TelegramBot from 'node-telegram-bot-api';
import * as fs from 'fs';
import * as dotEnv from 'dotenv/config';

const dbPath = './src/users.json';
const token = process.env["TELEGRAM_API_KEY"];
const bot = new TelegramBot(token, {polling: true});
const bot_name = process.env["TELEGRAM_BOT_NAME"];

let users = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

export {dbPath, bot, bot_name, users, fs};