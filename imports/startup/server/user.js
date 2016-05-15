import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    if (Meteor.users.find().count() < 1 ) {
        const users = [{
            name: 'Keyner TYC',
            email: 'keyner.peru@gmail.com',
            password: '12345', // Set your admin password
            roles: ['admin']
        }];

        _.each(users, (user) => {
            let id;
            id = Accounts.createUser({
                email: user.email,
                password: user.password,
                profile: {
                    name: user.name
                },
                roles: user.roles
            });
        });
    }
});