import React, { FC } from 'react';
import styles from './TagFilter.module.css';

const toggleFilterValue = (
  tags: Record<string, boolean>,
  name: string,
  state: boolean,
): Record<string, boolean> => {
  const newState = {
    ...tags,
    [name]: state,
  };

  if (name === 'All' || !Object.entries(newState).some(([, state]) => state)) {
    Object.keys(tags).forEach(v => (newState[v] = v === 'All'));
  } else {
    newState.All = false;
  }

  return newState;
};

type TagFilterProps = {
  tags: Record<string, boolean>;
  onChange: (value: Record<string, boolean>) => void;
};

const TagFilter: FC<TagFilterProps> = ({ tags, onChange }) => (
  <div className={styles.filters}>
    {Object.entries(tags).map(([name, state]) => (
      <div
        rel="button"
        key={name}
        onClick={() => onChange(toggleFilterValue(tags, name, !state))}
        className={`${styles.filters__item} ${
          state ? styles.filters__item_active : ''
        }`}
      >
        {name}
      </div>
    ))}
  </div>
);

export default TagFilter;
