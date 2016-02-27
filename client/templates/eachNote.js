
Template.eachNote.onRendered(function(){
		    
});


Template.eachNote.onCreated(function(){

    
        });

Template.eachNote.helpers({
	notes: function() {
		return Notes.find( { $or:
         [ { isPublic: true }, 
         { author: Meteor.userId() } ] } );
	}
});
