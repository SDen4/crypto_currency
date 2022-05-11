import clsx from 'clsx';
import React from 'react';

import { SliderButtonType } from './types';

import styles from './styles.module.css';

const SliderButton: React.FC<SliderButtonType> = ({ left }) => {
  return (
    <button
      type="button"
      className={clsx(styles.button, left && styles.buttonLeft)}
    />
  );
};

export default SliderButton;
