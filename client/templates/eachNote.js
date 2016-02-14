
Template.eachNote.onRendered(function(){
		
//edit and delete buttons hidden by default	
    $('.noteBtns').hide();	
		
//  only show edit and delete buttons when hovering on that note 
    $(document).on('mouseenter', '.notes', function () {
        $(this).find(".noteBtns").show();
    }).on('mouseleave', '.notes', function () {
        $(this).find(".noteBtns").hide();
   		 });
    
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