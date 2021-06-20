/*
  index.js
  gideon entry point
  copyright (c) 2021 sporeball
  MIT license
*/

// dependencies
require('dotenv').config();
const { App } = require('@slack/bolt');

const Conf = require('conf');
const conf = new Conf({
  configName: 'db',
  cwd: '.'
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
const client = app.client;

app.command('/gideon-ping', async ({ command, ack, say }) => {
  try {
    await ack();
    await say('pong!');
  } catch (err) {
    console.error(err);
  }
});

app.command('/gideon-link', async ({ command, ack }) => {
  try {
    await ack();

    let info = await client.users.info({ user: command.user_id });

    await conf.set(`channels.${command.channel_id}.timezone`, info.tz_offset);
    await app.client.chat.postEphemeral({
      channel: command.channel_id,
      user: command.user_id,
      text: `success! my posts in this channel are now linked to your timezone (*${info.tz}*).`
    });
  } catch (err) {
    console.error(err);
  }
});

(async () => {
  await app.start(3000);
  console.log('running gideon!');
})();
