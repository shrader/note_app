

Template.NoteSingle.helpers({
	notes: function() {
        var id = FlowRouter.getParam('_id');
		thisNote = Notes.findOne({_id: id});
        optionBtn = id + "x";
        return thisNote;
	},
    tips: function() {
		return Notes.find( { $or:
         [ { isPublic: true }, 
         { author: Meteor.userId() } ] } );
	}
});

var oldContent, theTitle, noteId, title, newThis,
 clipboard, target, thisNote, optionBtn, tipNote, tipFunc;
 

 
 
//open modal, set variables while this is = to the note object
//then set the old note title as text in the title input
Template.NoteSingle.events({
  'click .modalBtn': function(event, template) {
   Modal.show('note');
   console.log(thisNote);
   oldContent = thisNote.content;
   theTitle = thisNote.title;
   noteId = thisNote._id;
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
    tinyMCE.activeEditor.setContent(oldContent);
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
   });      
  },
  
//Because of the way this works, if you change note.html it will
//most likely break it (hard coded workaround because normal mthods werent working)
  'click .two': function(event, template) {
     var content = tinyMCE.activeEditor.getContent();
     var short = event.target.parentNode.parentNode.parentNode.parentNode;
     var shorter = short.firstChild.nextSibling.nextSibling.nextSibling;
     var shortest = shorter.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling;
  /*   Notes.update({
		_id: noteId
		}, {
		$set: { content: content,
		title: $(shortest).val(),
		updated: new Date
		}
		}); */
        console.log("note updated");
        console.log($(shortest).val());
        console.log(shortest.outerHTML);
        console.log(shortest.innerHTML);
        $( ".titleInput" ).each(function( index ) {
  //console.log( index + ": " + $( this ).val() );
});
        Modal.hide('note');
  },
  
  'click .close-tooltip': function(event) {
      event.preventDefault();
      Tooltips.hide();
  },
  
  
  
  'click .open-tooltip': function(event) {
     event.preventDefault();
     var tipId = $(event.target).attr("data-tooltip-element");
     console.log(tipId);
     tipNote =tipId.substr(1);
     console.log(tipNote);
  },
  
  'click .toolbar-button': function() {
      Tooltips.hide();
  },
  
  'click .option-button': function() {
      
      console.log(thisNote);
      target = event.target;
       if (thisNote.isPublic === true) {
          $(".make-public").hide();
          $(".make-private").show();
      }
      else {
          $(".make-public").show();
          $(".make-private").hide();
      }
       if (thisNote.isFavorite === true) {
          $(".make-favorite").hide();
          $(".unfavorite").show();
      }
      else {
          $(".make-favorite").show();
          $(".unfavorite").hide();
      }
  },
  
  'click .note-copy': function() {
      var x = $(target).find(".open-tooltip");
      var y = x.context.offsetParent;
      var z = $(y).find("a.open-tooltip")[0].outerHTML;
      console.log(z);
  },
  
  'click .toggle-public': function() {
      Meteor.call('toggleisPublic', thisNote._id, thisNote.isPublic);
  },
  
  'click .toggle-favorite': function() {
      Meteor.call('toggleisFavorite', thisNote._id, thisNote.isFavorite);
  },
  
  'click .trash' : function () {
		var sure = confirm("Are you sure you want to delete this note?");
		if (sure === true && thisNote.author=== Meteor.userId()) {
			Notes.remove(thisNote._id);
		}
        else if (thisNote.author !== Meteor.userId()) {
            alert("Only the author can delete this note.");           
        }
	}
  
});

Template.NoteSingle.onRendered(function () {

    makeDraggable;
    otherDraggable;

    $(".editModal").drags();
    $(".tooltip").draggable();
    
    // Find all YouTube videos
        var $allVideos = $("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com']"),
            // The element that is fluid width
            $fluidEl = $(".notes");

        // Figure out and save aspect ratio for each video
        $allVideos.each(function() {
        $(this)
            .data('aspectRatio', this.height / this.width)
            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');
        });

        // When the window is resized
        $(window).resize(function() {
        var newWidth = $fluidEl.width();
        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {
            var $el = $(this);
            $el
            .width(newWidth)
            .height(newWidth * $el.data('aspectRatio'));
        });
        // Kick off one resize to fix all videos on page load
        }).resize();
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

var otherDraggable = (function($) {
    $.fn.draggable = function(options) {
        var $handle = this,
            $draggable = this;
        
        options = $.extend({}, {
            handle: null,
            cursor: 'move'
        }, options);

        if( options.handle ) {
            $handle = $(options.handle);
        }

        $handle
            .css('cursor', options.cursor)
            .on("mousedown", function(e) {
                var x = $draggable.offset().left - e.pageX,
                    y = $draggable.offset().top - e.pageY,
                    z = $draggable.css('z-index');
                
                $draggable.css('z-index', 100000);
                
                $(document.documentElement)
                    .on('mousemove.draggable', function(e) {
                        $draggable.offset({
                            left: x + e.pageX,
                            top: y + e.pageY
                        });
                    })
                    .one('mouseup', function() {
                        $(this).off('mousemove.draggable');
                        $draggable.css('z-index', z);
                    });

                // disable selection
                e.preventDefault();
            });
    };
})(jQuery);

