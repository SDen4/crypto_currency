import cl from './styles.module.css';

interface IProps {
  onClick: () => void;
  left?: boolean;
  disabled?: boolean;
}

const SliderButton = ({ left, onClick, disabled }: IProps) => {
  return (
    <button
      type="button"
      className={`${cl.button} ${left && cl.buttonLeft} ${
        disabled && cl.disabled
      }`}
      onClick={onClick}
      aria-label={left ? 'Left' : 'Right'}
    />
  );
};

export default SliderButton;
