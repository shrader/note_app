Meteor.subscribe('notes');

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
		selector: 'h3.edit',
		inline: true,
		toolbar: false,
		menubar: false
		});
	});
});

Template.eachNote.helpers({
	notes: function() {
		return Notes.find({});
	}
});