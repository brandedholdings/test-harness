import intern from 'intern';

import FunctionalTest from '../../functionalTest';

const { registerSuite } = intern.getPlugin('interface.object');
//const { assert } = intern.getPlugin('chai');

registerSuite('example tests', {
    'find pictures of puppies on google': new FunctionalTest(browser => {
        // first go to google
        browser.goToUrl('https://www.google.com')
            .sleep(2000)
            // then type "puppy pictures" in the search field
            .type('[name=q]', 'australian shepherd puppies')
            // then click the "I'm Feeling Lucky" button
            .click('[name=btnI]')
            // then wait 10 seconds, allowing the puppies to sink in before ending test
            .sleep(10000);
    }),//*/
    /*
    'do other stuff': new FunctionalTest(browser => {
        browser.goToUrl('https://creditloancompare.com')
            .click('.start-form')
            .dropdown('[name="homeAddress.state"]', '[value="FL"]')
            .sleep(500)
            .click('//button[contains(text(), "Next")]')
            .type('[name=nameFirst]', 'Hugh')
            .type('[name=nameLast]', 'Jackman')
            .type('[name=email]', 'asdf@asdf.com')
            .type('[name=emailConfirm]', 'asdf@asdf.com')
            .type('[name="homeAddress.zip"]', '33624')
            .click('label[for="legalCertification"] .control__indicator')
            .click('//button[contains(text(), "Next")]')
            .sleep(10000);
    })//*/
});