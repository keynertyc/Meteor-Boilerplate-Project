import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/pages/users/users_list.html';

Template.users_list.events({
    'click .btn-remove-user' (event) {
        event.preventDefault();
        const id = this._id;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this user!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true,
            html: false
        }, function(){
            Meteor.call('users.delete_user', id, (error) => {
                if (error) {
                    toastr.error(error.reason);
                } else {
                    toastr.success('User deleted!');
                }
            });
        });
    }
});