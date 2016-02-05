$.getScript('http://cdn.jsdelivr.net/qtip2/2.2.1/jquery.qtip.min.js', function(data, textStatus){
	console.log(textStatus);
    // Create the tooltips only when document ready
    $(document).ready(function()
    {
        $('#summernote').summernote();
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




Template.noteForm.events({
    'click .save-btn': function (event, template) {
       noteInfo = {
          title: $('.note-title').val(),
          content: $('#summernote').val(),
          isFavorite: false,
          isPublic: false,
          author: this.userId,
          createdAt: new Date
      };
      
   Notes.insert(Meteor.userId(), noteInfo);   
   
   alert("Note Saved.");
    }
   
});