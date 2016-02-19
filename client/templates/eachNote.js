
Template.eachNote.onRendered(function(){
		    
});


Template.eachNote.onCreated(function(){
	Meteor.subscribe('notes');
});

Template.eachNote.helpers({
	notes: function() {
		return Notes.find( { $or:
         [ { isPublic: true }, 
         { author: Meteor.userId() } ] } );
	}
});
