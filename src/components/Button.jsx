import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

export const themes = {
  default: {
    color: "#2b3bcd",
    background: "white",
  },
  inverted: {
    color: "white",
    background: "#2b3bcd",
  },
};

export const Button = ({ children, to = "#", theme = themes.default }) => {
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
