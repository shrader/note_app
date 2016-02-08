Meteor.subscribe('notes');

Template.eachNote.helpers({
	notes: function() {
		return Notes.find({});
	}
});