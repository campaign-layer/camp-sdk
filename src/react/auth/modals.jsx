import React, { useContext, useEffect, useState } from "react";
import {
  useAuthState,
  useConnect,
  useProvider,
  useProviders,
  useSocials,
} from "./index.jsx";
import { ModalContext } from "../context/ModalContext.jsx";
import styles from "./styles/auth.module.css";
import { CampContext } from "../context/CampContext.jsx";
import { formatAddress, capitalize } from "../../utils.js";
import { useWalletConnectProvider } from "../../auth/viem/walletconnect.js";
import { useAccount, useConnectorClient } from "wagmi";
import { ClientOnly, ReactPortal, getIconByConnectorName } from "../utils.js";
import { CampButton, ProviderButton, ConnectorButton } from "./buttons.jsx";
import { DiscordIcon, TwitterIcon, SpotifyIcon, CloseIcon, CampIcon } from "./icons.jsx";

/**
 * The Auth modal component.
 * @param { { setIsVisible: function, wcProvider: object, loading: boolean, onlyWagmi: boolean, defaultProvider: object } } props The props.
 * @returns { JSX.Element } The Auth modal component.
 */
const AuthModal = ({
  setIsVisible,
  wcProvider,
  loading,
  onlyWagmi,
  defaultProvider,
}) => {
  const { connect } = useConnect();
  const { setProvider } = useProvider();
  const { auth, wagmiAvailable } = useContext(CampContext);
  const [customProvider, setCustomProvider] = useState(null);
  const providers = useProviders();
  const [customConnector, setCustomConnector] = useState(null);
  const [customAccount, setCustomAccount] = useState(null);
  let wagmiConnectorClient;
  let wagmiAccount;
  if (wagmiAvailable) {
    wagmiConnectorClient = useConnectorClient();
    wagmiAccount = useAccount();
  }

  const handleWalletConnect = async ({ provider }) => {
    auth.setLoading(true);
    try {
      if (provider.connected) await provider.disconnect();
      await provider.connect();
    } catch (error) {
      auth.setLoading(false);
    }
  };

  useEffect(() => {
    if (wagmiAvailable && !defaultProvider) {
      setCustomConnector(wagmiConnectorClient);
      setCustomAccount(wagmiAccount);
    }
  }, [
    wagmiAvailable,
    defaultProvider,
    wagmiAccount,
    wagmiConnectorClient?.data,
  ]);

  useEffect(() => {
    if (defaultProvider && defaultProvider.provider && defaultProvider.info) {
      let addr = defaultProvider.provider.address;
      const acc = {
        connector: {
          ...defaultProvider.info,
          icon:
            defaultProvider.info.icon ||
            getIconByConnectorName(defaultProvider.info.name),
        },
        address: addr,
      };
      if (!addr) {
        defaultProvider.provider
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => {
            setCustomAccount({
              ...acc,
              address: accounts[0],
            });
          });
      } else {
        setCustomAccount(acc);
      }
      setCustomProvider(defaultProvider.provider);
    }
  }, [defaultProvider]);

  useEffect(() => {
    if (wagmiAvailable && customConnector) {
      const provider = customConnector.data;
      if (provider) {
        setCustomProvider(provider);
      }
    }
  }, [customConnector, customConnector?.data, wagmiAvailable, customProvider]);

  useEffect(() => {
    const doConnect = async () => {
      handleConnect({
        provider: wcProvider,
        info: { name: "WalletConnect" },
      });
    };
    if (wcProvider) {
      wcProvider.on("connect", doConnect);
    }
    return () => {
      if (wcProvider) {
        wcProvider.off("connect", doConnect);
      }
    };
  }, [wcProvider]);

  const handleConnect = (provider) => {
    if (provider) setProvider(provider);
    // necessary for appkit, as it doesn't seem to support the "eth_requestAccounts" method
    if (
      customAccount?.address &&
      customProvider?.uid &&
      provider?.provider?.uid === customProvider?.uid
    ) {
      auth.setWalletAddress(customAccount?.address);
    }
    connect();
  };
  return (
    <div className={styles.container}>
      <div
        className={styles["close-button"]}
        onClick={() => setIsVisible(false)}
      >
        <CloseIcon />
      </div>
      <div className={styles.header}>
        {/* <img
          className={styles["modal-icon"]}
          src="https://cdn.harbor.gg/project/15/0e836c2dc9302eea702c398012a8e5c114108e32e8e0cbedcd348ce4773f642f.jpg"
          alt="Camp Network"
        /> */}
        <div className={styles["modal-icon"]}>
          <CampIcon />
        </div>
        <span>Connect with Camp</span>
      </div>

      <div
        className={`${customAccount?.connector ? styles["big"] : ""} ${
          styles["provider-list"]
        }`}
      >
        {customAccount?.connector && (
          <>
            <ProviderButton
              provider={{
                provider: customProvider || window.ethereum,
                info: {
                  name: customAccount.connector.name,
                  icon:
                    customAccount.connector.icon ||
                    getIconByConnectorName(customAccount.connector.name),
                },
              }}
              label={formatAddress(customAccount.address)}
              handleConnect={handleConnect}
              loading={loading}
            />
            {(providers.length || wcProvider || window.ethereum) &&
              !onlyWagmi &&
              !defaultProvider?.exclusive && (
                <div className={styles["divider"]} />
              )}
          </>
        )}
        {!onlyWagmi &&
          !defaultProvider?.exclusive &&
          providers.map((provider) => (
            <ProviderButton
              provider={provider}
              handleConnect={handleConnect}
              loading={loading}
              key={provider.info.uuid}
            />
          ))}
        {!onlyWagmi && !defaultProvider?.exclusive && wcProvider && (
          <ProviderButton
            provider={{
              provider: wcProvider,
              info: {
                name: "WalletConnect",
                icon: "data:image/svg+xml,%3Csvg fill='%233B99FC' role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.913 7.519c3.915-3.831 10.26-3.831 14.174 0l.471.461a.483.483 0 0 1 0 .694l-1.611 1.577a.252.252 0 0 1-.354 0l-.649-.634c-2.73-2.673-7.157-2.673-9.887 0l-.694.68a.255.255 0 0 1-.355 0L4.397 8.719a.482.482 0 0 1 0-.693l.516-.507Zm17.506 3.263 1.434 1.404a.483.483 0 0 1 0 .694l-6.466 6.331a.508.508 0 0 1-.709 0l-4.588-4.493a.126.126 0 0 0-.178 0l-4.589 4.493a.508.508 0 0 1-.709 0L.147 12.88a.483.483 0 0 1 0-.694l1.434-1.404a.508.508 0 0 1 .709 0l4.589 4.493c.05.048.129.048.178 0l4.589-4.493a.508.508 0 0 1 .709 0l4.589 4.493c.05.048.128.048.178 0l4.589-4.493a.507.507 0 0 1 .708 0Z'/%3E%3C/svg%3E",
              },
            }}
            handleConnect={handleWalletConnect}
            loading={loading}
          />
        )}
        {!onlyWagmi && !defaultProvider?.exclusive && window.ethereum && (
          <ProviderButton
            provider={{
              provider: window.ethereum,
              info: {
                name: "Browser Wallet",
              },
            }}
            label="window.ethereum"
            handleConnect={handleConnect}
            loading={loading}
          />
        )}
      </div>
      <a
        href="https://campnetwork.xyz"
        className={styles["footer-text"]}
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Camp Network
      </a>
    </div>
  );
};

