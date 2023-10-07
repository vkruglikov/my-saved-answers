import React, { FC, memo } from 'react';

import styles from './ListItem.module.css';
import PreviewIcon from '../../icons/preview.svg';
import { Answer } from '../../../answers';
import { PUBLIC_PATH } from '../../constants';

type ListItem = {
  item: Answer;
  onClick: (id: string) => void;
  onClickPreview: (id: string) => void;
  showPreviewIcon?: boolean;
};

const ListItem: FC<ListItem> = ({
  onClick,
  onClickPreview,
  item,
  showPreviewIcon,
}) => (
  <div onClick={() => onClick?.(item.id)} role="button" className={styles.item}>
    <div
      className={styles.thumb}
      onClick={e => {
        e.stopPropagation();
        onClickPreview(item.id);
      }}
    >
      {item.thumb ? (
        <img
          alt={item.title.toUpperCase().charAt(0)}
          src={`${PUBLIC_PATH}${item.thumb}`}
          className={styles.thumbCover}
          loading="lazy"
        />
      ) : (
        item.title.toUpperCase().charAt(0)
      )}
      {showPreviewIcon && (
        <div className={styles.thumbPreviewIcon}>
          <PreviewIcon width={12} />
        </div>
      )}
    </div>
    <div className={styles.content}>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.description}>
        {item.description || item.message.text}
      </div>
    </div>
  </div>
);
export default ListItem;
