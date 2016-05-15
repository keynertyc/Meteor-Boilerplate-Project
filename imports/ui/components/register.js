import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/components/register.html';

Template.register.events({
    'submit .form-signup' (event) {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value.toLowerCase();
        const password = event.target.password.value;
        const password_again = event.target.password_again.value;

        if (password !== password_again) {
            toastr.error('Passwords dont\'t Match!');
            event.target.password.value = '';
            event.target.password_again.value = '';
        } else {
            Accounts.createUser({
                email,
                password,
                profile: {
                    name: name
                }
            }, (error) => {
                if (error) {
                    toastr.error(error.reason);
                } else {
                    Meteor.call('users.change_loggedin');
                    Router.go('/dashboard');
                }
            });
        }

    },
    'click .signup-facebook' (event) {
        event.preventDefault();

        Meteor.loginWithFacebook({requestPermissions: ['public_profile','user_friends','email']}, (error) => {
            if (error) {
                toastr.error(error.reason);
            } else {
                Meteor.call('users.change_loggedin');
                Router.go('/dashboard');
            }
        });
    },
    'click .signup-twitter' (event) {
        event.preventDefault();

        Meteor.loginWithTwitter({}, (error) => {
            if (error) {
                toastr.error(error.reason);
            } else {
                Meteor.call('users.change_loggedin');
                Router.go('/dashboard');
            }
        });
    }
})