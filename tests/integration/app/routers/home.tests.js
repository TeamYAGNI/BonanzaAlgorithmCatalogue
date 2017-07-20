const config = require('./../../../../config/config');
const request = require('supertest');

describe('homeController tests', () => {
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('./../../../../db')
                .init(config.db))
            .then((db) => require('./../../../../data')
                .init(db))
            .then((data) => require('./../../../../config/express')
                .init(data, config))
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET /', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
