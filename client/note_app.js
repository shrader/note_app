Modal.allowMultiple = true;

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
    
     Modal.allowMultiple = true;
    
    $(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window, .moxman-window").length) {
		e.stopImmediatePropagation();
	}
    });
    
    $(".tooltip").drags();
    $(".modal-dialog").drags();
  
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


var makeDraggable = (function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
                $(window).one('mouseup', function(e) {
                    if (opt.handle === '') {
                        $drag.removeClass('draggable');
                    } else {
                        $drag.removeClass('active-handle').parent().removeClass('draggable');
                    }
                    $(window).unbind('mouseup');
                    $drag.parents().unbind('mousemove');
                });
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);
