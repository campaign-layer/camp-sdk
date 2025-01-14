import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { CampContext, CampProvider } from "../context/CampContext.jsx";
import { ModalContext } from "../context/ModalContext.jsx";
import { providerStore } from "../../core/auth/viem/providers.js";
import { CampModal, MyCampModal } from "./modals.jsx";
import { Auth } from "../../core/auth/index.js";
import { SocialsContext } from "../context/SocialsContext.jsx";
import { LinkButton } from "./buttons.jsx";
import constants from "../../constants.js";

export { CampModal, MyCampModal };
export { LinkButton };
export { CampContext, CampProvider, ModalContext };

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

/**
 * Returns the Auth instance provided by the context.
 * @returns { Auth } The Auth instance provided by the context.
 * @example
 * const auth = useAuth();
 * auth.connect();
 */
export const useAuth = () => {
  const { auth } = useContext(CampContext);

  const [authProperties, setAuthProperties] = useState(getAuthProperties(auth));
  const [authVariables, setAuthVariables] = useState(getAuthVariables(auth));

  const updateAuth = () => {
    setAuthVariables(getAuthVariables(auth));
    setAuthProperties(getAuthProperties(auth));
  };

  useEffect(() => {
    auth.on("state", updateAuth);
    auth.on("provider", updateAuth);
  }, [auth]);

  return { ...authVariables, ...authProperties };
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
    (prop) =>
      (prop.startsWith("link") || prop.startsWith("unlink")) &&
      (constants.AVAILABLE_SOCIALS.includes(prop.slice(4).toLowerCase()) ||
        constants.AVAILABLE_SOCIALS.includes(prop.slice(6).toLowerCase()))
  );

  const linkingFunctions = linkingProps.reduce(
    (acc, prop) => {
      acc[prop] = auth[prop].bind(auth);
      return acc;
    },
    {
      sendTelegramOTP: auth.sendTelegramOTP.bind(auth),
    }
  );

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

export const useLinkModal = () => {
  const { data: socials } = useSocials();
  const { isLinkingVisible, setIsLinkingVisible, setCurrentlyLinking } =
    useContext(ModalContext);

  const handleOpen = (social) => {
    if (!socials) {
      console.error("User is not authenticated");
      return;
    }
    setCurrentlyLinking(social);
    setIsLinkingVisible(true);
  };

  const handleLink = (social) => {
    if (!socials) {
      console.error("User is not authenticated");
      return;
    }
    if (socials && !socials[social]) {
      setCurrentlyLinking(social);
      setIsLinkingVisible(true);
    } else {
      setIsLinkingVisible(false);
      console.warn(`User already linked ${social}`);
    }
  };

  const handleUnlink = (social) => {
    if (!socials) {
      console.error("User is not authenticated");
      return;
    }
    if (socials && socials[social]) {
      setCurrentlyLinking(social);
      setIsLinkingVisible(true);
    } else {
      setIsLinkingVisible(false);
      console.warn(`User isn't linked to ${social}`);
    }
  };

  const handleClose = () => {
    setIsLinkingVisible(false);
  };

  const obj = {};
  constants.AVAILABLE_SOCIALS.forEach((social) => {
    obj[`link${social.charAt(0).toUpperCase() + social.slice(1)}`] = () =>
      handleLink(social);
    obj[`unlink${social.charAt(0).toUpperCase() + social.slice(1)}`] = () =>
      handleUnlink(social);
    obj[`open${social.charAt(0).toUpperCase() + social.slice(1)}Modal`] = () =>
      handleOpen(social);
  });

  return {
    isLinkingOpen: isLinkingVisible,
    ...obj,
    closeModal: handleClose,
    handleOpen,
  };
};

/**
 * Fetches the socials linked to the user.
 * @returns { { data: Array, socials: Array, error: Error, isLoading: boolean, refetch: () => {} } } react-query query object.
 */
export const useSocials = () => {
  const { query } = useContext(SocialsContext);
  const socials = query?.data;
  return {
    ...query,
    socials,
  };
};
