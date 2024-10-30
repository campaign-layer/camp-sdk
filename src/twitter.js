import { fetchData, buildURL, baseURL } from "./utils";
import { APIError } from "./errors";

class TwitterAPI {
  /**
   * Constructor for the TwitterAPI class.
   * @param {object} options - The options object.
   * @param {string} options.apiKey - The API key (needed for certain endpoints).
   * @param {string} options.clientId - The client ID.
   * @throws {APIError} - Throws an error if the client ID is missing.
   */
  constructor({ apiKey, clientId }) {
    if(!clientId) {
      throw new APIError("clientId is required");
    }
    this.apiKey = apiKey;
    this.clientId = clientId;
  }

  /**
   * Fetch Twitter user details by username.
   * @param {string} twitterUserName - The Twitter username.
   * @returns {Promise<object>} - The user details.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchUserByUsername(twitterUserName) {
    const url = buildURL(`${baseURL}/user`, { twitterUserName });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch tweets by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The tweets.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchTweetsByUsername(twitterUserName, page = 1, limit = 10) {
    const url = buildURL(`${baseURL}/tweets`, {
      twitterUserName,
      page,
      limit,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch followers by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The followers.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchFollowersByUsername(twitterUserName, page = 1, limit = 10) {
    const url = buildURL(`${baseURL}/followers`, {
      twitterUserName,
      page,
      limit,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch following by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The following.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchFollowingByUsername(twitterUserName, page = 1, limit = 10) {
    const url = buildURL(`${baseURL}/following`, {
      twitterUserName,
      page,
      limit,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch tweet by tweet ID.
   * @param {string} tweetId - The tweet ID.
   * @returns {Promise<object>} - The tweet.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchTweetById(tweetId) {
    const url = buildURL(`${baseURL}/gettweetbyid`, { tweetId });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch user by wallet address.
   * @param {string} walletAddress - The wallet address.
   * @returns {Promise<object>} - The user data.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchUserByWalletAddress(walletAddress) {
    const url = buildURL(`${baseURL}/wallet-twitter-data`, { walletAddress });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch reposted tweets by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The reposted tweets.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchRepostedByUsername(twitterUserName, page = 1, limit = 10) {
    const url = buildURL(`${baseURL}/reposted`, {
      twitterUserName,
      page,
      limit,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch replies by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The replies.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchRepliesByUsername(twitterUserName, page = 1, limit = 10) {
    const url = buildURL(`${baseURL}/replies`, {
      twitterUserName,
      page,
      limit,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch likes by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @returns {Promise<object>} - The likes.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchLikesByUsername(twitterUserName) {
    const url = buildURL(`${baseURL}/event/likes/${twitterUserName}`);
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch follows by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @returns {Promise<object>} - The follows.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchFollowsByUsername(twitterUserName) {
    const url = buildURL(`${baseURL}/event/follows/${twitterUserName}`);
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch viewed tweets by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @returns {Promise<object>} - The viewed tweets.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchViewedTweetsByUsername(twitterUserName) {
    const url = buildURL(`${baseURL}/event/viewed-tweets/${twitterUserName}`);
    return this._fetchDataWithAuth(url);
  }

  /**
   * Private method to fetch data with authorization header.
   * @param {string} url - The URL to fetch.
   * @returns {Promise<object>} - The response data.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async _fetchDataWithAuth(url) {
    try {
      return await fetchData(url, { "x-api-key": this.apiKey });
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }
}

// module.exports = TwitterAPI;

export { TwitterAPI };
