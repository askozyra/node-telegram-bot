import * as http from "http";
import { bot, fs } from "../config.js";
import { textPrettier, findVideoYT, extractAudioYT, audioByName, lytdybr } from "./functions.js";

bot.onText(/^\/echo (.+)/, (msg, match) => {
	const chatId = msg.chat.id;
	const resp = match[1];

	bot.sendMessage(chatId, resp);
});

bot.onText(/^\/lytdybr(?:@EjjyBot)? *?(.+)/, (msg, match) => {
	bot.sendMessage(msg.chat.id, lytdybr(match[1]));
});

bot.onText(/^\/makeprettytext(?:@EjjyBot)? *?(.+)/, (msg, match) => {
	bot.sendMessage(msg.chat.id, textPrettier(match[1]));
});

bot.onText(/^\/getrandomimage$/, (msg) => {
	let src = './src/avatars/';
	let dir = fs.readdirSync(src);
	let image = dir[Math.floor(Math.random() * (dir.length))];
	
	bot.sendPhoto(msg.chat.id, src + image);
});

bot.onText(/^\/getrandomvideo$/, (msg) => {
	let src = './src/videos/';
	let dir = fs.readdirSync(src);
	let video = dir[Math.floor(Math.random() * (dir.length))];
	
	bot.sendVideo(msg.chat.id, src + video);
});

bot.onText(/^\/getrandomaudio$/, (msg) => {
	let src = './temp/';
	let dir = fs.readdirSync(src);
	let song = dir[Math.floor(Math.random() * (dir.length))];
	while(song == "tmp.weba"){
		song = dir[Math.floor(Math.random() * (dir.length))];
	}
	
	bot.sendAudio(msg.chat.id, src + song);
});

bot.onText(/^\/youtube_audio_by_name(?:@\S+){0,1} +?(.+)$/, (msg, match) => {
	audioByName(msg, match);
});

bot.onText(/^\/youtube_find_video(?:@\S+){0,1} +?(.+)$/, (msg, match) => {
	findVideoYT(msg, match[1]);
});

bot.onText(/^\/youtube_extract_audio(?:@\S+){0,1} +?.+?(?:(?:watch\?v=)|(?:.be\/))(.+?)$/, (msg, match) => {
	extractAudioYT(msg, match[1]);
});

bot.onText(/^\/youtube_inline_video(?:@\S+){0,1} +?(.+?(?:(?:watch\?v=)|(?:.be\/))(?:.+?))$/, (msg, match) => {
	let link = match[1];

	bot.sendVideo(msg.chat.id, link);
});