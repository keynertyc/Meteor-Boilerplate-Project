import { Meteor } from 'meteor/meteor';

Accounts.config({
    sendVerificationEmail: true,
    loginExpirationInDays: 0.06
});

Accounts.onCreateUser((options, user) => {

    if (options.profile) {
        user.profile = options.profile;
    }

    if (options.roles) {
        user.roles = options.roles;
        Roles.addUsersToRoles(user._id, options.roles);
    } else {
        user.roles = ['user'];
    }

    if (user.services.facebook) {
        const service = 'facebook';

        switch (service) {
            case 'facebook':
                const { name, email } = user.services[service];
                const existingUser = Meteor.users.findOne({'emails.address': email});
                if (!existingUser) {
                    user.profile = {name};
                    user.emails = [{address: email}];
                    return user;
                }
                break;
            default:
                break;
        }

        existingUser.services[service] = user.services[service];

        Meteor.users.remove({_id: existingUser._id});
        return existingUser;
    }

    return user;
});

Meteor.users.after.insert((userId, doc) => {
    Roles.addUsersToRoles(doc._id, doc.roles);
});