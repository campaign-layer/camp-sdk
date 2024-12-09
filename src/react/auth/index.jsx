import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { CampContext, CampProvider } from "../context/CampContext.jsx";
import { ModalContext } from "../context/ModalContext.jsx";
import { providerStore } from "../../auth/viem/providers.js";
import { CampModal, MyCampModal } from "./modals.jsx";
import { useQuery } from "@tanstack/react-query";
import { Auth } from "../../auth/index.js";

export { CampModal, MyCampModal };

export { CampContext, CampProvider, ModalContext };
/**
 * Returns the instance of the Auth class.
 * @returns { Auth } The instance of the Auth class.
 * @example
 */
const getAuthProperties = (auth) => {
  const prototype = Object.getPrototypeOf(auth);
  const properties = Object.getOwnPropertyNames(prototype);
  const object = {};

  for (const property of properties) {
    if (typeof auth[property] === "function") {
      object[property] = auth[property].bind(auth);
    }
  }

  return object;
};

const getAuthVariables = (auth) => {
  const variables = Object.keys(auth);
  const object = {};

  for (const variable of variables) {
    object[variable] = auth[variable];
  }

  return object;
};

export const useAuth = () => {
  const { auth } = useContext(CampContext);
  if (!auth) {
    return null;
  }

  const properties = getAuthProperties(auth);
  const variables = getAuthVariables(auth);

  return { ...variables, ...properties };
};

/**
 * Returns the functions to link and unlink socials.
 * @returns { { linkTwitter: function, unlinkTwitter: function, linkDiscord: function, unlinkDiscord: function, linkSpotify: function, unlinkSpotify: function } } The functions to link and unlink socials.
 * @example
 * const { linkTwitter, unlinkTwitter, linkDiscord, unlinkDiscord, linkSpotify, unlinkSpotify } = useLinkSocials();
 * linkTwitter();
 */
export const useLinkSocials = () => {
  const { auth } = useContext(CampContext);
  if (!auth) {
    return {};
  }
  const prototype = Object.getPrototypeOf(auth);
  const linkingProps = Object.getOwnPropertyNames(prototype).filter(
    (prop) => prop.startsWith("link") || prop.startsWith("unlink")
  );

  const linkingFunctions = linkingProps.reduce((acc, prop) => {
    acc[prop] = auth[prop].bind(auth);
    return acc;
  }, {});

  return linkingFunctions;
};

/**
 * Fetches the provider from the context and sets the provider in the auth instance.
 * @returns { { provider: { provider: string, info: { name: string } }, setProvider: function } } The provider and a function to set the provider.
 */
export const useProvider = () => {
  const { auth } = useContext(CampContext);
  const [provider, setProvider] = useState({
    provider: auth.viem?.transport,
    info: { name: auth.viem?.transport?.name },
  });
  useEffect(() => {
    auth.on("provider", ({ provider, info }) => {
      setProvider({ provider, info });
    });
  }, [auth]);

  const authSetProvider = auth.setProvider.bind(auth);

  return { provider, setProvider: authSetProvider };
};

/**
 * Returns the authenticated state and loading state.
 * @returns { { authenticated: boolean, loading: boolean } } The authenticated state and loading state.
 */
export const useAuthState = () => {
  const { auth } = useContext(CampContext);
  const [authenticated, setAuthenticated] = useState(auth.isAuthenticated);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    auth.on("state", (state) => {
      setAuthenticated(state === "authenticated");
      setLoading(state === "loading");
    });
  }, [auth]);
  return { authenticated, loading };
};

/**
 * Connects and disconnects the user.
 * @returns { { connect: function, disconnect: function } } The connect and disconnect functions.
 */
export const useConnect = () => {
  const { auth } = useContext(CampContext);
  const connect = auth.connect.bind(auth);
  const disconnect = auth.disconnect.bind(auth);
  return { connect, disconnect };
};

/**
 * Returns the array of providers.
 * @returns { Array } The array of providers and the loading state.
 */
export const useProviders = () =>
  useSyncExternalStore(
    providerStore.subscribe,
    providerStore.value,
    providerStore.value
  );

/**
 * Returns the modal state and functions to open and close the modal.
 * @returns { { isOpen: boolean, openModal: function, closeModal: function } } The modal state and functions to open and close the modal.
 */
export const useModal = () => {
  const { isVisible, setIsVisible } = useContext(ModalContext);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return {
    isOpen: isVisible,
    openModal: handleOpen,
    closeModal: handleClose,
  };
};

/**
 * Fetches the socials linked to the user.
 * @returns { { data: Array, error: Error, isLoading: boolean } } The socials linked to the user.
 */
export const useSocials = () => {
  const { auth } = useContext(CampContext);
  return useQuery({
    queryKey: ["socials", auth.isAuthenticated],
    queryFn: () => auth.getLinkedSocials(),
  });
};