/**
 * The CampModal component.
 * @param { { injectButton?: boolean, wcProjectId?: string, onlyWagmi?: boolean, defaultProvider?: object } } props The props.
 * @returns { JSX.Element } The CampModal component.
 */
export const CampModal = ({
  injectButton = true,
  wcProjectId,
  onlyWagmi = false,
  defaultProvider,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { authenticated, loading } = useAuthState();
  const { isVisible, setIsVisible } = useContext(ModalContext);
  const { isLinkingVisible } = useContext(ModalContext);
  const { provider } = useProvider();
  const providers = useProviders();
  const { wagmiAvailable } = useContext(CampContext);
  let customAccount;
  if (wagmiAvailable) {
    customAccount = useAccount();
  }

  const walletConnectProvider = wcProjectId
    ? useWalletConnectProvider(wcProjectId)
    : null;

  const handleModalButton = () => {
    setIsVisible(true);
  };
  useEffect(() => {
    if (authenticated) {
      if (isVisible) {
        setIsVisible(false);
      }
    }
  }, [authenticated]);

  // Cases where the button should be disabled
  useEffect(() => {
    const noProvider = !provider.provider;
    const noWagmiOrAccount = !wagmiAvailable || !customAccount?.isConnected;
    const noWalletConnectProvider = !walletConnectProvider;
    const noProviders = !providers.length;
    const onlyWagmiNoAccount = onlyWagmi && !customAccount?.isConnected;
    const noDefaultProvider = !defaultProvider || !defaultProvider.provider;
    const defaultProviderExclusive = defaultProvider?.exclusive;

    const noAvailableProviders =
      noProvider &&
      noWagmiOrAccount &&
      noWalletConnectProvider &&
      noProviders &&
      noDefaultProvider;

    const shouldDisableButton =
      (noAvailableProviders ||
        onlyWagmiNoAccount ||
        (noDefaultProvider && defaultProviderExclusive)) &&
      !authenticated;

    setIsButtonDisabled(shouldDisableButton);
  }, [
    provider,
    wagmiAvailable,
    customAccount,
    walletConnectProvider,
    providers,
    authenticated,
    defaultProvider,
  ]);

  return (
    <ClientOnly>
      <div>
        {injectButton && (
          <CampButton
            disabled={isButtonDisabled}
            onClick={handleModalButton}
            authenticated={authenticated}
          />
        )}
        <ReactPortal wrapperId="camp-modal-wrapper">
          {isLinkingVisible && <LinkingModal />}
          {isVisible && (
            <div
              className={styles.modal}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsVisible(false);
                }
              }}
            >
              {authenticated ? (
                <MyCampModal wcProvider={walletConnectProvider} />
              ) : (
                <AuthModal
                  setIsVisible={setIsVisible}
                  wcProvider={walletConnectProvider}
                  loading={loading}
                  onlyWagmi={onlyWagmi}
                  defaultProvider={defaultProvider}
                />
              )}
            </div>
          )}
        </ReactPortal>
      </div>
    </ClientOnly>
  );
};

