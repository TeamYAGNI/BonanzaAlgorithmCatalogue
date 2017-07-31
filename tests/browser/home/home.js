const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
// const webdriver = require('selenium-webdriver');

describe('Sample test', () => {
    let driver = null;
    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('check title', () => {
        // const driver2 = new webdriver
        //     .Builder()
        //     .usingServer('http://localhost:4444/wd/hub')
        //     .withCapabilities({
        //         browserName: browser,
        //     })
        //     .build();
        return driver.get('http://localhost:3000/')
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                return expect(title).equal('Generator-Express MVC');
            });
    });
});
