const express = require("express");
const app = express();

app.listen(() => console.log(" >> Ready To Work :) << "));

app.get('/', (req, res) => {
  res.send(`AmtiXDev Says: Hi everyone :)`);
});

// Array of your bot tokens
const tokens = [
];

async function createBot(token) {
  try {
    const { Client } = require('discord.js-selfbot-v13');

    const client = new Client({
      checkUpdate: false,
    });
    const { joinVoiceChannel } = require('@discordjs/voice');

    client.on('ready', async () => {
      console.log(`Bot ${client.user.tag} is ready!`);

      try {
        const channel = await client.channels.fetch("1202207928564863016"); // Replace "CHANNEL_ID" with your actual channel ID
        const voiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
          selfMute: true,
          selfDeaf: false,
        });
        console.log(`Bot ${client.user.tag} joined the voice channel.`);
      } catch (error) {
        console.error(`Error joining voice channel for bot ${client.user.tag}:`, error);
      }

    });

    await client.login(token); // Use the current token to login
  } catch (error) {
    console.error('Error creating bot:', error);
  }
}

// Create a bot instance for each token
tokens.forEach(token => {
  createBot(token);
});

process.on('unhandledRejection', error => {
  console.error('Error has been handled!', error);
});