const LinkingModal = () => {
  const { isLoading: isSocialsLoading, data: socials, refetch } = useSocials();
  const { auth } = useContext(CampContext);
  const { setIsLinkingVisible, currentlyLinking } = useContext(ModalContext);
  const [isUnlinking, setIsUnlinking] = useState(false);

  const handleLink = async () => {
    if (isSocialsLoading) return;
    if (socials[currentlyLinking]) {
      setIsUnlinking(true);
      try {
        await auth[`unlink${capitalize(currentlyLinking)}`]();
      } catch (error) {
        setIsUnlinking(false);
        setIsLinkingVisible(false);
        console.error(error);
        return;
      }
      refetch();
      setIsLinkingVisible(false);
      setIsUnlinking(false);
    } else {
      try {
        auth[`link${capitalize(currentlyLinking)}`]();
      } catch (error) {
        setIsLinkingVisible(false);
        console.error(error);
        return;
      }
    }
  };

  return (
    <div
      className={styles.modal}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsLinkingVisible(false);
        }
      }}
    >
      <div className={styles.container}>
        <div
          className={styles["close-button"]}
          onClick={() => setIsLinkingVisible(false)}
        >
          <CloseIcon />
        </div>
        {isSocialsLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "4rem",
              marginBottom: "1rem",
            }}
          >
            <div className={styles.spinner} />
          </div>
        ) : (
          <div>
            <div className={styles.header}>
              <div className={styles["small-modal-icon"]}>
                {currentlyLinking === "twitter" ? (
                  <TwitterIcon />
                ) : currentlyLinking === "discord" ? (
                  <DiscordIcon />
                ) : currentlyLinking === "spotify" ? (
                  <SpotifyIcon />
                ) : null}
              </div>
            </div>
            <div className={styles["linking-text"]}>
              {(currentlyLinking && socials[currentlyLinking]) ? (
                <div>
                  Your {capitalize(currentlyLinking)} account is currently
                  linked.
                </div>
              ) : (
                <div>
                  <b>{window.location.host}</b> is requesting to link your{" "}
                  {capitalize(currentlyLinking)} account.
                </div>
              )}
            </div>
            <button
              className={styles["linking-button"]}
              onClick={handleLink}
              disabled={isUnlinking}
            >
              {!isUnlinking ? (
                (currentlyLinking && socials[currentlyLinking]) ? (
                  "Unlink"
                ) : (
                  "Link"
                )
              ) : (
                <div className={styles.spinner} />
              )}
            </button>
          </div>
        )}
        <a
          href="https://campnetwork.xyz"
          className={styles["footer-text"]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 0 }}
        >
          Powered by Camp Network
        </a>
      </div>
    </div>
  );
};

