/*
  index.js
  gideon entry point
  copyright (c) 2021 sporeball
  MIT license
*/

// dependencies
require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command('/gideon-ping', async ({ command, ack, say }) => {
  try {
    await ack();
    await say('pong!');
  } catch (err) {
    console.error(err);
  }
});

(async () => {
  await app.start(3000);
  console.log('running gideon!');
})();
