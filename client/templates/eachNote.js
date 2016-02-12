
Template.eachNote.onRendered(function(){
	$(document).ready(function() {
		tinymce.init({
		selector: '.mce',
		plugins: ['advlist autolink lists link image charmap print preview anchor',
		'searchreplace visualblocks code fullscreen',
		'insertdatetime media table contextmenu paste'],
		toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
		media_live_embeds: true,
		browser_spellcheck: true,
		inline: true
		});
	
		tinymce.init({
		selector: 'h3.edit, .titleInput',
		inline: true,
		toolbar: false,
		menubar: false
		});
		
	$('.noteBtns').hide();	
		
    $(document).on('mouseenter', '.notes', function () {
        $(this).find(".noteBtns").show();
    }).on('mouseleave', '.notes', function () {
        $(this).find(".noteBtns").hide();
   		 });
	});
    

       
  /*  $('#EditModal').on('shown.bs.modal', function () {
    console.log("this worked");
    var article = event.target.parentNode.parentNode;	
    var title = article.firstChild.nextSibling.innerHTML;
    $("#title").val(article.firstChild.nextSibling.innerHTML); 
    }); */
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
/*	'click .editBtn' : function () {
		var article = event.target.parentNode.parentNode;	
		var title = article.firstChild.nextSibling.innerHTML;
		var newContent = article.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
	//	tinyMCE.get('.my-edit-area').setContent(this.content);
    //    Dom.get("title").set("value",this.title);
        Notes.update({
		_id: this._id
		}, {
		$set: { content: newContent,
		title: title,
		updated: new Date
		}
		});  
		console.log(this);
	}, */
	
	'click .trash' : function () {
		var sure = confirm("Are you sure you want to delete this note?");
		if (sure === true){
			Notes.remove(this._id);
		}
	}
};