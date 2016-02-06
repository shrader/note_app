
$.getScript('http://cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.js', function(data, textStatus){
	console.log(textStatus);
    // Create the tooltips only when document ready
    $(document).ready(function()
    {
        tinymce.init({
    selector: '#mytextarea'
  });
  
   $('#one').click(function(){
    console.log(tinyMCE.activeEditor.getContent());
   noteInfo = {
        title : "Title",
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







