import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '/imports/startup/client/routes.js';
import '/imports/startup/client/accouns-ui-config.js';
import '/imports/startup/client/avatar.js';

import '/imports/ui/layouts/default.js';
import '/imports/ui/layouts/panel.js';

Template.body.onCreated(() => {
    Meteor.subscribe('users.list');
    Meteor.subscribe('users.roles');
});

Template.body.onRendered(() => {
    $('.tooltipped').tooltip('remove');
});

Template.body.events({
    'click .link-sign-out' () {
        const id = Meteor.userId();
        Meteor.logout((error) => {
            if (!error) {
                Meteor.call('users.change_loggedin', id);
                Router.go('/');
            }
        });
    }
});

Template.header.onRendered(() => {
    $('.button-collapse').sideNav({
        closeOnClick: true
    });
});

Template.registerHelper('formatDate', (date) => {
    return moment(date).format('Do MMMM YYYY, h:mm:ss a');
});

Template.registerHelper('myself', (id) => {
    return Meteor.userId() === id;
});

Template.registerHelper('selectedOption', (arg1, arg2) => {
    if (arg1 === arg2) {
        return 'selected';
    }
    return '';
});

Template.registerHelper('parentData', () => {
    return Template.parentData(1);
});

Template.registerHelper('capitalizeFirstLetter', (string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
});

Template.registerHelper('capitalizeFirstLetterWords', (string) => {
    return string.replace(/\w\S*/g, (tStr) => {
        return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase();
    });
});

//Template.hello.onCreated(function helloOnCreated() {
//  // counter starts at 0
//  this.counter = new ReactiveVar(0);
//});
//
//Template.hello.helpers({
//  counter() {
//    return Template.instance().counter.get();
//  },
//});
//
//Template.hello.events({
//  'click button'(event, instance) {
//    // increment the counter when button is clicked
//    instance.counter.set(instance.counter.get() + 1);
//  },
//});
