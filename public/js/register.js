/* globals $ validator toastr Hashes*/

$(() => {
    const CONSTRAINTS = {
        NAME: {
            LENGTH: {
                min: 1,
                max: 10,
            },
            REQUIRED: true,
        },
        USERNAME: {
            LENGTH: {
                min: 4,
                max: 20,
            },
            REQUIRED: true,
        },
        PASSWORD: {
            LENGTH: {
                min: 4,
                max: 100,
            },
            REQUIRED: true,
        },
        IMAGE: {
            REQUIRED: false,
        },
        EMAIL: {
            REQUIRED: true,
        },
    };

    const MESSAGES = {
        INVALID_NAME_LENGTH: `
            Name must be between ${CONSTRAINTS.NAME.LENGTH.min}
             and ${CONSTRAINTS.NAME.LENGTH.max} letters long!`,

        INVALID_NAME_LETTER: `
            Name must consist of letters only!`,

        INVALID_USERNAME_LENGTH: `
            Username must be between ${CONSTRAINTS.USERNAME.LENGTH.min} 
            and ${CONSTRAINTS.USERNAME.LENGTH.max} letters long!`,

        INVALID_USERNAME_LETTER: `
            Username can consist of letters and digits only!`,

        INVALID_PASSWORD_LENGTH: `
            Password must be between ${CONSTRAINTS.PASSWORD.LENGTH.min}
            and ${CONSTRAINTS.PASSWORD.LENGTH.max} characters long!`,

        INVALID_PASSWORD_CONFIRM: `
            Password confirmation is not equal to the first one!`,

        INVALID_EMAIL: `
            Email must be a valid one!`,
    };

    const $signupForm = $('#signup-form');

    $signupForm.submit((event) => {
        const $firstName = $signupForm.find('#signup-first-name');
        const $lastName = $signupForm.find('#signup-last-name');
        const $username = $signupForm.find('#signup-username');
        const $email = $signupForm.find('#signup-email');
        const $password = $signupForm.find('#signup-password');
        const password = $password.val();
        const $passwordConfirmation = $signupForm
            .find('#signup-password-confirm');
        const passwordConfirmation = $passwordConfirmation.val();

        const user = {
            username: validator.escape($username.val()),
            password: new Hashes.SHA256().hex(password).toString(),
            firstName: validator.escape($firstName.val()),
            lastName: validator.escape($lastName.val()),
            email: validator.escape($email.val()),
        };

        if (!validateUsername(user.username) ||
            !validatePassword(password, passwordConfirmation) ||
            !validateEmail(user.email) ||
            !validateFirstName(user.firstName) ||
            !validateLastName(user.lastName)) {
            event.preventDefault();
        } else {
            $password.val(user.password);
            $passwordConfirmation.val(user.password);
            return;
        }
    });

    const validateUsername = (username) => {
        if (!username && !CONSTRAINTS.USERNAME.REQUIRED) {
            $('#help-username').removeClass('red-text');
            return true;
        }
        if (!validator.isLength(username, CONSTRAINTS.USERNAME.LENGTH)) {
            toastr.error(MESSAGES.INVALID_USERNAME_LENGTH);
            $('#help-username').addClass('red-text');
            return false;
        }
        if (!validator.isAlphanumeric(username)) {
            toastr.error(MESSAGES.INVALID_USERNAME_LETTER);
            $('#help-username').addClass('red-text');
            return false;
        }
        $('#help-username').removeClass('red-text');
        return true;
    };

    const validatePassword = (password, passwordConfirmation) => {
        if (!validator.isLength(password, CONSTRAINTS.PASSWORD.LENGTH)) {
            toastr.error(MESSAGES.INVALID_PASSWORD_LENGTH);
            $('#help-password').addClass('red-text');
            return false;
        }

        $('#help-password').removeClass('red-text');
        password = validator.escape(password);
        passwordConfirmation = validator.escape(passwordConfirmation);

        if (password !== passwordConfirmation) {
            toastr.error(MESSAGES.INVALID_PASSWORD_CONFIRM);
            $('#help-password-confirm').addClass('red-text');
            return false;
        }
        $('#help-password-confirm').removeClass('red-text');
        return true;
    };

    const validateFirstName = (name) => {
        if (!name && !CONSTRAINTS.NAME.REQUIRED) {
            $('#help-first-name').removeClass('red-text');
            return true;
        }
        if (!validator.isLength(name, CONSTRAINTS.NAME.LENGTH)) {
            toastr.error(MESSAGES.INVALID_NAME_LENGTH);
            $('#help-first-name').addClass('red-text');
            return false;
        }
        if (!validator.isAlpha(name)) {
            toastr.error(MESSAGES.INVALID_NAME_LETTER);
            $('#help-first-name').addClass('red-text');
            return false;
        }
        $('#help-first-name').removeClass('red-text');
        return true;
    };

    const validateLastName = (name) => {
        if (!name && !CONSTRAINTS.NAME.REQUIRED) {
            $('#help-last-name').removeClass('red-text');
            return true;
        }
        if (!validator.isLength(name, CONSTRAINTS.NAME.LENGTH)) {
            toastr.error(MESSAGES.INVALID_NAME_LENGTH);
            $('#help-last-name').addClass('red-text');
            return false;
        }
        if (!validator.isAlpha(name)) {
            toastr.error(MESSAGES.INVALID_NAME_LETTER);
            $('#help-last-name').addClass('red-text');
            return false;
        }
        $('#help-last-name').removeClass('red-text');
        return true;
    };

    const validateEmail = (email) => {
        if (!email && !CONSTRAINTS.EMAIL.REQUIRED) {
            $('#help-email').removeClass('red-text');
            return true;
        }
        if (!validator.isEmail(email)) {
            toastr.error(MESSAGES.INVALID_EMAIL);
            $('#help-email').addClass('red-text');
            return false;
        }
        $('#help-email').removeClass('red-text');
        return true;
    };

     $('.profile-image').html(
        $.cloudinary.image('default-profile-picture', {
            radius: 'max',
            height: 240,
            width: 240,
            crop: 'scale',
        })
        .addClass('avatar img-circle img-thumbnail')
        .attr('id', 'profile-photo')
    );

    $('#photo-selector').unsigned_cloudinary_upload('q3olokl1', {
        cloud_name: 'teamyowie',
        tags: 'browser_uploads',
    })
    .bind('cloudinarydone', (e, data) => {
        $('#profile-photo').remove();
        $('#progress-bar')
            .addClass('hidden');
        $('#image-id').val(data.result.public_id);

        $('.profile-image').html(
            $.cloudinary.image(data.result.public_id, {
                radius: 'max',
                height: 240,
                width: 240,
                crop: 'scale',
            })
            .addClass('avatar img-circle img-thumbnail')
            .attr('id', 'profile-photo')
        );
    })
    .bind('cloudinaryprogress', (e, data) => {
        const percent = Math.round((data.loaded*100.0)/data.total)+'%';
        $('#progress-bar')
            .removeClass('hidden');
        $('.progress-bar-info')
            .css('width', percent)
            .text(percent);
    });

    const $photoSelector = $('#photo-selector');

    $photoSelector.on('change', () => {
        $('#file-path')
        .val($photoSelector.val().replace(/\\/g, '/').replace(/.*\//, ''));
  });
});
