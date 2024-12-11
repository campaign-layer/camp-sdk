import styles from "./styles/auth.module.css";
import React, { useEffect, useState } from "react";

/**
 * The injected CampButton component.
 * @param { { onClick: function, authenticated: boolean } } props The props.
 * @returns { JSX.Element } The CampButton component.
 */
export const CampButton = ({ onClick, authenticated, disabled }) => {
  return (
    <button
      className={styles["connect-button"]}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles["button-icon"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 571.95 611.12"
          height="1rem"
          width="1rem"
        >
          <path
            d="m563.25 431.49-66.17-51.46c-11.11-8.64-27.28-5.06-33.82 7.4-16.24 30.9-41.69 56.36-70.85 73.73l-69.35-69.35c-3.73-3.73-8.79-5.83-14.07-5.83s-10.34 2.1-14.07 5.83l-73.78 73.78c-57.37-30.39-96.55-90.71-96.55-160.03 0-99.79 81.19-180.98 180.98-180.98 60.35 0 118.17 26.28 156.39 89.44 6.85 11.32 21.92 14.33 32.59 6.51l64.21-47.06c9.53-6.98 12.06-20.15 5.78-30.16C508.83 54.41 411.43 0 305.56 0 137.07 0 0 137.07 0 305.56s137.07 305.56 305.56 305.56c57.6 0 113.72-16.13 162.31-46.63A306.573 306.573 0 0 0 568.8 460.8c5.78-9.78 3.42-22.34-5.55-29.31Zm-301.42 49.69 47.15-47.15 44.69 44.69c-15.92 5.1-32.2 7.83-48.1 7.83-15.08 0-29.72-1.87-43.74-5.36Zm42.36-222.47c-.07 1.49-.08 21.29 49.54 55.11 37.02 25.24 19.68 75.52 12.1 92.05a147.07 147.07 0 0 0-20.12-38.91c-12.73-17.59-26.87-28.9-36.74-35.59-10.38 6.36-27.41 18.74-41.07 40.02-8.27 12.89-12.82 25.16-15.42 34.48l-.03-.05c-15.1-40.6-9.75-60.88-1.95-71.9 6.12-8.65 17.24-20.6 17.24-20.6 9.71-9.66 19.96-19.06 29.82-38.17 6.06-11.75 6.59-15.84 6.63-16.45Z"
            fill="#000"
            strokeWidth="0"
          />
          <path
            d="M267.74 313.33s-11.11 11.95-17.24 20.6c-7.8 11.02-13.14 31.3 1.95 71.9-86.02-75.3 2.56-152.15.79-146.3-6.58 21.75 14.49 53.8 14.49 53.8Zm20.98-23.66c3.01-4.27 5.97-9.06 8.8-14.55 6.62-12.83 6.64-16.54 6.64-16.54s-2.09 20.02 49.53 55.21c37.02 25.24 19.68 75.52 12.1 92.05 0 0 43.69-27.86 37.49-74.92-7.45-56.61-38.08-51.5-60.84-93.43-21.23-39.11 15.03-70.44 15.03-70.44s-48.54-2.61-70.76 48.42c-23.42 53.77 2 74.21 2 74.21Z"
            fill="#ff6d01"
            strokeWidth="0"
          />
        </svg>
      </div>
      {authenticated ? "My Camp" : "Connect"}
    </button>
  );
};

/**
 * The ProviderButton component.
 * @param { { provider: { provider: string, info: { name: string, icon: string } }, handleConnect: function, loading: boolean, label: string } } props The props.
 * @returns { JSX.Element } The ProviderButton component.
 */
export const ProviderButton = ({ provider, handleConnect, loading, label }) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const handleClick = () => {
    handleConnect(provider);
    setIsButtonLoading(true);
  };
  useEffect(() => {
    if (!loading) {
      setIsButtonLoading(false);
    }
  }, [loading]);
  return (
    <button
      className={styles["provider-button"]}
      onClick={handleClick}
      disabled={loading}
    >
      <img
        src={
          provider.info.icon ||
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%23777777' d='M21 7.28V5c0-1.1-.9-2-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0 0 22 15V9a2 2 0 0 0-1-1.72M20 9v6h-7V9zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2z'/%3E%3Ccircle cx='16' cy='12' r='1.5' fill='%23777777'/%3E%3C/svg%3E"
        }
        className={styles["provider-icon"]}
        alt={provider.info.name}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <span className={styles["provider-name"]}>{provider.info.name}</span>
        {label && <span className={styles["provider-label"]}>({label})</span>}
      </div>
      {isButtonLoading && <div className={styles.spinner} />}
    </button>
  );
};

export const ConnectorButton = ({
  name,
  link,
  unlink,
  icon,
  isConnected,
  refetch,
}) => {
  const [isUnlinking, setIsUnlinking] = useState(false);
  const handleClick = () => {
    link();
  };
  const handleDisconnect = async () => {
    setIsUnlinking(true);
    try {
      await unlink();
      await refetch();
      setIsUnlinking(false);
    } catch (error) {
      setIsUnlinking(false);
      console.error(error);
    }
  };
  return (
    <div className={styles["connector-container"]}>
      {isConnected ? (
        <div
          className={styles["connector-connected"]}
          data-connected={isConnected}
        >
          {icon}
          <span>{name}</span>
          {isUnlinking ? (
            <div
              className={styles.loader}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                right: "0.375rem",
              }}
            />
          ) : (
            <button
              className={styles["unlink-connector-button"]}
              onClick={handleDisconnect}
              disabled={isUnlinking}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 22v-2m-8-5l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11m14 6h2M2 7h2m3-5v2"
                />
              </svg>
              Unlink
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={handleClick}
          className={styles["connector-button"]}
          disabled={isConnected}
        >
          {icon}
          <span>{name}</span>
        </button>
      )}
    </div>
  );
};