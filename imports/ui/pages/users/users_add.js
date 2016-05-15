import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/pages/users/users_add.html';

Template.users_add.onRendered(() => {
    $('select').material_select();
});

Template.users_add.events({
    'submit .form-users-add' (event) {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value.toLowerCase();
        const password = event.target.password.value;
        const password_again = event.target.password_again.value;
        let roles;
        if (event.target.role) {
            roles = [event.target.role.value];
        }

        if (password !== password_again) {
            toastr.error('Passwords dont\'t Match!');
            event.target.password.value = '';
            event.target.password_again.value = '';
        } else {
            Meteor.call('users.create', email, password, name, roles, (error) => {
                if (error) {
                    toastr.error(error.reason);
                } else {
                    toastr.success('User created!');
                    Router.go('/users');
                }
            });
        }
    }
})