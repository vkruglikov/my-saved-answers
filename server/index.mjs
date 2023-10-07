import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import mockedAnswers from '../answers.js';

dotenv.config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('Define TELEGRAM_BOT_TOKEN variable to .env file')
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  testEnvironment: process.env.TELEGRAM_API_TEST_ENVIRONMENT === 'true',
});

bot.onText(/^\/start/, (msg) => {
  const payload = msg.text.substring(7);

  bot.sendMessage(
      msg.chat.id,
      'Hello! 😊 This is a concept for a MiniApp application to send saved answers to Telegram.\n' +
      '\n' +
      (payload === 'add' ?
          '<b>You came from MiniAPP add icon button</b>\n' +
          'The bot currently operates on <a href="https://github.com/vkruglikov/my-saved-answers#mocked-data">mocked data</a>.\n' +
          'This button simply demonstrates the ability to redirect the user to a bot where they can add new messages\n' +
          '\n'
          : ''
      ) +
      'The open-source code, <b>all documentation</b>, <b>motivation</b> and <b>problems</b> are available in the repository at <a href="https://github.com/vkruglikov/my-saved-answers">vkruglikov/my-saved-answers</a> 👍',
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '✏️ Send saved answer to',
                switch_inline_query_chosen_chat: {
                  allow_user_chats: true
                }
              },
            ],
          ],
        },
      }
  );
});

bot.on('inline_query', async callbackQuery => {
  /**
   * Search by ID works based on a template id:(answers id)
   */
  const filterById = callbackQuery.query.match(/^id:(\w+)/)?.[1];

  const answers = mockedAnswers.answers.reduce((memo, item) => {
    if (filterById && filterById !== item.id) {
      return memo;
    }
    if (!filterById && callbackQuery.query && !item.title.toLowerCase().includes(callbackQuery.query.toLowerCase())) {
      return memo;
    }

    /**
     * https://core.telegram.org/bots/api#inlinequeryresult
     */
    memo.push({
      id: item.id,
      type: item.type,
      title: item.title,
      description: item.description || item.message.text,
      thumb_url: item.thumb
          ? `${process.env.TELEGRAM_WEBAPP_URL}${item.thumb}`
          : undefined,
      ...(item.type === 'article' ? ({
        input_message_content: {
          message_text: item.message.text,
        },
      }) : null),
      ...(item.type === 'photo' ? ({
        photo_url: `${process.env.TELEGRAM_WEBAPP_URL}${item.message.photoUrl}`,
        caption: item.message.text || ''
      }) : null)
    });

    return memo;
  }, []);

  /**
   * https://core.telegram.org/bots/api#answerinlinequery
   */
  bot.answerInlineQuery(callbackQuery.id, callbackQuery.query ? answers : [], {
    button: JSON.stringify({
      text: '⚡ My Saved Answers',
      web_app: {
        url: `${process.env.TELEGRAM_WEBAPP_URL}?inline`,
      },
    }),
    is_personal: true,
    cache_time: 0,
  });
});

bot.startPolling();
