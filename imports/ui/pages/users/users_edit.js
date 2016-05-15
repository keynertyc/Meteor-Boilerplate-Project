import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/pages/users/users_edit.html';

Template.users_edit.onRendered(() => {
    $('select').material_select();
});

Template.users_edit.events({
    'submit .form-users-edit' (event) {
        event.preventDefault();
        const id = this.user._id;
        const name = event.target.name.value;
        const email = event.target.email.value.toLowerCase();
        let roles;
        if (event.target.role) {
            roles = [event.target.role.value];
        }
        Meteor.call('users.edit', id, name, email, roles, (error) => {
            if (error) {
                if (error.error == 'email_exist') {
                    toastr.warning(error.reason);
                    event.target.email.value = this.emails[0].address;
                } else {
                    toastr.error(error.reason);
                }
            } else {
                toastr.success('Data saved!');
            }
        });
    },
    'submit .form-users-password-edit' (event) {
        event.preventDefault();
        const id = this.user._id;
        const password = event.target.password.value;
        const password_again = event.target.password_again.value;

        if (password !== password_again) {
            toastr.error('Passwords dont\'t Match!');
        } else {
            Meteor.call('users.change_password', id, password, (error) => {
                if (error) {
                    toastr.error(error.reason);
                } else {
                    toastr.success('Password Changed!');
                }
            });
        }
        event.target.password.value = '';
        event.target.password_again.value = '';
    }
});
