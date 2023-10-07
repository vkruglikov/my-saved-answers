import React, { FC } from 'react';

import styles from './List.module.css';
import ListItem from './ListItem';
import { Answer, Answers } from '../../../answers';

type ListProps = {
  items: Answers;
  onClick?: (item: Answer) => void;
  onClickPreview?: (item: Answer) => void;
  showPreviewIcon?: boolean;
};

const List: FC<ListProps> = ({
  items,
  onClick,
  onClickPreview,
  showPreviewIcon,
}) => (
  <div className={styles.list}>
    {items.map(item => (
      <ListItem
        showPreviewIcon={showPreviewIcon}
        onClickPreview={() => onClickPreview?.(item)}
        onClick={() => onClick?.(item)}
        item={item}
        key={item.id}
      />
    ))}
  </div>
);

export default List;
