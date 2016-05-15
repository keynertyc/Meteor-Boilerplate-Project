import { Meteor } from 'meteor/meteor';

Router.configure({
    layoutTemplate: 'default'
    //notFoundTemplate: '404'
    //loadingTemplate: 'loading',
});

const onBeforeActions = {
    isAuthenticated () {
        if (Meteor.userId()) {
            this.next();
        } else {
            Router.go('/signin');
        }
    },
    isAuthorizedToEditUser () {
        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            this.next();
        } else if (Roles.userIsInRole(Meteor.userId(), ['user']) && Meteor.userId() == this.params._id) {
            this.next();
        } else {
            Router.go('/signin');
        }
    },
    onlyAdmin () {
        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            this.next();
        } else {
            Router.go('/dashboard');
        }
    },
    alreadyLogged () {
        if (Meteor.userId()) {
            Router.go('/dashboard');
        } else {
            this.next();
        }
    }
}

Router.onBeforeAction(onBeforeActions.isAuthenticated, {
    only: ['dashboard']
});

Router.onBeforeAction(onBeforeActions.onlyAdmin, {
    only: ['users_list','users_add']
});

Router.onBeforeAction(onBeforeActions.isAuthorizedToEditUser, {
    only: ['users_edit']
});

Router.onBeforeAction(onBeforeActions.alreadyLogged, {
    only: ['signin','signup']
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'home'
    });
    this.route('signin', {
        path: '/signin',
        template: 'signin'
    });
    this.route('signup', {
        path: '/signup',
        template: 'signup'
    });
    this.route('forgot_password', {
        path: '/forgot-password',
        template: 'forgot_password'
    });
    this.route('dashboard', {
        path: '/dashboard',
        layoutTemplate: 'panel',
        template: 'dashboard'
    });
    this.route('users_add', {
        path: '/users/new',
        layoutTemplate: 'panel',
        template: 'users_add',
        data () {
            templateData = {
                roles: Meteor.roles.find({}, {sort: {name: -1}})
            }
            return templateData;
        }
    });
    this.route('users_edit', {
        path: '/users/edit/:_id',
        layoutTemplate: 'panel',
        template: 'users_edit',
        data () {
            templateData = {
                user: Meteor.users.findOne({_id: this.params._id}),
                roles: Meteor.roles.find({}, {sort: {name: -1}})
            };
            return templateData;
        }
    });
    this.route('users_list', {
        path: '/users',
        layoutTemplate: 'panel',
        template: 'users_list',
        data () {
            templateData = {
                users: Meteor.users.find({}, {sort: {createdAt: -1}})
            }
            return templateData;
        }
    });
});