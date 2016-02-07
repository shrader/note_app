
$.getScript('http://cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.js', function(data, textStatus){
	console.log(textStatus);
    // Create the tooltips only when document ready
    $(document).ready(function()
    {
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
    selector: '#mytextarea',
     plugins: ['advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table contextmenu paste'],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media',
    media_live_embeds: true,
    browser_spellcheck: true
  });
  
  tinymce.init({
  selector: 'h3.edit',
  inline: true,
  toolbar: false,
  menubar: false
});

  
   $('#one').click(function(){
    console.log(tinyMCE.activeEditor.getContent()+$('#title').val());
   noteInfo = {
        title : $('#title').val(),
        content : tinyMCE.activeEditor.getContent()
    }; 
    Notes.insert( noteInfo);
    
 });

        // MAKE SURE YOUR SELECTOR MATCHES SOMETHING IN YOUR HTML!!!
        $('.owl').each(function() {
            $(this).qtip({
                content: {
                    text: function(event, api) {
                        $.ajax({
                            url: api.elements.target.attr('href') // Use href attribute as URL
                        })
                        .then(function(content) {
                            // Set the tooltip content upon successful retrieval
                            api.set('content.text', content);
                        }, function(xhr, status, error) {
                            // Upon failure... set the tooltip content to error
                            api.set('content.text', status + ': ' + error);
                        });
            
                        return 'Loading...'; // Set some initial text
                    }
                },
                position: {
                    viewport: $(window)
                },
                style: 'qtip-wiki'
            });
        });
    });
        
});







