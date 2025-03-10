import { fetchData, buildURL, baseSpotifyURL as baseURL } from "../utils";
import { APIError } from "../errors";

interface SpotifyAPIOptions {
  apiKey: string;
}

/**
 * The SpotifyAPI class.
 * @class
 */
class SpotifyAPI {
  apiKey: string;

  /**
   * Constructor for the SpotifyAPI class.
   * @constructor
   * @param {SpotifyAPIOptions} options - The Spotify API options.
   * @param {string} options.apiKey - The Spotify API key.
   * @throws {Error} - Throws an error if the API key is not provided.
   */
  constructor(options: SpotifyAPIOptions) {
    this.apiKey = options.apiKey;
  }

  /**
   * Fetch the user's saved tracks by Spotify user ID.
   * @param {string} spotifyId - The user's Spotify ID.
   * @returns {Promise<object>} - The saved tracks.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchSavedTracksById(spotifyId: string): Promise<object> {
    const url = buildURL(`${baseURL}/save-tracks`, {
      spotifyId,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch the played tracks of a user by Spotify ID.
   * @param {string} spotifyId - The user's Spotify ID.
   * @returns {Promise<object>} - The played tracks.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchPlayedTracksById(spotifyId: string): Promise<object> {
    const url = buildURL(`${baseURL}/played-tracks`, {
      spotifyId,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch the user's saved albums by Spotify user ID.
   * @param {string} spotifyId - The user's Spotify ID.
   * @returns {Promise<object>} - The saved albums.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchSavedAlbumsById(spotifyId: string): Promise<object> {
    const url = buildURL(`${baseURL}/saved-albums`, {
      spotifyId,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch the user's saved playlists by Spotify user ID.
   * @param {string} spotifyId - The user's Spotify ID.
   * @returns {Promise<object>} - The saved playlists.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchSavedPlaylistsById(spotifyId: string): Promise<object> {
    const url = buildURL(`${baseURL}/saved-playlists`, {
      spotifyId,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch the tracks of an album by album ID.
   * @param {string} spotifyId - The Spotify ID of the user.
   * @param {string} albumId - The album ID.
   * @returns {Promise<object>} - The tracks in the album.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchTracksInAlbum(
    spotifyId: string,
    albumId: string
  ): Promise<object> {
    const url = buildURL(`${baseURL}/album/tracks`, {
      spotifyId,
      albumId,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch the tracks in a playlist by playlist ID.
   * @param {string} spotifyId - The Spotify ID of the user.
   * @param {string} playlistId - The playlist ID.
   * @returns {Promise<object>} - The tracks in the playlist.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchTracksInPlaylist(
    spotifyId: string,
    playlistId: string
  ): Promise<object> {
    const url = buildURL(`${baseURL}/playlist/tracks`, {
      spotifyId,
      playlistId,
    });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Fetch the user's Spotify data by wallet address.
   * @param {string} walletAddress - The wallet address.
   * @returns {Promise<object>} - The user's Spotify data.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async fetchUserByWalletAddress(walletAddress: string): Promise<object> {
    const url = buildURL(`${baseURL}/wallet-spotify-data`, { walletAddress });
    return this._fetchDataWithAuth(url);
  }

  /**
   * Private method to fetch data with authorization header.
   * @param {string} url - The URL to fetch.
   * @returns {Promise<object>} - The response data.
   * @throws {APIError} - Throws an error if the request fails.
   */
  async _fetchDataWithAuth(url: string): Promise<object> {
    if (!this.apiKey) {
      throw new APIError("API key is required for fetching data", 401);
    }
    try {
      return await fetchData(url, { "x-api-key": this.apiKey });
    } catch (error: any) {
      throw new APIError(error.message, error.statusCode);
    }
  }
}

export { SpotifyAPI };
