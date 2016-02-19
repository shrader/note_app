Notes = new Mongo.Collection('notes');

Notes.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
         return !!userId; 
         },
	remove: function(userId, doc) {
         return !!userId; 
         }
         
});

Meteor.methods({
    toggleisPublic: function(id, currentState) {
        Notes.update( id, {
          $set:{
              isPublic: !currentState
          }  
        });
    },
    
   toggleisFavorite: function(id, currentState) {
        Notes.update( id, {
          $set:{
              isFavorite: !currentState
          }  
        });
    } 
});

