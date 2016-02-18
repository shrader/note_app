if (Meteor.isClient) {
    Accounts.onLogout(function(){
        FlowRouter.go('home');
    });
}

FlowRouter.triggers.enter([function(context, redirect){
   if(!Meteor.userId()) {
       FlowRouter.go('home');
   } 
}]);

FlowRouter.route('/',{
	name: 'Notes',
	action() {
	BlazeLayout.render('MainLayout', {main: 'AllNotes'});
	}
});

FlowRouter.route('/note/:_id',{
	name: 'Note',
	action() {
	BlazeLayout.render('MainLayout', {main: 'NoteSingle'});
	}
});

FlowRouter.route('/home',{
	name: 'home',
	action() {
	BlazeLayout.render('MainLayout', {main: 'AllNotes'});
	}
});