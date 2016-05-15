import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    requestPermissions: {
        facebook: ['public_profile','user_friends','email'],
        //facebook: ['public_profile','user_friends','publish_actions','email']
    },
    passwordSignupFields: 'EMAIL_ONLY',
});