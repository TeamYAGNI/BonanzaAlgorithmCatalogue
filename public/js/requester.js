/* globals $ Promise */
/* eslint-disable no-unused-vars */

const requester = (() => {
    const get = (url, headers) => {
        headers = headers || {};

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'GET',
                contentType: 'application/json',
                headers: headers,
            })
                .done(resolve)
                .fail(reject);
        });
    };

    const post = (url, body, headers) => {
        headers = headers || {};

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(body),
                headers,
            })
                .done((data) => resolve(data))
                .fail((...data) => reject(data));
        });
    };

    const put = (url, body, headers) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(body),
                headers: headers,
            })
                .done(resolve)
                .fail(reject);
        });
    };

    return {
        get,
        post,
        put,
    };
})();
