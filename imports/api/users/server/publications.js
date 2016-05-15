import { Meteor } from 'meteor/meteor';

Meteor.publish('users.list', () => {
   return Meteor.users.find({}, {fields: {createdAt: true, profile: true, emails: true, roles: true, isLoggedIn: true}});
});

Meteor.publish('users.roles', function (){
   return Meteor.roles.find();
})