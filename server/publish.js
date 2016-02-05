Meteor.publish('notes', function(){
	return Notes.find({author: this.userId});
})