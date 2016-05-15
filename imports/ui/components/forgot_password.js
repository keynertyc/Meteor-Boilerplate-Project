import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/components/forgot_password.html';

Template.c_forgot_password.events({
    'submit .form-forgot-password' (event) {
        event.preventDefault();
        const email = event.target.email.value.toLowerCase();

        Accounts.forgotPassword({email}, (error) => {
            if (error) {
                toastr.error(error.reason);
            } else {
                event.target.email.value = '';
                toastr.success("Check your email!");
            }
        });
    }
});