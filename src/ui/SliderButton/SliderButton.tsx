import React, { FC } from 'react';

import styles from './styles.module.css';

interface IProps {
  onClick: () => void;
  left?: boolean;
  disabled?: boolean;
}

const SliderButton: FC<IProps> = ({ left, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${left && styles.buttonLeft} ${
        disabled && styles.disabled
      }`}
      onClick={onClick}
      aria-label={left ? 'Left' : 'Right'}
    />
  );
};

export default SliderButton;
