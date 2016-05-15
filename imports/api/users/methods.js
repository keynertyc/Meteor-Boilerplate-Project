import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'users.edit' (id, name, email, roles) {
        check(name, String);
        check(email, String);
        const user = Meteor.users.findOne({_id: id});

        if (user) {
            Meteor.users.update({_id: user._id}, {
                $set: {
                    profile: {
                        name
                    }
                }
            });

            if (roles) {
                Roles.setUserRoles(user._id, roles);
            }

            const verify_user = Meteor.users.findOne({_id: {$ne: user._id}, "emails.address": email});

            if (verify_user) {
                throw new Meteor.Error('email_exist', 'Name saved, but Email already exists.');
            } else if (!user.emails) {
                Accounts.addEmail(user._id, email, false);
                return true;
            } else if (user.emails[0].address !== email) {
                Accounts.removeEmail(user._id, user.emails[0].address);
                Accounts.addEmail(user._id, email, false);
                return true;
            }
            else {
                return true;
            }
        }

        throw new Meteor.Error('default', 'Error, try again');
    },
    'users.change_password' (id, password) {
        Accounts.setPassword(id, password, {logout: false});
        return true;
    },
    'users.delete_user' (id) {
        Meteor.users.remove({_id: id});
        return true;
    },
    'users.create' (email, password, name, roles) {
        const existUser = Meteor.users.findOne({"emails.address": email});
        if (existUser) {
            throw new Meteor.Error(403, "Email already exists.");
        }
        let id;
        id = Meteor.users.insert({createdAt: new Date(), emails: [{address: email}], profile: {name: name}, roles});
        if (id) {
            Roles.addUsersToRoles(id, roles);
            Meteor.call('users.change_password', id, password);
        }
        return true;
    },
    'users.change_loggedin' (id) {
        if (Meteor.userId()) {
            Meteor.users.update({_id: Meteor.userId()}, {$set: {isLoggedIn: true}});
        } else {
            Meteor.users.update({_id: id}, {$set: {isLoggedIn: false}});
        }
    }
});