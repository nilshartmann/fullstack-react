import { ReactNode } from "react";

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
  const bounceClass = placeholder ? `bounce` : `bounce fill`;

  return secondary ? (
    <div className={`Spinner secondary`}>
      <div className={`${bounceClass} bounce1`}>{placeholder}</div>
      <div className={`${bounceClass} bounce2`}>{placeholder}</div>
      <div className={`${bounceClass} bounce3`}>{placeholder}</div>
    </div>
  ) : (
    <div className={`Spinner font-space`}>
      {children && <h1>{children}</h1>}
      <div className={`${bounceClass} bounce1`}>{placeholder}</div>
      <div className={`${bounceClass} bounce2`}>{placeholder}</div>
      <div className={`${bounceClass} bounce3`}>{placeholder}</div>
    </div>
  );
}

export function LikeIndicator() {
  const bounceClass = `bounce`;
  const placeholder = <i className="fa-regular fa-heart mr-2"></i>;

  return (
    <span className={`Spinner secondary`}>
      {/*<div className={`${bounceClass} ${styles.bounce1}`}>{placeholder}</div>*/}
      <span className={`${bounceClass} bounce2`}>{placeholder}</span>
      {/*<div className={`${bounceClass} ${styles.bounce3}`}>{placeholder}</div>*/}
    </span>
  );
}

export function LikeIcon() {
  const placeholder = <i className="fa-regular fa-heart mr-2"></i>;

  return (
    <span className={`Spinner secondary`}>
      {/*<div className={`${bounceClass} ${styles.bounce1}`}>{placeholder}</div>*/}
      <span className={`dummy bounce2`}>{placeholder}</span>
      {/*<div className={`${bounceClass} ${styles.bounce3}`}>{placeholder}</div>*/}
    </span>
  );
}
