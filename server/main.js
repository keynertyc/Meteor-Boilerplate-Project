import { Meteor } from 'meteor/meteor';

import '/imports/startup/server/social-config.js';
import '/imports/startup/server/accounts-config.js';
import '/imports/startup/server/avatar.js';
import '/imports/startup/server/user.js';

import '/imports/api/users/methods.js';

import '/imports/api/users/server/publications.js';

Meteor.startup(() => {
    // code to run on server at startup
    process.env.MAIL_URL = "smtp://55250341c5357ffd9:51e9a247cf5b7d@mailtrap.io:2525/";
    process.env.MAIL_FROM = "me@keynertyc.com";

    //console.log(Meteor.roles.find().fetch());
});