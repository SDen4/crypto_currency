import cl from './styles.module.css';

export const BtcBlockInfoButton = ({
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  console.log();

  return (
    <button className={`${cl.glowStripeBtn} ${props.className}`} {...props}>
      BTC Block Info
    </button>
  );
};
