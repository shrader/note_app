
Template.eachNote.onRendered(function(){
		    
});


Template.eachNote.onCreated(function(){
	Meteor.subscribe('notes');
});

Template.eachNote.helpers({
	notes: function() {
		return Notes.find({});
	}
});



Template.eachNote.events = {	
	'click .trash' : function () {
		var sure = confirm("Are you sure you want to delete this note?");
		if (sure === true){
			Notes.remove(this._id);
		}
	}
};