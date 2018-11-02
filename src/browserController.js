import chalk from 'chalk';
import logWithTimestamp from './log';

// helpers

function log(...args) {
    return () => logWithTimestamp(...args);
}

export default class BrowserController {
    static defaults = {
        findTimeout: 15000,
        hoverDuration: 2000,
        typeDelay: 50,
        screenshotOnError: false,
    };

    remote = null;
    settings = null;

    totalSleepTime = 0;

    constructor(remote, options) {
        this.settings = { ...BrowserController.defaults, ...options };
        this.remote = remote;
    }

    // internal helper methods

    findHelper(selector) {
        const method = /[/@]/.test(selector) ? 'findDisplayedByXpath' : 'findDisplayedByCssSelector';
        return this.remote = this.remote[method](selector);
    }
        
    clickHelper(selector) {
        return this.remote = this.findHelper(selector).click();
    }

    // logging methods

    log(...args) {
        this.remote = this.remote.then(log(...args));
        return this;
    }

    // url/history navigation methods

    goToUrl(url) {
        this.remote = this.remote
            .then(log('navigating to url', chalk.cyan(url)))
            .get(url);

        return this;
    }

    goForward() {
        this.remote = this.remote
            .then(log('going forward in browser history'))
            .goForward();
        
        return this;
    }

    goBack() {
        this.remote = this.remote
            .then(log('going back in browser history'))
            .goBack();
        
        return this;
    }

    goHistory(d) {
        const method = d > 0 ? 'goForward' : 'goBack';
        const numJumps = Math.abs(d);

        for (let i = 0; i < numJumps; ++i) {
            this[method]();
        }

        return this;
    }

    // misc methods

    sleep(ms) {
        let waitIndicatorInterval;

        ms = ms || 1000;
        this.totalSleepTime += ms;

        this.remote = this.remote
            .then(log('sleeping for', chalk.cyan(ms + 'ms')))
            .then(() => { waitIndicatorInterval = setInterval(log(chalk.gray('\tzzzz...')), 1000); })
            .sleep(ms)
            .then(() => { clearInterval(waitIndicatorInterval); })
            .then(log('\tI AWAKE'));
        
        return this;
    }

    then(callback) {
        this.remote = this.remote.then(callback);
        return this;
    }

    // element selection methods

    find(selector) {
        // @todo find

        return this;
    }

    // element interaction methods

    click(selector) {
        if (selector === undefined) {
            this.remote = this.remote
                .then(log('clicking document'))
                .click();
        } else {
            this.remote = this.remote
                .then(log('clicking element', chalk.cyan(selector)));

            this.clickHelper(selector);
        }

        this.remote = this.remote.end();

        return this;
    }

    type(selector, text, delay = this.settings.typeDelay) {
        /*
        sending the whole string at once can cause issues with masked form inputs
        as the keystroke events pile up too quickly and create unrealistic conditions
        that are impossible with real user interactions and don't match actual keystroke
        behavior 1:1, so we split the string up into characters and send individual
        type commands.
        */

        this.remote = this.remote
            .then(log('typing', chalk.cyan(text), 'in element', chalk.cyan(selector)));

        this.clickHelper(selector);

        const chars = text.split('');

        for (let char of chars) {
            this.remote = this.remote
                .type(char)
                .then(() => new Promise(resolve => setTimeout(resolve, delay)));
        }

        this.remote = this.remote.end();

        return this;
    }

    dropdown(dropdownSelector, optionSelector) {
        this.remote = this.remote
            .then(log('picking', chalk.cyan(optionSelector), 'from dropdown', chalk.cyan(dropdownSelector)));
        
        this.clickHelper(dropdownSelector);
        this.clickHelper(optionSelector);
        this.remote = this.remote.end().end();
        
        return this;
    }

    alertOk() {
        this.remote = this.remote.acceptAlert();
        return this;
    }

    alertCancel() {
        this.remote = this.remote.dismissAlert();
        return this;
    }
};