/**
 * The MyCampModal component.
 * @param { { wcProvider: object } } props The props.
 * @returns { JSX.Element } The MyCampModal component.
 */
export const MyCampModal = ({ wcProvider }) => {
  const { auth } = useContext(CampContext);
  const { setIsVisible: setIsVisible } = useContext(ModalContext);
  const { disconnect } = useConnect();
  const { data: socials, loading, refetch } = useSocials();
  const [isLoadingSocials, setIsLoadingSocials] = useState(true);

  const handleDisconnect = () => {
    wcProvider?.disconnect();
    disconnect();
    setIsVisible(false);
  };

  useEffect(() => {
    if (socials) setIsLoadingSocials(false);
  }, [socials]);

  const connectedSocials = [
    {
      name: "Discord",
      link: auth.linkDiscord.bind(auth),
      unlink: auth.unlinkDiscord.bind(auth),
      isConnected: socials?.discord,
      icon: <DiscordIcon />,
    },
    {
      name: "Twitter",
      link: auth.linkTwitter.bind(auth),
      unlink: auth.unlinkTwitter.bind(auth),
      isConnected: socials?.twitter,
      icon: <TwitterIcon />,
    },
    {
      name: "Spotify",
      link: auth.linkSpotify.bind(auth),
      unlink: auth.unlinkSpotify.bind(auth),
      isConnected: socials?.spotify,
      icon: <SpotifyIcon />,
    },
  ];

  const connected = connectedSocials.filter((social) => social.isConnected);
  const notConnected = connectedSocials.filter((social) => !social.isConnected);

  return (
    <div className={styles.container}>
      <div
        className={styles["close-button"]}
        onClick={() => setIsVisible(false)}
      >
        <CloseIcon />
      </div>
      <div className={styles.header}>
        <span>My Camp</span>
        <span className={styles["wallet-address"]}>
          {formatAddress(auth.walletAddress)}
        </span>
      </div>
      <div className={styles["socials-wrapper"]}>
        {loading || isLoadingSocials ? (
          <div
            className={styles.spinner}
            style={{ margin: "auto", marginTop: "6rem", marginBottom: "6rem" }}
          />
        ) : (
          <>
            <div className={styles["socials-container"]}>
              <h3>Not Linked</h3>
              {notConnected.map((social) => (
                <ConnectorButton
                  key={social.name}
                  name={social.name}
                  link={social.link}
                  unlink={social.unlink}
                  isConnected={social.isConnected}
                  refetch={refetch}
                  icon={social.icon}
                />
              ))}
              {notConnected.length === 0 && (
                <span className={styles["no-socials"]}>
                  You've linked all your socials!
                </span>
              )}
            </div>
            <div className={styles["socials-container"]}>
              <h3>Linked</h3>
              {connected.map((social) => (
                <ConnectorButton
                  key={social.name}
                  name={social.name}
                  link={social.link}
                  unlink={social.unlink}
                  isConnected={social.isConnected}
                  refetch={refetch}
                  icon={social.icon}
                />
              ))}
              {connected.length === 0 && (
                <span className={styles["no-socials"]}>
                  You have no socials linked.
                </span>
              )}
            </div>
          </>
        )}
      </div>
      <button
        className={styles["disconnect-button"]}
        onClick={handleDisconnect}
      >
        Disconnect
      </button>
      <a
        href="https://campnetwork.xyz"
        className={styles["footer-text"]}
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: 0 }}
      >
        Powered by Camp Network
      </a>
    </div>
  );
};
