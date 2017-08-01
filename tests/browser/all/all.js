const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui');
const delay = (t) => {
    return new Promise((resolve) => {
        setTimeout(resolve, t);
    });
};
describe('Sample test', () => {
    let driver = null;
    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    afterEach(() => {
        return driver.quit();
    });
    it('check title', () => {
        return driver.get('http://localhost:3001/')
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                return expect(title).equal('BonanzaAlgorithmsCatalogue');
            });
    });

    it('home button refresh', () => {
        return driver.get('http://localhost:3001/')
            .then(() => {
                return driver.findElement({ linkText: 'Home' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/');
            });
    });

    it('logo button refresh', () => {
        return driver.get('http://localhost:3001/')
            .then(() => {
                return driver
                    .findElement({ linkText: 'BonanzaAlgorithmsCatalogue' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/');
            });
    });

    it('signup', () => {
        return driver.get('http://localhost:3001/auth/register')
            .then(() => {
                return driver.findElement({ id: 'signup-username' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'signup-password' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'signup-password-confirm' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'signup-email' });
            })
            .then((el) => {
                return el.sendKeys('test@test.com');
            })
            .then(() => {
                return driver.findElement({ id: 'signup-first-name' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'signup-last-name' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'signup-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/');
            });
    });

    it('login', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/');
            });
    });

    it('login as admin', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/');
            });
    });

    it('login and go to user profile', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'current-username' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver
                    .findElement({ css: 'i.fa-user' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/users/admin3');
            });
    });

    it('login and go to chat from user profile', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'current-username' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver
                    .findElement({ css: 'i.fa-user' });
            })
            .then((el) => {
                return el.click();
            })
            .then((url) => {
                return driver.findElement({ css: '.glyphicon-envelope' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/chat');
            });
    });

    it('login and go to chat', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'current-username' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver
                    .findElement({ css: 'i.fa-envelope' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/chat');
            });
    });

    it('login, go to chat and send message', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'current-username' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver
                    .findElement({ css: 'i.fa-envelope' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'field' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ css: 'div.send_message' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return ui
                    .getText('li.left.appeared > div.text_wrapper > div.text');
            })
            .then((text) => {
                return expect(text)
                    .to.equal('admin3: admin3');
            });
    });

    it('login as admin and navigate to admin menu', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Admin' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/admin');
            });
    });

    it('login as admin and add task', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Admin' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Add Task' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'name' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'timelimit' });
            })
            .then((el) => {
                return el.sendKeys('100');
            })
            .then(() => {
                return driver.findElement({ id: 'memorylimit' });
            })
            .then((el) => {
                return el.sendKeys('100');
            })
            .then(() => {
                return driver.findElement({ id: 'description' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'input' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'result' });
            })
            .then((el) => {
                return el.sendKeys('test');
            })
            .then(() => {
                return driver.findElement({ id: 'add-task' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return expect(el).exist;
            });
    });

    it('login and navigate to task compiler', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'submit' });
            })
            .then((el) => {
                return expect(el).exist;
            });
    });

    it('login,go to compiler and check results', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'results' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return delay(1000)
                    .then(() => {
                        return ui.waitFor('.modal-body b');
                    });
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                return expect(text)
                    .to.equal('You have no submissions yet.');
            });
    });

    it('login,go to compiler and submit an empty solution', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return delay(1000)
                    .then(() => {
                        return ui.waitFor('.modal-body b');
                    });
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                return expect(text)
                    .to.equal('You can not pass empty submission!');
            });
    });

    it('login,go to compiler and check description', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'description' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return delay(1000)
                    .then(() => {
                        return ui.waitFor('#description-modal-title');
                    });
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                return expect(text)
                    .to.equal('test');
            });
    });

    it('login,go to compiler and get average', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'avg' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return delay(1000)
                    .then(() => {
                        return ui.waitFor('.modal-body b');
                    });
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                return expect(text)
                    .to.equal('There are no participants yet.');
            });
    });

    it('login,go to compiler and refresh result', () => {
        let expectedUrl = '';
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expectedUrl = url;
                return driver.findElement({ css: '.glyphicon-refresh' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).to.equal(expectedUrl);
            });
    });

    it('login,go to compiler and get submissions', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'submissions' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return ui.waitFor('h1.text-center');
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                return expect(text)
                    .to.equal('admin3\'s Submissions');
            });
    });

    it('login,go to compiler,get submissions and get back to compiler', () => {
        let expectedUrl = '';
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                expectedUrl = url;
                return driver.findElement({ id: 'submissions' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Back' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).to.equal(expectedUrl);
            });
    });

    it('login as admin,select task from tasks and update it', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Edit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Update Task' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'name' });
            })
            .then((el) => {
                return el.sendKeys('2');
            })
            .then(() => {
                return driver.findElement({ id: 'update-task' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test2' });
            })
            .then((el) => {
                return expect(el).exist;
            });
    });

    it('login as admin,select task from tasks and delete it', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test2' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Delete' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Delete Task' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'delete-task' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ linkText: 'test2' })
                    .catch((err) => {
                        return Promise.resolve('deleted');
                    });
            })
            .then((isDeleted) => {
                return expect(isDeleted).to.equal('deleted');
            });
    });

    it('login and logout', () => {
        return driver.get('http://localhost:3001/auth/login')
            .then(() => {
                return driver.findElement({ id: 'signin-username' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-password' });
            })
            .then((el) => {
                return el.sendKeys('admin3');
            })
            .then(() => {
                return driver.findElement({ id: 'signin-submit' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.findElement({ id: 'current-username' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver
                    .findElement({ css: 'i.fa-sign-out' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver
                    .findElement({ linkText: 'Tasks' });
            })
            .then((el) => {
                return el.click();
            })
            .then(() => {
                return driver.getCurrentUrl();
            })
            .then((url) => {
                return expect(url).equal('http://localhost:3001/auth/login');
            });
    });
});
