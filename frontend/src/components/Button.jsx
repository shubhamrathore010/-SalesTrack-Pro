import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  disabled = false,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${
        disabled ? styles.disabled : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
