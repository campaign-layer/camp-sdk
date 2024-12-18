import t from"axios";import{createWalletClient as e,custom as s}from"viem";import{createSiweMessage as i}from"viem/siwe";class r extends Error{constructor(t,e){super(t),this.name="APIError",this.statusCode=e,Error.captureStackTrace(this,this.constructor)}toJSON(){return{error:this.name,message:this.message,statusCode:this.statusCode||500}}}
// const axios = require("axios");
/**
 * Makes a GET request to the given URL with the provided headers.
 *
 * @param {string} url - The URL to send the GET request to.
 * @param {object} headers - The headers to include in the request.
 * @returns {Promise<object>} - The response data.
 * @throws {APIError} - Throws an error if the request fails.
 */async function a(e,s={}){try{return(await t.get(e,{headers:s})).data}catch(t){if(t.response)throw new r(t.response.data.message||"API request failed",t.response.status);throw new r("Network error or server is unavailable",500)}}
/**
 * Constructs a query string from an object of query parameters.
 *
 * @param {object} params - An object representing query parameters.
 * @returns {string} - The encoded query string.
 */
/**
 * Builds a complete URL with query parameters.
 *
 * @param {string} baseURL - The base URL of the endpoint.
 * @param {object} params - An object representing query parameters.
 * @returns {string} - The complete URL with query string.
 */
function n(t,e={}){const s=function(t={}){return Object.keys(t).map((e=>`${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`)).join("&")}(e);return s?`${t}?${s}`:t}const o="https://wv2h4to5qa.execute-api.us-east-2.amazonaws.com/dev/twitter",c="https://wv2h4to5qa.execute-api.us-east-2.amazonaws.com/dev/spotify";
/**
 * The TwitterAPI class.
 * @class
 * @classdesc The TwitterAPI class is used to interact with the Twitter API.
 */
class h{
/**
   * Constructor for the TwitterAPI class.
   * @param {object} options - The options object.
   * @param {string} options.apiKey - The API key. (Needed for data fetching)
   */
constructor({apiKey:t}){this.apiKey=t}
/**
   * Fetch Twitter user details by username.
   * @param {string} twitterUserName - The Twitter username.
   * @returns {Promise<object>} - The user details.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchUserByUsername(t){const e=n(`${o}/user`,{twitterUserName:t});return this._fetchDataWithAuth(e)}
/**
   * Fetch tweets by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The tweets.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchTweetsByUsername(t,e=1,s=10){const i=n(`${o}/tweets`,{twitterUserName:t,page:e,limit:s});return this._fetchDataWithAuth(i)}
/**
   * Fetch followers by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The followers.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchFollowersByUsername(t,e=1,s=10){const i=n(`${o}/followers`,{twitterUserName:t,page:e,limit:s});return this._fetchDataWithAuth(i)}
/**
   * Fetch following by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The following.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchFollowingByUsername(t,e=1,s=10){const i=n(`${o}/following`,{twitterUserName:t,page:e,limit:s});return this._fetchDataWithAuth(i)}
/**
   * Fetch tweet by tweet ID.
   * @param {string} tweetId - The tweet ID.
   * @returns {Promise<object>} - The tweet.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchTweetById(t){const e=n(`${o}/getTweetById`,{tweetId:t});return this._fetchDataWithAuth(e)}
/**
   * Fetch user by wallet address.
   * @param {string} walletAddress - The wallet address.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The user data.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchUserByWalletAddress(t,e=1,s=10){const i=n(`${o}/wallet-twitter-data`,{walletAddress:t,page:e,limit:s});return this._fetchDataWithAuth(i)}
/**
   * Fetch reposted tweets by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The reposted tweets.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchRepostedByUsername(t,e=1,s=10){const i=n(`${o}/reposted`,{twitterUserName:t,page:e,limit:s});return this._fetchDataWithAuth(i)}
/**
   * Fetch replies by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The replies.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchRepliesByUsername(t,e=1,s=10){const i=n(`${o}/replies`,{twitterUserName:t,page:e,limit:s});return this._fetchDataWithAuth(i)}
/**
   * Fetch likes by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The likes.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchLikesByUsername(t,e=1,s=10){const i=n(`${o}/event/likes/${t}`,{page:e,limit:s});return this._fetchDataWithAuth(i)}
/**
   * Fetch follows by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The follows.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchFollowsByUsername(t,e=1,s=10){const i=n(`${o}/event/follows/${t}`,{page:e,limit:s});return this._fetchDataWithAuth(i)}
/**
   * Fetch viewed tweets by Twitter username.
   * @param {string} twitterUserName - The Twitter username.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<object>} - The viewed tweets.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchViewedTweetsByUsername(t,e=1,s=10){const i=n(`${o}/event/viewed-tweets/${t}`,{page:e,limit:s});return this._fetchDataWithAuth(i)}
/**
   * Private method to fetch data with authorization header.
   * @param {string} url - The URL to fetch.
   * @returns {Promise<object>} - The response data.
   * @throws {APIError} - Throws an error if the request fails.
   */async _fetchDataWithAuth(t){if(!this.apiKey)throw new r("API key is required for fetching data",401);try{return await a(t,{"x-api-key":this.apiKey})}catch(t){throw new r(t.message,t.statusCode)}}}
