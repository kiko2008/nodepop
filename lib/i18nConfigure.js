'use strict';

const i18n = require('i18n');
const path = require('path');

module.exports = function() {
    i18n.configure({
        locales: ['es', 'en'],
        directory: path.join(__dirname, '..', 'locales'),
        defaultLocale: 'es',
        autoReload: true,
        syncFiles: true,
        cookie: 'nodepop-lang'
    });

    return i18n;
};