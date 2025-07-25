import { ReactNode } from "react";

import styles from "./LoadingIndicator.module.css";

type LoadingIndicatorProps = {
  children?: ReactNode;
  secondary?: boolean;
  placeholder?: ReactNode;
};

export default function LoadingIndicator({
  children,
  placeholder,
  secondary,
}: LoadingIndicatorProps) {
  const bounceClass = placeholder
    ? `${styles.bounce}`
    : `${styles.bounce} ${styles.fill}`;

  return secondary ? (
    <div className={`${styles.Spinner} ${styles.secondary}`}>
      <div className={`${bounceClass} ${styles.bounce1}`}>{placeholder}</div>
      <div className={`${bounceClass} ${styles.bounce2}`}>{placeholder}</div>
      <div className={`${bounceClass} ${styles.bounce3}`}>{placeholder}</div>
    </div>
  ) : (
    <div className={`${styles.Spinner} font-space`}>
      {children && <h1>{children}</h1>}
      <div className={`${bounceClass} ${styles.bounce1}`}>{placeholder}</div>
      <div className={`${bounceClass} ${styles.bounce2}`}>{placeholder}</div>
      <div className={`${bounceClass} ${styles.bounce3}`}>{placeholder}</div>
    </div>
  );
}

export function LikeIndicator() {
  const bounceClass = `${styles.bounce}`;
  const placeholder = <i className="fa-regular fa-heart mr-2"></i>;

  return (
    <span className={`${styles.Spinner} ${styles.secondary}`}>
      {/*<div className={`${bounceClass} ${styles.bounce1}`}>{placeholder}</div>*/}
      <span className={`${bounceClass} ${styles.bounce2}`}>{placeholder}</span>
      {/*<div className={`${bounceClass} ${styles.bounce3}`}>{placeholder}</div>*/}
    </span>
  );
}

export function LikeIcon() {
  const bounceClass = `${styles.dummy}`;
  const placeholder = <i className="fa-regular fa-heart mr-2"></i>;

  return (
    <span className={`${styles.Spinner} ${styles.secondary}`}>
      {/*<div className={`${bounceClass} ${styles.bounce1}`}>{placeholder}</div>*/}
      <span className={`${bounceClass} ${styles.bounce2}`}>{placeholder}</span>
      {/*<div className={`${bounceClass} ${styles.bounce3}`}>{placeholder}</div>*/}
    </span>
  );
}
