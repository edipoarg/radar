import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const defaultTheme = {
  color: "#2b3bcd",
  background: "white",
  hover: "#535bf2",
};

export const Button = ({ children, to = "#", theme = {} }) => {
  theme = { ...defaultTheme, ...theme };

  const css = {
    "--color": theme.color,
    "--background": theme.background,
    "--hover": theme.hover,
  };
  return (
    <div className={styles.container}>
      <Link to={to} className={styles.button} style={css}>
        {children}
      </Link>
    </div>
  );
};
Button.propTypes = {
  children: PropTypes.Element,
  to: PropTypes.string,
  theme: PropTypes.any /* FIXME */,
};
