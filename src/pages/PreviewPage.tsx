import React from 'react';
import {
  BackButton,
  MainButton,
  useWebApp,
} from '@vkruglikov/react-telegram-web-app';
import { useNavigate, useParams } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import List from '../components/List/List';
import CopyIcon from '../icons/copy.svg';

import { answers } from '../../answers';

import styles from './PreviewPage.module.css';
import { IS_INLINE_MODE, PUBLIC_PATH, TELEGRAM_BOT_NAME } from '../constants';

const appendLineBreaks = (value: string) =>
  value.split('\n').reduce((memo, value) => {
    memo.push(<span key={memo.length}>{value}</span>);
    memo.push(<br key={memo.length} />);

    return memo;
  }, []);

const PreviewPage = () => {
  const answerId = useParams().id;
  const navigate = useNavigate();
  const answer = answers.find(({ id }) => id === answerId);

  const WebApp = useWebApp();

  const handleItemClick = () => {
    WebApp.HapticFeedback.notificationOccurred('success');
    WebApp.switchInlineQuery(
      answer.inlineQuery || `id:${answer.id}`,
      !IS_INLINE_MODE ? ['users'] : undefined,
    );
  };

  const inlineQuery = `@${TELEGRAM_BOT_NAME} ${
    answer.inlineQuery || `id:${answer.id}`
  }`;

  const handleCopyQuery = () => {
    if (copy(inlineQuery)) {
      WebApp.HapticFeedback.notificationOccurred('success');
    } else {
      WebApp.HapticFeedback.notificationOccurred('error');
    }
  };

  return answer ? (
    <>
      {/**
         React component API
         https://github.com/vkruglikov/react-telegram-web-app#components

         Telegram API:
         https://core.telegram.org/bots/webapps#backbutton
      */}
      <BackButton onClick={() => navigate(-1)} />
      <div>
        <div className={styles.formItemTitle}>Preview</div>
        <List items={[answer]} />
      </div>
      <div>
        <div className={styles.formItemTitle}>Inline query</div>
        <div
          className={styles.formItemMessage}
          role="button"
          onClick={handleCopyQuery}
        >
          {inlineQuery}
          <div className={styles.formItemMessage__copy}>
            <CopyIcon width={15} fill="red" />
          </div>
        </div>
      </div>
      {answer.type === 'photo' && (
        <div>
          <div className={styles.formItemTitle}>Photo</div>
          <div className={styles.formItemMessage}>
            <img
              loading="lazy"
              src={`${PUBLIC_PATH}${answer.message.photoUrl}`}
            />
          </div>
        </div>
      )}
      {answer.message.text && (
        <div>
          <div className={styles.formItemTitle}>
            {answer.type === 'photo' ? 'Caption' : 'Message'}
          </div>
          <div className={styles.formItemMessage}>
            {appendLineBreaks(answer.message.text)}
          </div>
        </div>
      )}
      {/**
       React component API
       https://github.com/vkruglikov/react-telegram-web-app#components

       Telegram API:
       https://core.telegram.org/bots/webapps#mainbutton
       */}
      <MainButton text="SEND" onClick={handleItemClick} />
    </>
  ) : null;
};

export default PreviewPage;
