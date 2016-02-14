var oldContent, theTitle, noteId, title;

//open modal, set variables while this is = to the note object
//then set the old note title as text in the title input
Template.note.events({
  'click .modalBtn': function(event, template) {
   Modal.show('note');
   console.log(this);
   oldContent = this.content;
   theTitle = this.title;
   noteId = this._id;
   $(".titleInput").val(theTitle);
       tinymce.init({
    selector: '.mytextarea',
     plugins: ['advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table contextmenu paste'],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
    media_live_embeds: true,
    browser_spellcheck: true
    });
  },
  
  'shown.bs.modal #EditModal': function () {
      console.log("this worked");
      $(document).ready(function() {
  
    
//to fix the issue of TinyMCE modals not being editable like when adding
// a video or looking at code view
    $(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window, .moxman-window").length) {
		e.stopImmediatePropagation();
	}
    });
    
    tinyMCE.activeEditor.setContent(oldContent);
   });      
  },
  
//Because of the way this works, if you change note.html it will
//most likely break it (hard coded workaround because normal mthods werent working)
  'click .two': function(event, template) {
     var content = tinyMCE.activeEditor.getContent();
     var short = event.target.parentNode.parentNode.parentNode.parentNode;
     var shorter = short.firstChild.nextSibling.nextSibling.nextSibling;
     var shortest = shorter.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling;
     Notes.update({
		_id: noteId
		}, {
		$set: { content: content,
		title: $(shortest).val(),
		updated: new Date
		}
		});
        console.log("note updated");
        console.log($(shortest).val());
        console.log(shortest.outerHTML);
        console.log(shortest.innerHTML);
        $( ".titleInput" ).each(function( index ) {
  console.log( index + ": " + $( this ).val() );
});
        Modal.hide('note');
  }
});

/* $(document).ready(function() {
  
         tinymce.init({
    selector: '.mytextarea',
     plugins: ['advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table contextmenu paste'],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
    media_live_embeds: true,
    browser_spellcheck: true
    });
    
    
    $(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window, .moxman-window").length) {
		e.stopImmediatePropagation();
	}
    });
    
    
  
   }); */
   