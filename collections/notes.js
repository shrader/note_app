Notes = new Mongo.Collection('notes');

Notes.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function() { return true; },
	remove: function() {return true;}
	
	
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
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	isPublic: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function() {
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			if ( this.isInsert ) {
        return new Date;
		}},
		autoform: {
			type: "hidden"
		}
	},
	 updated: {
    type: Date,
    label: "Updated",
    autoValue: function() {
      if ( this.isUpdate ) {
        return new Date;
      }},
	  autoform: {
			type: "hidden"
		} 
}});

Notes.attachSchema( NotesSchema );

*/