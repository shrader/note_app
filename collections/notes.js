Notes = new Mongo.Collection('notes');

Notes.allow({
	insert: function(userId, doc) {
		return !!userId;
	}
});

/*
NotesSchema = new SimpleSchema({
	title:{
		type: String,
		label: "Note Title"
	},
	content:{
		type: String,
		label: "Note Content"
	},
	isFavorite: {
		type: Boolean,
		defaultValue: false,
		optional: true
	},
	isPublic: {
		type: Boolean,
		defaultValue: false,
		optional: true
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function() {
			return this.userId
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			if ( this.isInsert ) {
        return new Date;
		}}
	},
	 updated: {
    type: Date,
    label: "Updated",
    autoValue: function() {
      if ( this.isUpdate ) {
        return new Date;
      }} 
}});

Notes.attachSchema( NotesSchema );
*/

