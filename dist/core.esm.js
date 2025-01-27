import t from"axios";import{createWalletClient as e,custom as i}from"viem";import{createSiweMessage as n}from"viem/siwe";
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */function r(t,e,i,n){return new(i||(i=Promise))((function(r,s){function o(t){try{d(n.next(t))}catch(t){s(t)}}function a(t){try{d(n.throw(t))}catch(t){s(t)}}function d(t){var e;t.done?r(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}d((n=n.apply(t,e||[])).next())}))}function s(t,e,i,n){if("a"===i&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?n:"a"===i?n.call(t):n?n.value:e.get(t)}function o(t,e,i,n,r){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?r.call(t,i):r?r.value=i:e.set(t,i),i}"function"==typeof SuppressedError&&SuppressedError;class a extends Error{constructor(t,e){super(t),this.name="APIError",this.statusCode=e||500,Error.captureStackTrace(this,this.constructor)}toJSON(){return{error:this.name,message:this.message,statusCode:this.statusCode||500}}}
/**
 * Makes a GET request to the given URL with the provided headers.
 *
 * @param {string} url - The URL to send the GET request to.
 * @param {object} headers - The headers to include in the request.
 * @returns {Promise<object>} - The response data.
 * @throws {APIError} - Throws an error if the request fails.
 */function d(e){return r(this,arguments,void 0,(function*(e,i={}){try{return(yield t.get(e,{headers:i})).data}catch(t){if(t.response)throw new a(t.response.data.message||"API request failed",t.response.status);throw new a("Network error or server is unavailable",500)}}))}
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
function c(t,e={}){const i=function(t={}){return Object.keys(t).map((e=>`${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`)).join("&")}(e);return i?`${t}?${i}`:t}const h="https://wv2h4to5qa.execute-api.us-east-2.amazonaws.com/dev/twitter",u="https://wv2h4to5qa.execute-api.us-east-2.amazonaws.com/dev/spotify";
/**
 * The TwitterAPI class.
 * @class
 * @classdesc The TwitterAPI class is used to interact with the Twitter API.
 */
class l{
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
     */fetchUserByUsername(t){return r(this,void 0,void 0,(function*(){const e=c(`${h}/user`,{twitterUserName:t});return this._fetchDataWithAuth(e)}))}
/**
     * Fetch tweets by Twitter username.
     * @param {string} twitterUserName - The Twitter username.
     * @param {number} page - The page number.
     * @param {number} limit - The number of items per page.
     * @returns {Promise<object>} - The tweets.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchTweetsByUsername(t){return r(this,arguments,void 0,(function*(t,e=1,i=10){const n=c(`${h}/tweets`,{twitterUserName:t,page:e,limit:i});return this._fetchDataWithAuth(n)}))}
/**
     * Fetch followers by Twitter username.
     * @param {string} twitterUserName - The Twitter username.
     * @param {number} page - The page number.
     * @param {number} limit - The number of items per page.
     * @returns {Promise<object>} - The followers.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchFollowersByUsername(t){return r(this,arguments,void 0,(function*(t,e=1,i=10){const n=c(`${h}/followers`,{twitterUserName:t,page:e,limit:i});return this._fetchDataWithAuth(n)}))}
/**
     * Fetch following by Twitter username.
     * @param {string} twitterUserName - The Twitter username.
     * @param {number} page - The page number.
     * @param {number} limit - The number of items per page.
     * @returns {Promise<object>} - The following.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchFollowingByUsername(t){return r(this,arguments,void 0,(function*(t,e=1,i=10){const n=c(`${h}/following`,{twitterUserName:t,page:e,limit:i});return this._fetchDataWithAuth(n)}))}
/**
     * Fetch tweet by tweet ID.
     * @param {string} tweetId - The tweet ID.
     * @returns {Promise<object>} - The tweet.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchTweetById(t){return r(this,void 0,void 0,(function*(){const e=c(`${h}/getTweetById`,{tweetId:t});return this._fetchDataWithAuth(e)}))}
/**
     * Fetch user by wallet address.
     * @param {string} walletAddress - The wallet address.
     * @param {number} page - The page number.
     * @param {number} limit - The number of items per page.
     * @returns {Promise<object>} - The user data.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchUserByWalletAddress(t){return r(this,arguments,void 0,(function*(t,e=1,i=10){const n=c(`${h}/wallet-twitter-data`,{walletAddress:t,page:e,limit:i});return this._fetchDataWithAuth(n)}))}
/**
     * Fetch reposted tweets by Twitter username.
     * @param {string} twitterUserName - The Twitter username.
     * @param {number} page - The page number.
     * @param {number} limit - The number of items per page.
     * @returns {Promise<object>} - The reposted tweets.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchRepostedByUsername(t){return r(this,arguments,void 0,(function*(t,e=1,i=10){const n=c(`${h}/reposted`,{twitterUserName:t,page:e,limit:i});return this._fetchDataWithAuth(n)}))}
/**
     * Fetch replies by Twitter username.
     * @param {string} twitterUserName - The Twitter username.
     * @param {number} page - The page number.
     * @param {number} limit - The number of items per page.
     * @returns {Promise<object>} - The replies.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchRepliesByUsername(t){return r(this,arguments,void 0,(function*(t,e=1,i=10){const n=c(`${h}/replies`,{twitterUserName:t,page:e,limit:i});return this._fetchDataWithAuth(n)}))}
/**
     * Fetch likes by Twitter username.
     * @param {string} twitterUserName - The Twitter username.
     * @param {number} page - The page number.
     * @param {number} limit - The number of items per page.
     * @returns {Promise<object>} - The likes.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchLikesByUsername(t){return r(this,arguments,void 0,(function*(t,e=1,i=10){const n=c(`${h}/event/likes/${t}`,{page:e,limit:i});return this._fetchDataWithAuth(n)}))}
/**
     * Fetch follows by Twitter username.
     * @param {string} twitterUserName - The Twitter username.
     * @param {number} page - The page number.
     * @param {number} limit - The number of items per page.
     * @returns {Promise<object>} - The follows.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchFollowsByUsername(t){return r(this,arguments,void 0,(function*(t,e=1,i=10){const n=c(`${h}/event/follows/${t}`,{page:e,limit:i});return this._fetchDataWithAuth(n)}))}
/**
     * Fetch viewed tweets by Twitter username.
     * @param {string} twitterUserName - The Twitter username.
     * @param {number} page - The page number.
     * @param {number} limit - The number of items per page.
     * @returns {Promise<object>} - The viewed tweets.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchViewedTweetsByUsername(t){return r(this,arguments,void 0,(function*(t,e=1,i=10){const n=c(`${h}/event/viewed-tweets/${t}`,{page:e,limit:i});return this._fetchDataWithAuth(n)}))}
/**
     * Private method to fetch data with authorization header.
     * @param {string} url - The URL to fetch.
     * @returns {Promise<object>} - The response data.
     * @throws {APIError} - Throws an error if the request fails.
     */_fetchDataWithAuth(t){return r(this,void 0,void 0,(function*(){if(!this.apiKey)throw new a("API key is required for fetching data",401);try{return yield d(t,{"x-api-key":this.apiKey})}catch(t){throw new a(t.message,t.statusCode)}}))}}
/**
 * The SpotifyAPI class.
 * @class
 */class f{
/**
     * Constructor for the SpotifyAPI class.
     * @constructor
     * @param {SpotifyAPIOptions} options - The Spotify API options.
     * @param {string} options.apiKey - The Spotify API key.
     * @throws {Error} - Throws an error if the API key is not provided.
     */
constructor(t){this.apiKey=t.apiKey}
/**
     * Fetch the user's saved tracks by Spotify user ID.
     * @param {string} spotifyId - The user's Spotify ID.
     * @returns {Promise<object>} - The saved tracks.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchSavedTracksById(t){return r(this,void 0,void 0,(function*(){const e=c(`${u}/save-tracks`,{spotifyId:t});return this._fetchDataWithAuth(e)}))}
/**
     * Fetch the played tracks of a user by Spotify ID.
     * @param {string} spotifyId - The user's Spotify ID.
     * @returns {Promise<object>} - The played tracks.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchPlayedTracksById(t){return r(this,void 0,void 0,(function*(){const e=c(`${u}/played-tracks`,{spotifyId:t});return this._fetchDataWithAuth(e)}))}
/**
     * Fetch the user's saved albums by Spotify user ID.
     * @param {string} spotifyId - The user's Spotify ID.
     * @returns {Promise<object>} - The saved albums.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchSavedAlbumsById(t){return r(this,void 0,void 0,(function*(){const e=c(`${u}/saved-albums`,{spotifyId:t});return this._fetchDataWithAuth(e)}))}
/**
     * Fetch the user's saved playlists by Spotify user ID.
     * @param {string} spotifyId - The user's Spotify ID.
     * @returns {Promise<object>} - The saved playlists.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchSavedPlaylistsById(t){return r(this,void 0,void 0,(function*(){const e=c(`${u}/saved-playlists`,{spotifyId:t});return this._fetchDataWithAuth(e)}))}
/**
     * Fetch the tracks of an album by album ID.
     * @param {string} spotifyId - The Spotify ID of the user.
     * @param {string} albumId - The album ID.
     * @returns {Promise<object>} - The tracks in the album.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchTracksInAlbum(t,e){return r(this,void 0,void 0,(function*(){const i=c(`${u}/album/tracks`,{spotifyId:t,albumId:e});return this._fetchDataWithAuth(i)}))}
/**
     * Fetch the tracks in a playlist by playlist ID.
     * @param {string} spotifyId - The Spotify ID of the user.
     * @param {string} playlistId - The playlist ID.
     * @returns {Promise<object>} - The tracks in the playlist.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchTracksInPlaylist(t,e){return r(this,void 0,void 0,(function*(){const i=c(`${u}/playlist/tracks`,{spotifyId:t,playlistId:e});return this._fetchDataWithAuth(i)}))}
/**
     * Fetch the user's Spotify data by wallet address.
     * @param {string} walletAddress - The wallet address.
     * @returns {Promise<object>} - The user's Spotify data.
     * @throws {APIError} - Throws an error if the request fails.
     */fetchUserByWalletAddress(t){return r(this,void 0,void 0,(function*(){const e=c(`${u}/wallet-spotify-data`,{walletAddress:t});return this._fetchDataWithAuth(e)}))}
/**
     * Private method to fetch data with authorization header.
     * @param {string} url - The URL to fetch.
     * @returns {Promise<object>} - The response data.
     * @throws {APIError} - Throws an error if the request fails.
     */_fetchDataWithAuth(t){return r(this,void 0,void 0,(function*(){if(!this.apiKey)throw new a("API key is required for fetching data",401);try{return yield d(t,{"x-api-key":this.apiKey})}catch(t){throw new a(t.message,t.statusCode)}}))}}const w={id:325e3,name:"Camp Network Testnet V2",nativeCurrency:{decimals:18,name:"Ether",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc-campnetwork.xyz"]}},blockExplorers:{default:{name:"Explorer",url:"https://camp-network-testnet.blockscout.com"}}};
// @ts-ignore
let p=null;const m=(t,n="window.ethereum")=>t||p?((!p||p.transport.name!==n&&t)&&(p=e({chain:w,transport:i(t,{name:n})})),p):(console.warn("Provider is required to create a client."),null);var y="Connect with Camp Network",v="https://wv2h4to5qa.execute-api.us-east-2.amazonaws.com/dev",I="https://ackee-production-01bd.up.railway.app",g={USER_CONNECTED:"ed42542d-b676-4112-b6d9-6db98048b2e0",USER_DISCONNECTED:"20af31ac-e602-442e-9e0e-b589f4dd4016",TWITTER_LINKED:"7fbea086-90ef-4679-ba69-f47f9255b34c",DISCORD_LINKED:"d73f5ae3-a8e8-48f2-8532-85e0c7780d6a",SPOTIFY_LINKED:"fc1788b4-c984-42c8-96f4-c87f6bb0b8f7",TIKTOK_LINKED:"4a2ffdd3-f0e9-4784-8b49-ff76ec1c0a6a",TELEGRAM_LINKED:"9006bc5d-bcc9-4d01-a860-4f1a201e8e47"};let k=[];const A=()=>k,T=t=>{function e(e){k.some((t=>t.info.uuid===e.detail.info.uuid))||(k=[...k,e.detail],t(k))}if("undefined"!=typeof window)return window.addEventListener("eip6963:announceProvider",e),window.dispatchEvent(new Event("eip6963:requestProvider")),()=>window.removeEventListener("eip6963:announceProvider",e)},b="undefined"!=typeof window,$=function(t){return"88888888-8888-8888-8888-888888888888"===t},S=function(){return"hidden"===document.visibilityState},E=function(){const t=(location.search.split("source=")[1]||"").split("&")[0];return""===t?void 0:t},D=function(t){return{query:"\n\t\t\tmutation updateRecord($recordId: ID!) {\n\t\t\t\tupdateRecord(id: $recordId) {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t}\n\t\t",variables:{recordId:t}}},j=function(t,e,i,n){const r=new XMLHttpRequest;r.open("POST",t),r.onload=()=>{if(200!==r.status)throw new Error("Server returned with an unhandled status");let t=null;try{t=JSON.parse(r.responseText)}catch(t){throw new Error("Failed to parse response from server")}if(null!=t.errors)throw new Error(t.errors[0].message);if("function"==typeof n)return n(t)},r.setRequestHeader("Content-Type","application/json;charset=UTF-8"),
//   xhr.withCredentials = opts.ignoreOwnVisits ?? false;
r.withCredentials=!1,r.send(JSON.stringify(e))},O=function(t,e){e=function(t={}){
// Create new object to avoid changes by reference
const e={};
// Defaults to false
return e.detailed=!0===t.detailed,
// Defaults to true
e.ignoreLocalhost=!1!==t.ignoreLocalhost,
// Defaults to true
e.ignoreOwnVisits=!1!==t.ignoreOwnVisits,e}(e);const i=function(t){const e="/"===t.substr(-1);return t+(!0===e?"":"/")+"api"}(t),n=()=>{},r={record:()=>({stop:n}),updateRecord:()=>({stop:n}),action:n,updateAction:n};if(!0===e.ignoreLocalhost&&!0==(""===(s=location.hostname)||"localhost"===s||"127.0.0.1"===s||"::1"===s))return console.warn("Ackee ignores you because you are on localhost"),r;var s,o;if(!0===(o=navigator.userAgent,/bot|crawler|spider|crawling/i.test(o)))return console.warn("Ackee ignores you because you are a bot"),r;
// Creates a new record on the server and updates the record
// very x seconds to track the duration of the visit. Tries to use
// the default attributes when there're no custom attributes defined.
// Return the real instance
return{record:(t,n=function(t=!1){const e={siteLocation:window.location.href,siteReferrer:document.referrer,source:E()},i={siteLanguage:(navigator.language||navigator.language).substr(0,2),screenWidth:screen.width,screenHeight:screen.height,screenColorDepth:screen.colorDepth,browserWidth:window.outerWidth,browserHeight:window.outerHeight};return Object.assign(Object.assign({},e),!0===t?i:{})}(e.detailed),r)=>{
// Function to stop updating the record
let s=!1;return j(i,function(t,e){return{query:"\n\t\t\tmutation createRecord($domainId: ID!, $input: CreateRecordInput!) {\n\t\t\t\tcreateRecord(domainId: $domainId, input: $input) {\n\t\t\t\t\tpayload {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t",variables:{domainId:t,input:e}}}(t,n),0,(t=>{const e=t.data.createRecord.payload.id;if(!0===$(e))return console.warn("Ackee ignores you because this is your own site");const n=setInterval((()=>{!0!==s?!0!==S()&&j(i,D(e)):clearInterval(n)}),15e3);return"function"==typeof r?r(e):void 0})),{stop:()=>{s=!0}}},updateRecord:t=>{
// Function to stop updating the record
let e=!1;const n=()=>{e=!0};if(!0===$(t))return console.warn("Ackee ignores you because this is your own site"),{stop:n};const r=setInterval((()=>{!0!==e?!0!==S()&&j(i,D(t)):clearInterval(r)}),15e3);return{stop:n}},action:(t,e,n)=>{j(i,function(t,e){return{query:"\n\t\t\tmutation createAction($eventId: ID!, $input: CreateActionInput!) {\n\t\t\t\tcreateAction(eventId: $eventId, input: $input) {\n\t\t\t\t\tpayload {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t",variables:{eventId:t,input:e}}}(t,e),0,(t=>{const e=t.data.createAction.payload.id;return!0===$(e)?console.warn("Ackee ignores you because this is your own site"):"function"==typeof n?n(e):void 0}))},updateAction:(t,e)=>{if(!0===$(t))return console.warn("Ackee ignores you because this is your own site");j(i,function(t,e){return{query:"\n\t\t\tmutation updateAction($actionId: ID!, $input: UpdateActionInput!) {\n\t\t\t\tupdateAction(id: $actionId, input: $input) {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t}\n\t\t",variables:{actionId:t,input:e}}}(t,e))}}};
/**
The MIT License (MIT)

Copyright (c) Tobias Reich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/var U,N,C,_,P,W,L,B,R,x;
// Only run Ackee automatically when executed in a browser environment
!0===b&&function(){const t=document.querySelector("[data-ackee-domain-id]");if(null==t)return;const e=t.getAttribute("data-ackee-server")||"",i=t.getAttribute("data-ackee-domain-id")||"",n=t.getAttribute("data-ackee-opts")||"{}";O(e,JSON.parse(n)).record(i)}();
/**
 * The Auth class.
 * @class
 * @classdesc The Auth class is used to authenticate the user.
 */
class K{
/**
     * Constructor for the Auth class.
     * @param {object} options The options object.
     * @param {string} options.clientId The client ID.
     * @param {string|object} options.redirectUri The redirect URI used for oauth. Leave empty if you want to use the current URL. If you want different redirect URIs for different socials, pass an object with the socials as keys and the redirect URIs as values.
     * @throws {APIError} - Throws an error if the clientId is not provided.
     */
constructor({clientId:t,redirectUri:e,allowAnalytics:i=!0,ackeeInstance:n}){if(U.add(this),N.set(this,void 0),C.set(this,void 0),!t)throw new Error("clientId is required");this.viem=null,"undefined"!=typeof window&&window.ethereum&&(this.viem=m(window.ethereum)),this.redirectUri=(t=>{const e=["twitter","discord","spotify"];return"object"==typeof t?e.reduce(((e,i)=>(e[i]=t[i]||("undefined"!=typeof window?window.location.href:""),e)),{}):"string"==typeof t?e.reduce(((e,i)=>(e[i]=t,e)),{}):t?{}:e.reduce(((t,e)=>(t[e]="undefined"!=typeof window?window.location.href:"",t)),{})})(e),n&&o(this,C,n,"f"),i&&!s(this,C,"f")&&o(this,C,O(I,{detailed:!1,ignoreLocalhost:!1,ignoreOwnVisits:!1}),"f"),this.clientId=t,this.isAuthenticated=!1,this.jwt=null,this.walletAddress=null,this.userId=null,o(this,N,{},"f"),T((t=>{s(this,U,"m",_).call(this,"providers",t)})),s(this,U,"m",P).call(this)}
/**
     * Subscribe to an event. Possible events are "state", "provider", and "providers".
     * @param {("state"|"provider"|"providers")} event The event.
     * @param {function} callback The callback function.
     * @returns {void}
     * @example
     * auth.on("state", (state) => {
     *  console.log(state);
     * });
     */on(t,e){s(this,N,"f")[t]||(s(this,N,"f")[t]=[]),s(this,N,"f")[t].push(e),"providers"===t&&e(A())}
/**
     * Set the loading state.
     * @param {boolean} loading The loading state.
     * @returns {void}
     */setLoading(t){s(this,U,"m",_).call(this,"state",t?"loading":this.isAuthenticated?"authenticated":"unauthenticated")}
/**
     * Set the provider. This is useful for setting the provider when the user selects a provider from the UI or when dApp wishes to use a specific provider.
     * @param {object} options The options object. Includes the provider and the provider info.
     * @returns {void}
     * @throws {APIError} - Throws an error if the provider is not provided.
     */setProvider({provider:t,info:e}){if(!t)throw new a("provider is required");this.viem=m(t,e.name),s(this,U,"m",_).call(this,"provider",{provider:t,info:e})}
/**
     * Set the wallet address. This is useful for edge cases where the provider can't return the wallet address. Don't use this unless you know what you're doing.
     * @param {string} walletAddress The wallet address.
     * @returns {void}
     */setWalletAddress(t){this.walletAddress=t}
/**
     * Disconnect the user.
     * @returns {void}
     */disconnect(){return r(this,void 0,void 0,(function*(){this.isAuthenticated=!1,this.walletAddress=null,this.userId=null,this.jwt=null,localStorage.removeItem("camp-sdk:wallet-address"),localStorage.removeItem("camp-sdk:user-id"),localStorage.removeItem("camp-sdk:jwt"),s(this,U,"m",_).call(this,"state","unauthenticated"),yield s(this,U,"m",x).call(this,g.USER_DISCONNECTED,"User Disconnected")}))}
/**
     * Connect the user's wallet and sign the message.
     * @returns {Promise<object>} A promise that resolves with the authentication result.
     * @throws {APIError} - Throws an error if the user cannot be authenticated.
     */connect(){return r(this,void 0,void 0,(function*(){s(this,U,"m",_).call(this,"state","loading");try{this.walletAddress||(yield s(this,U,"m",W).call(this));const t=yield s(this,U,"m",L).call(this),e=s(this,U,"m",R).call(this,t),i=yield this.viem.signMessage({account:this.walletAddress,message:e}),n=yield s(this,U,"m",B).call(this,e,i);if(n.success)return this.isAuthenticated=!0,this.userId=n.userId,this.jwt=n.token,localStorage.setItem("camp-sdk:jwt",this.jwt),localStorage.setItem("camp-sdk:wallet-address",this.walletAddress),localStorage.setItem("camp-sdk:user-id",this.userId),s(this,U,"m",_).call(this,"state","authenticated"),yield s(this,U,"m",x).call(this,g.USER_CONNECTED,"User Connected"),{success:!0,message:"Successfully authenticated",walletAddress:this.walletAddress};throw this.isAuthenticated=!1,s(this,U,"m",_).call(this,"state","unauthenticated"),new a("Failed to authenticate")}catch(t){throw this.isAuthenticated=!1,s(this,U,"m",_).call(this,"state","unauthenticated"),new a(t)}}))}
/**
     * Get the user's linked social accounts.
     * @returns {Promise<object>} A promise that resolves with the user's linked social accounts.
     * @throws {APIError} - Throws an error if the user is not authenticated or if the request fails.
     * @example
     * const auth = new Auth({ clientId: "your-client-id" });
     * const socials = await auth.getLinkedSocials();
     * console.log(socials);
     */getLinkedSocials(){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");const t=yield fetch(`${v}/auth/client-user/connections-sdk`,{method:"GET",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"}}).then((t=>t.json()));if(t.isError)throw new a(t.message||"Failed to fetch connections");{const e={};return Object.keys(t.data.data).forEach((i=>{e[i.split("User")[0]]=t.data.data[i]})),e}}))}
