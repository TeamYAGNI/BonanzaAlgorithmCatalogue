const data = [{
    'username': 'Test',
    'password': '123qwe',
    'id': 1,
}];

const users = {
    findByUsername(username) {
        const usernameToLower = username.toLowerCase();
        const user = data.find((u) =>
            u.username.toLowerCase() === usernameToLower);
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such user');
            }

            return resolve(user);
        });
    },
    findById(id) {
        id = +id;
        const user = data.find((u) => u.id === id);
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such user');
            }
            return resolve(user);
        });
    },
};

module.exports = { users };
