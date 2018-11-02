import BrowserController from './browserController';

export default class FunctionalTest extends Function {
    constructor(testFunc) {
        function that() {
            const browser = new BrowserController(this.remote);
            
            browser.log('test start');
            testFunc(browser);
            browser.log('test end');

            return browser.remote;
        }

        Object.setPrototypeOf(that, FunctionalTest.prototype);

        return that;
    }
};