/**
     * Link the user's Twitter account.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */linkTwitter(){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");yield s(this,U,"m",x).call(this,g.TWITTER_LINKED,"Twitter Linked"),window.location.href=`${v}/twitter/connect?clientId=${this.clientId}&userId=${this.userId}&redirect_url=${this.redirectUri.twitter}`}))}
/**
     * Link the user's Discord account.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */linkDiscord(){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");yield s(this,U,"m",x).call(this,g.DISCORD_LINKED,"Discord Linked"),window.location.href=`${v}/discord/connect?clientId=${this.clientId}&userId=${this.userId}&redirect_url=${this.redirectUri.discord}`}))}
/**
     * Link the user's Spotify account.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */linkSpotify(){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");yield s(this,U,"m",x).call(this,g.SPOTIFY_LINKED,"Spotify Linked"),window.location.href=`${v}/spotify/connect?clientId=${this.clientId}&userId=${this.userId}&redirect_url=${this.redirectUri.spotify}`}))}
/**
     * Link the user's TikTok account.
     * @param {string} handle The user's TikTok handle.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */linkTikTok(t){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");const e=yield fetch(`${v}/tiktok/connect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({userHandle:t,clientId:this.clientId,userId:this.userId})}).then((t=>t.json()));if(e.isError)throw"Request failed with status code 502"===e.message?new a("TikTok service is currently unavailable, try again later"):new a(e.message||"Failed to link TikTok account");return s(this,U,"m",x).call(this,g.TIKTOK_LINKED,"TikTok Linked"),e.data}))}
/**
     * Send an OTP to the user's Telegram account.
     * @param {string} phoneNumber The user's phone number.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated.
     */sendTelegramOTP(t){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");if(!t)throw new a("Phone number is required");yield this.unlinkTelegram();const e=yield fetch(`${v}/telegram/sendOTP-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({phone:t})}).then((t=>t.json()));if(e.isError)throw new a(e.message||"Failed to send Telegram OTP");return e.data}))}
/**
     * Link the user's Telegram account.
     * @param {string} phoneNumber The user's phone number.
     * @param {string} otp The OTP.
     * @param {string} phoneCodeHash The phone code hash.
     * @returns {void}
     * @throws {APIError} - Throws an error if the user is not authenticated. Also throws an error if the phone number, OTP, and phone code hash are not provided.
     */linkTelegram(t,e,i){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");if(!t||!e||!i)throw new a("Phone number, OTP, and phone code hash are required");const n=yield fetch(`${v}/telegram/signIn-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({phone:t,code:e,phone_code_hash:i,userId:this.userId,clientId:this.clientId})}).then((t=>t.json()));if(n.isError)throw new a(n.message||"Failed to link Telegram account");return s(this,U,"m",x).call(this,g.TELEGRAM_LINKED,"Telegram Linked"),n.data}))}
/**
     * Unlink the user's Twitter account.
     */unlinkTwitter(){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");const t=yield fetch(`${v}/twitter/disconnect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({id:this.userId})}).then((t=>t.json()));if(t.isError)throw new a(t.message||"Failed to unlink Twitter account");return t.data}))}
/**
     * Unlink the user's Discord account.
     */unlinkDiscord(){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");const t=yield fetch(`${v}/discord/disconnect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({id:this.userId})}).then((t=>t.json()));if(t.isError)throw new a(t.message||"Failed to unlink Discord account");return t.data}))}
/**
     * Unlink the user's Spotify account.
     */unlinkSpotify(){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");const t=yield fetch(`${v}/spotify/disconnect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({id:this.userId})}).then((t=>t.json()));if(t.isError)throw new a(t.message||"Failed to unlink Spotify account");return t.data}))}unlinkTikTok(){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");const t=yield fetch(`${v}/tiktok/disconnect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({userId:this.userId})}).then((t=>t.json()));if(t.isError)throw new a(t.message||"Failed to unlink TikTok account");return t.data}))}unlinkTelegram(){return r(this,void 0,void 0,(function*(){if(!this.isAuthenticated)throw new a("User needs to be authenticated");const t=yield fetch(`${v}/telegram/disconnect-sdk`,{method:"POST",redirect:"follow",headers:{Authorization:`Bearer ${this.jwt}`,"x-client-id":this.clientId,"Content-Type":"application/json"},body:JSON.stringify({userId:this.userId})}).then((t=>t.json()));if(t.isError)throw new a(t.message||"Failed to unlink Telegram account");return t.data}))}}N=new WeakMap,C=new WeakMap,U=new WeakSet,_=function(t,e){s(this,N,"f")[t]&&s(this,N,"f")[t].forEach((t=>t(e)))},P=function(){if("undefined"==typeof localStorage)return;const t=null===localStorage||void 0===localStorage?void 0:localStorage.getItem("camp-sdk:wallet-address"),e=null===localStorage||void 0===localStorage?void 0:localStorage.getItem("camp-sdk:user-id"),i=null===localStorage||void 0===localStorage?void 0:localStorage.getItem("camp-sdk:jwt");t&&e&&i?(this.walletAddress=t,this.userId=e,this.jwt=i,this.isAuthenticated=!0):this.isAuthenticated=!1},W=function(){return r(this,void 0,void 0,(function*(){try{const[t]=yield this.viem.requestAddresses();return this.walletAddress=t,t}catch(t){throw new a(t)}}))},L=function(){return r(this,void 0,void 0,(function*(){try{const t=yield fetch(`${v}/auth/client-user/nonce`,{method:"POST",headers:{"Content-Type":"application/json","x-client-id":this.clientId},body:JSON.stringify({walletAddress:this.walletAddress})}),e=yield t.json();return 200!==t.status?Promise.reject(e.message||"Failed to fetch nonce"):e.data}catch(t){throw new Error(t)}}))},B=function(t,e){return r(this,void 0,void 0,(function*(){try{const i=yield fetch(`${v}/auth/client-user/verify`,{method:"POST",headers:{"Content-Type":"application/json","x-client-id":this.clientId},body:JSON.stringify({message:t,signature:e,walletAddress:this.walletAddress})}),n=yield i.json(),r=n.data.split(".")[1],s=JSON.parse(atob(r));return{success:!n.isError,userId:s.id,token:n.data}}catch(t){throw new a(t)}}))},R=function(t){return n({domain:window.location.host,address:this.walletAddress,statement:y,uri:window.location.origin,version:"1",chainId:this.viem.chain.id,nonce:t})},x=function(t,e){return r(this,arguments,void 0,(function*(t,e,i=1){yield((t,e,i,n)=>r(void 0,void 0,void 0,(function*(){return new Promise(((r,s)=>{if("undefined"!=typeof window&&null!==t){console.log("Sending analytics event",e,n);try{t.action(e,{key:i,value:n},(t=>{r(t)}))}catch(t){console.error(t),s(t)}}else s(new Error("Ackee is not available or window is undefined"))}))})))(s(this,C,"f"),t,e,i)}))};export{K as Auth,f as SpotifyAPI,l as TwitterAPI};
