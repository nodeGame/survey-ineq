/**
 * # Game setup
 * Copyright(c) 2021  <>
 * MIT Licensed
 *
 * This file includes settings that are shared amongst all client types
 *
 * Setup settings are passed by reference and can be modified globally
 * by any instance executing on the server (but not by remote instances).
 *
 * http://www.nodegame.org
 * ---
 */

// Some imports, often used in setup.
const path = require('path');
const NDDB = require('NDDB');
const J = require('JSUS').JSUS;

module.exports = function (settings, stages, dir, level) {

    let setup = {};

    // ## verbosity
    // Changes the quantity of output to console in the browser and Node.JS
    // setup.verbosity = 1;

    // ## debug
    // Changes the behavior of nodeGame in relation to errors in the browser
    // and Node.JS. If TRUE, errors are thrown and displayed.
    setup.debug = true;

    // ## window
    // Changes the appereance and some of the features in the browser.
    setup.window = {

        // ### promptOnleave
        // If TRUE, a popup window will ask users whether they want to
        // leave the page.
        promptOnleave: !setup.debug
    };

    // Metadata.
    // By default are as in package.json, but can be overwritten.
    //
    // setup.metadata = {
    //    name: 'another name',
    //    version: 'another version',
    //    description: 'another descr'
    // };

    // Environment variables. Can be retrieved via `node.env('foo')`,
    // or be used to conditionally execute a function:
    // `node.env('foo', function(foo) { ... })`.
    //
    // setup.env = {
    //    foo: false
    // };

    return setup;
};
