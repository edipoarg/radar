import { Link } from "react-router-dom";
import styles from "./Button.module.css";
import type { PropsWithChildren } from "react";

type ButtonTheme = {
  color: string;
  background: string;
  hover: string;
};

const defaultTheme: ButtonTheme = {
  color: "#2b3bcd",
  background: "white",
  hover: "#535bf2",
};

type Props = PropsWithChildren & {
  to?: string;
  theme?: ButtonTheme;
};

export const Button = ({ children, to = "#", theme }: Props) => {
  /* superload theme with defaultTheme */
  theme = { ...defaultTheme, ...(theme ?? {}) };

  const css = {
    color: theme.color,
    background: theme.background,
    hover: theme.hover,
  };
  return (
    <div className={styles.container}>
      <Link to={to} className={styles.button} style={css}>
        {children}
      </Link>
    </div>
  );
};
