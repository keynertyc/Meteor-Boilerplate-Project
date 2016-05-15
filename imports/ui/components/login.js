import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/components/login.html';

Template.login.events({
    'submit .form-signin' (event) {
        event.preventDefault();
        const email = event.target.email.value.toLowerCase();
        const password = event.target.password.value;

        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                toastr.error(error.reason);
                event.target.password.value = '';
            } else {
                Meteor.call('users.change_loggedin');
                Router.go('/dashboard');
            }
        });
    },
    'click .signin-facebook' (event) {
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
    'click .signin-twitter' (event) {
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