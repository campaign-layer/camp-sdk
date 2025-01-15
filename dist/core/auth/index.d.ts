declare global {
    interface Window {
        ethereum?: any;
    }
}
/**
 * The Auth class.
 * @class
 * @classdesc The Auth class is used to authenticate the user.
 */
declare class Auth {
    #private;
    redirectUri: Record<string, string>;
    clientId: string;
    isAuthenticated: boolean;
    jwt: string | null;
    walletAddress: string | null;
    userId: string | null;
    viem: any;
    /**
     * Constructor for the Auth class.
     * @param {object} options The options object.
     * @param {string} options.clientId The client ID.
     * @param {string|object} options.redirectUri The redirect URI used for oauth. Leave empty if you want to use the current URL. If you want different redirect URIs for different socials, pass an object with the socials as keys and the redirect URIs as values.
     * @throws {APIError} - Throws an error if the clientId is not provided.
     */
    constructor({ clientId, redirectUri, }: {
        clientId: string;
        redirectUri: string | Record<string, string>;
    });
    /**
     * Subscribe to an event. Possible events are "state", "provider", and "providers".
     * @param {("state"|"provider"|"providers")} event The event.
     * @param {function} callback The callback function.
     * @returns {void}
     * @example
     * auth.on("state", (state) => {
     *  console.log(state);
     * });
     */
    on(event: "state" | "provider" | "providers", callback: Function): void;
    /**
     * Set the loading state.
     * @param {boolean} loading The loading state.
     * @returns {void}
     */
    setLoading(loading: boolean): void;
    /**
     * Set the provider. This is useful for setting the provider when the user selects a provider from the UI or when dApp wishes to use a specific provider.
     * @param {object} options The options object. Includes the provider and the provider info.
     * @returns {void}
     * @throws {APIError} - Throws an error if the provider is not provided.
     */
    setProvider({ provider, info }: {
        provider: any;
        info: any;
    }): void;
    /**
     * Set the wallet address. This is useful for edge cases where the provider can't return the wallet address. Don't use this unless you know what you're doing.
     * @param {string} walletAddress The wallet address.
     * @returns {void}
     */
    setWalletAddress(walletAddress: string): void;
    /**
     * Disconnect the user.
     * @returns {void}
     */
    disconnect(): Promise<void>;
    /**
     * Connect the user's wallet and sign the message.
     * @returns {Promise<object>} A promise that resolves with the authentication result.
     * @throws {APIError} - Throws an error if the user cannot be authenticated.
     */
    connect(): Promise<{
        success: boolean;
        message: string;
        walletAddress: string;
    }>;
    /**
     * Get the user's linked social accounts.
     * @returns {Promise<object>} A promise that resolves with the user's linked social accounts.
     * @throws {APIError} - Throws an error if the user is not authenticated or if the request fails.
     * @example
     * const auth = new Auth({ clientId: "your-client-id" });
     * const socials = await auth.getLinkedSocials();
     * console.log(socials);
     */
    getLinkedSocials(): Promise<Record<string, any>>;
    /**
     * Link the user's Twitter account.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */
    linkTwitter(): void;
    /**
     * Link the user's Discord account.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */
    linkDiscord(): void;
    /**
     * Link the user's Spotify account.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */
    linkSpotify(): void;
    /**
     * Link the user's TikTok account.
     * @param {string} handle The user's TikTok handle.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */
    linkTikTok(handle: string): Promise<any>;
    /**
     * Send an OTP to the user's Telegram account.
     * @param {string} phoneNumber The user's phone number.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */
    sendTelegramOTP(phoneNumber: string): Promise<any>;
    /**
     * Link the user's Telegram account.
     * @param {string} phoneNumber The user's phone number.
     * @param {string} otp The OTP.
     * @param {string} phoneCodeHash The phone code hash.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated. Also throws an error if the phone number, OTP, and phone code hash are not provided.
     */
    linkTelegram(phoneNumber: string, otp: string, phoneCodeHash: string): Promise<any>;
    /**
     * Unlink the user's Twitter account.
     */
    unlinkTwitter(): Promise<any>;
    /**
     * Unlink the user's Discord account.
     */
    unlinkDiscord(): Promise<any>;
    /**
     * Unlink the user's Spotify account.
     */
    unlinkSpotify(): Promise<any>;
    unlinkTikTok(): Promise<any>;
    unlinkTelegram(): Promise<any>;
}
export { Auth };