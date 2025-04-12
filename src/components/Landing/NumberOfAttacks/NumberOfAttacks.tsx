import styles from "./NumberOfAttacks.module.css";

type Props = {
  number: number;
  className?: string;
};

export const NumberOfAttacks = ({ number, className }: Props) => {
  return (
    <article className={`${styles.numberOfAttacks} ${className ?? ""}`}>
      {number} casos
    </article>
  );
};
