import intern from 'intern';

import FunctionalTest from '../../functionalTest';

const { registerSuite } = intern.getPlugin('interface.object');
//const { assert } = intern.getPlugin('chai');

registerSuite('example tests', {
    'find pictures of puppies on google': new FunctionalTest(browser => {
        // first go to google
        browser.goToUrl('https://www.google.com')
            // then type "puppy pictures" in the search field
            .type('[name=q]', 'puppy pictures')
            // then click the "I'm Feeling Lucky" button
            .click('[name=btnI]')
            // then wait 10 seconds, allowing the puppies to sink in before ending test
            .sleep(10000);
    })
});