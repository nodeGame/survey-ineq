/**
 * # Channel settings
 * Copyright(c) 2021 Stefano Balietti <ste@nodegame.org>
 * MIT Licensed
 *
 * The channel is divided into two internal servers: player and admin.
 * Each of those grants different privileges upon connection.
 *
 * Player and admin server share all options specified here. If custom
 * options for each server are needed, they can be specified inside the
 * `playerServer` and `adminServer` properties.
 *
 * Each server must define an 'endpoint' to which nodeGame clients
 * can connect. The default server endpoints are:
 *
 *   - player server: name of the game,
 *   - admin server: name of the game /admin
 *
 * http://www.nodegame.org
 * ---
 */
module.exports = {

    /**
     * ## enabled (boolean) Optional
     *
     * Set to FALSE to disable loading this channel at startup
     *
     * Default: TRUE
     */
    enabled: true,

    /**
     * ## name (string) Optional
     *
     * The name of the channel
     *
     * Default: the name of the game, as found in the package.json file.
     */
    // name: 'Survey',

    /**
     * ## alias (string|array) Optional
     *
     * Alternative name/s for the channel
     *
     * By default, if 'gameName' is the name of the channel, files will
     * be served from the address: `http://myserver/gameName/`.
     * Here you can add aliases to enable urls like: `http://myserver/alias/`.
     *
     * Important! `node.connect()` in `public/js/index.js` still needs
     * to use the real channel name, so you will need to pass it explicitly:
     * `node.connect('/gameName').
     */
    // alias: [],

    /**
     * ## playerServer (object|string) Optional
     *
     * Set of custom options applying only to player server
     *
     * If string, it will be interpreted as the name oof the server
     * endpoint for socket.io player connections.
     *
     * If object, the endpoint must be specified in the _endpoint_ property.
     *
     * Default: name-of-the-channel
     */
    playerServer: {

        endpoint: 'Survey',

        // Anti-spoofing, extra check to see if msg.from matches socket.id
        // on SocketIo socket connections. Spoofed messages are logged
        // normally, and an additional log entry with id and from msg is added.
        // Disable only if you need that extra bit of speed.
        antiSpoofing: true
    },

    /**
     * ## adminServer (object|string) Optional
     *
     * Set of custom options applying only to admin server
     *
     * If string, it will be interpreted as the name oof the server
     * endpoint for socket.io admin connections.
     *
     * If object, the endpoint must be specified in the _endpoint_ property.
     *
     * Default: name-of-the-channel/admin
     */
    // adminServer: 'Survey/admin',

    /**
     * ## getFromAdmins (boolean) Optional
     *
     * If TRUE, players can invoke GET commands on admins
     *
     * Default: FALSE
     */
    getFromAdmins: true,

    /**
     * ## accessDeniedUrl (string) Optional
     *
     * Unauthorized clients will be redirected here.
     *
     * Default: "/pages/accessdenied.htm"
     */
    // accessDeniedUrl: 'unauth.htm',

    /**
     * ## notify (object) Optional
     *
     * Configuration options controlling what events are notified to players
     *
     * Default: player actions are notified to admins only.
     */
    notify: {

        // When a player connects / disconnects.
        onConnect: false,

        // When a player changes a stage / step.
        onStageUpdate: false,

        // When the 'LOADED' stageLevel is fired (useful to sync players)
        onStageLoadedUpdate: false,

        // When any change of stageLevel happens (e.g. INIT, CALLBACK_EXECUTED)
        // Notice: generates a lot of overhead of messages.
        onStageLevelUpdate: false,

    },

    /**
     * ## enableReconnections (boolean) Optional
     *
     * If TRUE, only one TAB per browser will be allowed
     *
     * Default: FALSE
     */
    enableReconnections: true,

    /**
     * ### sameStepReconnectionOnly (boolean) Optional
     *
     * If TRUE, only reconnections in the same game step are allowed.
     *
     * Default: FALSE
     */
    // sameStepReconnectionOnly: false,

    /**
     * ### disposeFailedReconnections (boolean) Optional
     *
     * If TRUE, failed reconnections are disposed
     *
     * If FALSE, failed reconnections are treated as a new connection.
     *
     * A reconnection can fail for the following reasones:
     *
     * - Parameter `enabledReconnections` is FALSE.
     * - Parameter `sameStepReconnectionOnly` is TRUE, and the
     *      client's stage and the logic's stage are different.
     * - The room in which the client was at the moment of
     *      disconnection cannot be located.
     * - Any other error.
     *
     * Default: FALSE
     */
    // disposeFailedReconnections: true,

    /**
     * ### cacheMaxAge (number) Optional
     *
     * The duration in ms of the browser cache for public/ resources
     *
     * Default: 0 (no cache)
     */
    // cacheMaxAge: 360000,

    /**
     * ### sioQuery (boolean) Optional
     *
     * If TRUE, clients connecting via Socket.io can set own parameters
     *
     * Available parameters:
     *
     *  - clientType: sets the client type
     *  - startingRoom: sets the room in which the client will be placed first
     *
     * It is recommended to disable sioQuery in production
     *
     * Default: TRUE
     */
    // sioQuery: false,

    /**
     * ### defaultChannel (boolean) Optional
     *
     * If TRUE, the game is served from / (instead of /gamename/)
     *
     * The route `/gamename` will be disabled, while aliases,
     * if defined, will continue to work if not shadowed by any public path.
     *
     * Important! Socket.io connection must be established
     * with the right endpoint (i.e., node.connect("/channelName").
     * Check the public/index.htm file or public/js/index.js file for the
     * connect statement.
     *
     * Important! Other games might not be reachable any more.
     *
     * @deprecated. Use option --default at startup
     *
     * Default: false
     */
    // defaultChannel: false,

    /**
     * ### noAuthCookie (boolean) Optional
     *
     * If TRUE, a cookie is set even with authorization disabled
     *
     * Opening multiple browser tabs will cause a disconnection in other ones.
     *
     * Default: false
     */
    // noAuthCookie: false,

    /**
     * ### roomOwnDataDir (boolean) Optional
     *
     * If TRUE, each new room in the channel has an own data dir named after it
     *
     * Default: true
     */
    // roomOwnDataDir: true,

    /**
     * ### roomCounter (number) Optional
     *
     * If set, room counter is initialized to this value
     *
     * If undefined, room counter self-initialize to the next available id,
     * starting from 1, as found in the data folder of the game.
     *
     * Default: undefined
     */
    // roomCounter: 100,

    /**
     * ### roomCounterPadChars (0 <= number <= 12) Optional
     *
     * If set, leading 0 are added to the room counter to reach desired length
     *
     * For example, if `roomCounterChars` is equal to 6 and
     * the current roomCounter value is 123, then room name is: '000123'.
     *
     * Default: 6
     */
    // roomCounterPadChars: 6

    /**
     * ## logClients
     *
     * If TRUE, all connected/disconnected clients are logged to a csv file
     *
     * Default: FALSE
     */
    // logClients: true,

    /**
     * ## logClientsExtra
     *
     * Adds additional fields to the file of logged clients
     *
     * Default: undefined
     */
    // logClientsExtra: function(p) {
    //     return [ p.WorkerId || 'NA', p.HITId || 'NA',
    //              p.AssignmentId || 'NA', p.ExitCode || 'NA' ];
    // },

    /**
    * ## logClientsInterval
    *
    * How often (in milliseconds) data about clients is written to file system
    *
    * Default: 10000
    */
    // logClientsInterval: 10000,

    /**
    * ## page404
    *
    * A custom page displayed when a resource is not found.
    * 
    * Default: '404.htm'
    */
    // page404: '404.htm',
    
    /**
     * ## collectIp
     *
     * If TRUE, the IP address is collected and stored.
     * 
     * Default: FALSE
     */
    //  collectIp: true

    // Reserved for future versions:

    /**
     * ### roomCounterSeparator (character) Optional
     *
     * If set, this char is inserted between the padded room counter and 'room'
     *
     * Default: ''
     */
    // roomCounterSeparator: '@'
};
