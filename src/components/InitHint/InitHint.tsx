import cl from './styles.module.css';

const InitHint = () => {
  return (
    <div className={cl.arrowsContainer}>
      <p>Swipe left to see more</p>
      <div className={cl.arrowOne} />
      <div className={cl.arrowTwo} />
    </div>
  );
};

export default InitHint;
