<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">NodeJS Telegram Bot</h1>
  <p align="center">
    <img src="https://user-images.githubusercontent.com/72695696/134920719-863e3492-34d1-4f75-b5f3-de2a522f423c.png">
  </p>
  <p align="center">
    With simple functionality
    <br/>
    <br/>
    <br/>
    <a href="https://github.com/askozyra/node-telegram-bot/issues">Report Bug</a>
    •
  <a href="https://github.com/askozyra/node-telegram-bot/pulls">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Telegram bot with NodeJS as server. Can send messages in text, video and audio formats. Also works with the YT API, searching for video on query. The bot can also receive an audio track from the video and send it as an audio recording. This is done using the ffmpeg library set, which converts the resulting video to mp3 format. The bot also interacts with the project API [jsoned](https://github.com/askozyra/jsoned) (currently only with documents).

It does not have a complete database.

### Built With

* [NodeJS](https://nodejs.org/en/)
* [YT Data API v3](https://console.cloud.google.com/apis)
* [FFmpeg](https://ffmpeg.org)



<!-- GETTING STARTED -->
## Getting Started

Get the project:
  ```sh
  git clone https://github.com/askozyra/node-telegram-bot
  ```

### Prerequisites

* [npm](https://www.npmjs.com)
* [FFmpeg](https://ffmpeg.org)

### Installation

1. Get a YT Data API Key at https://console.cloud.google.com/apis

2. Get a Telegram Bot API Token using [@BotFather](https://t.me/botfather)

3. Install npm dependencies:
  ```sh
  npm install
  ```

4. Enter your token in `.env`
   ```env
   TELEGRAM_API_KEY='TOKEN';
   YOUTUBE_API_KEY='TOKEN';
   ```



<!-- USAGE EXAMPLES -->
## Usage

Full list of the bot's commands you can see in the file `command_palette.js`.

To work with the video-to-audio converter, you need to install FFmpeg.

You should also create the following file structure:
```
├───functions
│   └───materials
│       └───animation
├───src
│   ├───avatars
│   ├───img
│   └───videos
└───temp
```


<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact

Email: khnu2019@gmail.com

LinkedIn: [askozyra](https://linkedin.com/in/askozyra)

Project Link: [https://github.com/askozyra/node-telegram-bot][project-url]


<!-- MARKDOWN LINKS & IMAGES -->
[project-url]: https://github.com/askozyra/node-telegram-bot
[project-ico]: https://user-images.githubusercontent.com/72695696/134920719-863e3492-34d1-4f75-b5f3-de2a522f423c.png
