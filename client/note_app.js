    $(document).ready(function() {
  
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
  
   });
        
$(document).ready(function() {
   $('#one').click(function(){
    console.log(tinyMCE.activeEditor.getContent()+$('#title').val());
   noteInfo = {
        title : $('#title').val(),
        content : tinyMCE.activeEditor.getContent(),
        isFavorite: false,
        isPublic: false,
        author: Meteor.userId(),
        createdAt: new Date
    }; 
    Notes.insert( noteInfo);
    tinyMCE.activeEditor.setContent('');
    $('#title').val('');
    $('#squarespaceModal').modal('hide');
    
 });
}); 
