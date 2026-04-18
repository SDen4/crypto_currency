import { symbols } from '../../constants';

import cl from './styles.module.css';

interface IProps {
  slide: number;
  onDotClick: (i: number) => void;
}

export const SliderDots = ({ slide, onDotClick }: IProps) => {
  const onClickHandler = (i: number) => onDotClick(i);

  return (
    <div className={cl.dotsWrapper}>
      {symbols.map((el, i) => {
        return (
          <div
            className={`${cl.dot} ${i === slide ? cl.dotActive : ''}`}
            key={el}
            onClick={() => onClickHandler(i)}
          />
        );
      })}
    </div>
  );
};
