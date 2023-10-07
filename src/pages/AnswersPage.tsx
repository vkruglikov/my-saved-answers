import React, { useState } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';

import TagFilter from '../components/TagFilter/TagFilter';
import List from '../components/List/List';
import PlusIcon from '../icons/plus.svg';

import { Answer, visibleAnswers as answers } from '../../answers';

import styles from './AnswersPage.module.css';
import { IS_INLINE_MODE, TELEGRAM_BOT_NAME } from '../constants';

const getInitialTags = () => {
  const tags: Record<string, boolean> = { All: true };

  for (const item of answers) {
    for (const tag of item.tags) {
      tags[tag] = false;
    }
  }

  return tags;
};

const AnswersPage = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Record<string, boolean>>(getInitialTags);
  const filteredByTagsItems = tags.All
    ? answers
    : answers.filter(item => item.tags.some(tag => tags[tag]));

  const WebApp = useWebApp();

  const handleItemClick = (item: Answer) => {
    WebApp.HapticFeedback.notificationOccurred('success');
    WebApp.switchInlineQuery(
      item.inlineQuery || `id:${item.id}`,
      !IS_INLINE_MODE ? ['users'] : undefined,
    );
  };
  const handlePlusIconClick = () => {
    WebApp.openTelegramLink(`https://t.me/${TELEGRAM_BOT_NAME}?start=add`);
  };

  const handlePreviewClick = (item: Answer) => navigate(`/preview/${item.id}`);

  return (
    <>
      <div className={styles.header}>
        <TagFilter onChange={setTags} tags={tags} />
        <div
          onClick={handlePlusIconClick}
          role="button"
          className={styles.header__create}
        >
          <PlusIcon />
        </div>
      </div>
      <List
        showPreviewIcon
        onClick={handleItemClick}
        onClickPreview={handlePreviewClick}
        items={filteredByTagsItems}
      />
    </>
  );
};

export default AnswersPage;