/**
 * The SpotifyAPI class.
 * @class
 */class d{
/**
   * Constructor for the SpotifyAPI class.
   * @param {object} options - The options object.
   * @param {string} options.apiKey - The Camp API key.
   */
constructor({apiKey:t}){this.apiKey=t}
/**
   * Fetch the user's saved tracks by Spotify user ID.
   * @param {string} spotifyId - The user's Spotify ID.
   * @returns {Promise<object>} - The saved tracks.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchSavedTracksById(t){const e=n(`${c}/save-tracks`,{spotifyId:t});return this._fetchDataWithAuth(e)}
/**
   * Fetch the played tracks of a user by Spotify ID.
   * @param {string} spotifyId - The user's Spotify ID.
   * @returns {Promise<object>} - The played tracks.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchPlayedTracksById(t){const e=n(`${c}/played-tracks`,{spotifyId:t});return this._fetchDataWithAuth(e)}
/**
   * Fetch the user's saved albums by Spotify user ID.
   * @param {string} spotifyId - The user's Spotify ID.
   * @returns {Promise<object>} - The saved albums.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchSavedAlbumsById(t){const e=n(`${c}/saved-albums`,{spotifyId:t});return this._fetchDataWithAuth(e)}
/**
   * Fetch the user's saved playlists by Spotify user ID.
   * @param {string} spotifyId - The user's Spotify ID.
   * @returns {Promise<object>} - The saved playlists.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchSavedPlaylistsById(t){const e=n(`${c}/saved-playlists`,{spotifyId:t});return this._fetchDataWithAuth(e)}
/**
   * Fetch the tracks of an album by album ID.
   * @param {string} spotifyId - The Spotify ID of the user.
   * @param {string} albumId - The album ID.
   * @returns {Promise<object>} - The tracks in the album.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchTracksInAlbum(t,e){const s=n(`${c}/album/tracks`,{spotifyId:t,albumId:e});return this._fetchDataWithAuth(s)}
/**
   * Fetch the tracks in a playlist by playlist ID.
   * @param {string} spotifyId - The Spotify ID of the user.
   * @param {string} playlistId - The playlist ID.
   * @returns {Promise<object>} - The tracks in the playlist.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchTracksInPlaylist(t,e){const s=n(`${c}/playlist/tracks`,{spotifyId:t,playlistId:e});return this._fetchDataWithAuth(s)}
/**
   * Fetch the user's Spotify data by wallet address.
   * @param {string} walletAddress - The wallet address.
   * @returns {Promise<object>} - The user's Spotify data.
   * @throws {APIError} - Throws an error if the request fails.
   */async fetchUserByWalletAddress(t){const e=n(`${c}/wallet-spotify-data`,{walletAddress:t});return this._fetchDataWithAuth(e)}
/**
   * Private method to fetch data with authorization header.
   * @param {string} url - The URL to fetch.
   * @returns {Promise<object>} - The response data.
   * @throws {APIError} - Throws an error if the request fails.
   */async _fetchDataWithAuth(t){if(!this.apiKey)throw new r("API key is required for fetching data",401);try{return await a(t,{"x-api-key":this.apiKey})}catch(t){throw new r(t.message,t.statusCode)}}}const l={id:325e3,name:"Camp Network Testnet V2",nativeCurrency:{decimals:18,name:"Ether",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc-campnetwork.xyz"]}},blockExplorers:{default:{name:"Explorer",url:"https://camp-network-testnet.blockscout.com"}}};let u=null;const w=(t,i="window.ethereum")=>t||u?((!u||u.transport.name!==i&&t)&&(u=e({chain:l,transport:s(t,{name:i})})),u):(console.warn("Provider is required to create a client."),null);var f="Connect with Camp Network",y="https://wv2h4to5qa.execute-api.us-east-2.amazonaws.com/dev";let p=[];const m=()=>p,g=t=>{function e(e){p.some((t=>t.info.uuid===e.detail.info.uuid))||(p=[...p,e.detail],t(p))}if("undefined"!=typeof window)return window.addEventListener("eip6963:announceProvider",e),window.dispatchEvent(new Event("eip6963:requestProvider")),()=>window.removeEventListener("eip6963:announceProvider",e)};
/**
 * The Auth class.
 * @class
 * @classdesc The Auth class is used to authenticate the user.
 */
class A{
/**
   * Constructor for the Auth class.
   * @param {object} options The options object.
   * @param {string} options.clientId The client ID.
   * @param {string|object} options.redirectUri The redirect URI used for oauth. Leave empty if you want to use the current URL. If you want different redirect URIs for different socials, pass an object with the socials as keys and the redirect URIs as values.
   * @throws {APIError} - Throws an error if the clientId is not provided.
   */
#t;constructor({clientId:t,redirectUri:e}){if(!t)throw new Error("clientId is required");this.viem=null,"undefined"!=typeof window&&window.ethereum&&(this.viem=w(window.ethereum)),this.redirectUri=(t=>{const e=["twitter","discord","spotify"];return"object"==typeof t?e.reduce(((e,s)=>(e[s]=t[s]||("undefined"!=typeof window?window.location.href:""),e)),{}):"string"==typeof t?e.reduce(((e,s)=>(e[s]=t,e)),{}):t?void 0:e.reduce(((t,e)=>(t[e]="undefined"!=typeof window?window.location.href:"",t)),{})})(e),this.clientId=t,this.isAuthenticated=!1,this.jwt=null,this.walletAddress=null,this.userId=null,this.#t=[],g((t=>{this.#e("providers",t)})),this.#s()}
/**
   * Subscribe to an event. Possible events are "state", "provider", and "providers".
   * @param {("state"|"provider"|"providers")} event The event.
   * @param {function} callback The callback function.
   * @returns {void}
   * @example
   * auth.on("state", (state) => {
   *  console.log(state);
   * });
   */on(t,e){this.#t[t]||(this.#t[t]=[]),this.#t[t].push(e),"providers"===t&&e(m())}
/**
   * Trigger an event.
   * @private
   * @param {string} event The event.
   * @param {object} data The data.
   * @returns {void}
   */#e(t,e){this.#t[t]&&this.#t[t].forEach((t=>t(e)))}
/**
   * Set the loading state.
   * @param {boolean} loading The loading state.
   * @returns {void}
   */setLoading(t){this.#e("state",t?"loading":this.isAuthenticated?"authenticated":"unauthenticated")}
/**
   * Set the provider. This is useful for setting the provider when the user selects a provider from the UI or when dApp wishes to use a specific provider.
   * @param {object} options The options object. Includes the provider and the provider info.
   * @returns {void}
   * @throws {APIError} - Throws an error if the provider is not provided.
   */setProvider({provider:t,info:e}){if(!t)throw new r("provider is required");this.viem=w(t,e.name),this.#e("provider",{provider:t,info:e})}
/**
   * Set the wallet address. This is useful for edge cases where the provider can't return the wallet address. Don't use this unless you know what you're doing.
   * @param {string} walletAddress The wallet address.
   * @returns {void}
   */setWalletAddress(t){this.walletAddress=t}
/**
   * Load the authentication status from local storage.
   * @private
   * @returns {void}
   */#s(){if("undefined"==typeof localStorage)return;const t=localStorage?.getItem("camp-sdk:wallet-address"),e=localStorage?.getItem("camp-sdk:user-id"),s=localStorage?.getItem("camp-sdk:jwt");t&&e&&s?(this.walletAddress=t,this.userId=e,this.jwt=s,this.isAuthenticated=!0):this.isAuthenticated=!1}
/**
   * Request the user to connect their wallet.
   * @private
   * @returns {Promise<void>} A promise that resolves when the user connects their wallet.
   * @throws {APIError} - Throws an error if the user does not connect their wallet.
   */async#i(){try{const[t]=await this.viem.requestAddresses();return this.walletAddress=t,t}catch(t){throw new r(t)}}
/**
   * Fetch the nonce from the server.
   * @private
   * @returns {Promise<string>} A promise that resolves with the nonce.
   * @throws {APIError} - Throws an error if the nonce cannot be fetched.
   */async#r(){try{const t=await fetch(`${y}/auth/client-user/nonce`,{method:"POST",headers:{"Content-Type":"application/json","x-client-id":this.clientId},body:JSON.stringify({walletAddress:this.walletAddress})}),e=await t.json();return 200!==t.status?Promise.reject(e.message||"Failed to fetch nonce"):e.data}catch(t){throw new Error(t)}}
/**
   * Verify the signature.
   * @private
   * @param {string} message The message.
   * @param {string} signature The signature.
   * @returns {Promise<object>} A promise that resolves with the verification result.
   * @throws {APIError} - Throws an error if the signature cannot be verified.
   */async#a(t,e){try{const s=await fetch(`${y}/auth/client-user/verify`,{method:"POST",headers:{"Content-Type":"application/json","x-client-id":this.clientId},body:JSON.stringify({message:t,signature:e,walletAddress:this.walletAddress})}),i=await s.json(),r=i.data.split(".")[1],a=JSON.parse(atob(r));return{success:!i.isError,userId:a.id,token:i.data}}catch(t){throw new r(t)}}
/**
   * Create the SIWE message.
   * @private
   * @param {string} nonce The nonce.
   * @returns {string} The EIP-4361 formatted message.
   */#n(t){return i({domain:window.location.host,address:this.walletAddress,statement:f,uri:window.location.origin,version:"1",chainId:this.viem.chain.id,nonce:t})}
/**
   * Disconnect the user.
   * @returns {void}
   */async disconnect(){this.isAuthenticated=!1,this.walletAddress=null,this.userId=null,this.jwt=null,localStorage.removeItem("camp-sdk:wallet-address"),localStorage.removeItem("camp-sdk:user-id"),localStorage.removeItem("camp-sdk:jwt"),this.#e("state","unauthenticated")}
/**
   * Connect the user's wallet and sign the message.
   * @returns {Promise<object>} A promise that resolves with the authentication result.
   * @throws {APIError} - Throws an error if the user cannot be authenticated.
   */async connect(){this.#e("state","loading");try{this.walletAddress||await this.#i();const t=await this.#r(),e=this.#n(t),s=await this.viem.signMessage({account:this.walletAddress,message:e}),i=await this.#a(e,s,t);if(i.success)return this.isAuthenticated=!0,this.userId=i.userId,this.jwt=i.token,localStorage.setItem("camp-sdk:jwt",this.jwt),localStorage.setItem("camp-sdk:wallet-address",this.walletAddress),localStorage.setItem("camp-sdk:user-id",this.userId),this.#e("state","authenticated"),{success:!0,message:"Successfully authenticated",walletAddress:this.walletAddress};throw this.isAuthenticated=!1,this.#e("state","unauthenticated"),new r("Failed to authenticate")}catch(t){throw this.isAuthenticated=!1,this.#e("state","unauthenticated"),new r(t)}}
/**
   * Get the user's linked social accounts.
   * @returns {Promise<object>} A promise that resolves with the user's linked social accounts.
   * @throws {APIError} - Throws an error if the user is not authenticated or if the request fails.
   * @example
   * const auth = new Auth({ clientId: "your-client-id" });
   * const socials = await auth.getLinkedSocials();
   * console.log(socials);
   */async getLinkedSocials(){if(!this.isAuthenticated)throw new r("User needs to be authenticated");const t=await fetch(`${y}/auth/client-user/connections-sdk`,{method:"GET",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"}}).then((t=>t.json()));if(t.isError)throw new r(t.message||"Failed to fetch connections");{const e={};return Object.keys(t.data.data).forEach((s=>{e[s.split("User")[0]]=t.data.data[s]})),e}}
/**
   * Link the user's Twitter account.
   * @returns {void}
   * @throws {APIError} - Throws an error if the user is not authenticated.
   */linkTwitter(){if(!this.isAuthenticated)throw new r("User needs to be authenticated");window.location.href=`${y}/twitter/connect?clientId=${this.clientId}&userId=${this.userId}&redirect_url=${this.redirectUri.twitter}`}
/**
   * Link the user's Discord account.
   * @returns {void}
   * @throws {APIError} - Throws an error if the user is not authenticated.
   */linkDiscord(){if(!this.isAuthenticated)throw new r("User needs to be authenticated");window.location.href=`${y}/discord/connect?clientId=${this.clientId}&userId=${this.userId}&redirect_url=${this.redirectUri.discord}`}
/**
   * Link the user's Spotify account.
   * @returns {void}
   * @throws {APIError} - Throws an error if the user is not authenticated.
   */linkSpotify(){if(!this.isAuthenticated)throw new r("User needs to be authenticated");window.location.href=`${y}/spotify/connect?clientId=${this.clientId}&userId=${this.userId}&redirect_url=${this.redirectUri.spotify}`}async linkTikTok(t){if(!this.isAuthenticated)throw new r("User needs to be authenticated");const e=await fetch(`${y}/tiktok/connect`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({userHandle:t,clientId:this.clientId,userId:this.userId})}).then((t=>t.json()));if(e.isError)throw new r(e.message||"Failed to link TikTok account");return e.data}
/**
   * Unlink the user's Twitter account.
   */async unlinkTwitter(){if(!this.isAuthenticated)throw new r("User needs to be authenticated");const t=await fetch(`${y}/twitter/disconnect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({id:this.userId})}).then((t=>t.json()));if(t.isError)throw new r(t.message||"Failed to unlink Twitter account");return t.data}
/**
   * Unlink the user's Discord account.
   */async unlinkDiscord(){if(!this.isAuthenticated)throw new r("User needs to be authenticated");const t=await fetch(`${y}/discord/disconnect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({id:this.userId})}).then((t=>t.json()));if(t.isError)throw new r(t.message||"Failed to unlink Discord account");return t.data}
/**
   * Unlink the user's Spotify account.
   */async unlinkSpotify(){if(!this.isAuthenticated)throw new r("User needs to be authenticated");const t=await fetch(`${y}/spotify/disconnect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({id:this.userId})}).then((t=>t.json()));if(t.isError)throw new r(t.message||"Failed to unlink Spotify account");return t.data}async unlinkTikTok(){if(!this.isAuthenticated)throw new r("User needs to be authenticated");const t=await fetch(`${y}/tiktok/disconnect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({userId:this.userId})}).then((t=>t.json()));if(t.isError)throw new r(t.message||"Failed to unlink TikTok account");return t.data}}export{A as Auth,d as SpotifyAPI,h as TwitterAPI};
