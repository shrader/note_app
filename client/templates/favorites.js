Template.favorites.onCreated(function(){
	Meteor.subscribe('notes');
});

Template.favorites.helpers({
    favorite: function() {
            return Notes.find( { $and:
            [ { isFavorite: true }, 
            {$or :
            [ { isPublic: true }, 
            { author: Meteor.userId() } ]}  ] } );
        }
});        