/* globals $ Hashes*/

$(() => {
    const $signupForm = $('#signin-form');

    $signupForm.submit((event) => {
        const $password = $signupForm.find('#signin-password');
        const passHash = new Hashes.SHA256().hex($password.val()).toString();

        $password.val(passHash);

        return;
    });
});
