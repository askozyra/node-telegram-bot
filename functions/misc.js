import * as http from "http";
import { bot, fs } from "../config.js";
import { textPrettier, findVideoYT, extractAudioYT, audioByName, lytdybr, createRegexCmd } from "./functions.js";

bot.onText(createRegexCmd("echo", "(.+)"), (msg, match) => {
	const chatId = msg.chat.id;
	const resp = match[1];

	bot.sendMessage(chatId, resp);
});

bot.onText(createRegexCmd("lytdybr", "(.+)"), (msg, match) => {
	bot.sendMessage(msg.chat.id, lytdybr(match[1]));
});

bot.onText(createRegexCmd("makeprettytext", "(.+)"), (msg, match) => {
	bot.sendMessage(msg.chat.id, textPrettier(match[1]));
});

bot.onText(createRegexCmd("getrandomimage$"), (msg) => {
	let src = './src/avatars/';
	let dir = fs.readdirSync(src);
	let image = dir[Math.floor(Math.random() * (dir.length))];
	
	bot.sendPhoto(msg.chat.id, src + image);
});

bot.onText(createRegexCmd("getrandomvideo$"), (msg) => {
	let src = './src/videos/';
	let dir = fs.readdirSync(src);
	let video = dir[Math.floor(Math.random() * (dir.length))];
	
	bot.sendVideo(msg.chat.id, src + video);
});

bot.onText(createRegexCmd("getrandomaudio$"), (msg) => {
	let src = './temp/';
	let dir = fs.readdirSync(src);
	let song = dir[Math.floor(Math.random() * (dir.length))];
	while(song == "tmp.weba"){
		song = dir[Math.floor(Math.random() * (dir.length))];
	}
	
	bot.sendAudio(msg.chat.id, src + song);
});

bot.onText(createRegexCmd("youtube_audio_by_name", "(.+)"), (msg, match) => {
	audioByName(msg, match);
});

bot.onText(createRegexCmd("youtube_find_video", "(.+)$"), (msg, match) => {
	findVideoYT(msg, match[1]);
});

bot.onText(createRegexCmd("youtube_extract_audio", ".*?(?:(?:watch\?v=)|(?:.be\/))(.+?)$"), (msg, match) => {
	extractAudioYT(msg, match[1]);
});