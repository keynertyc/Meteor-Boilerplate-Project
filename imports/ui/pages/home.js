import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '/imports/ui/components/banner.html';
import '/imports/ui/pages/home.html';


Template.home.events({
    'click .btn-started' (event, template) {
        swal("Good job!", "You clicked the button!", "success");
    }
});