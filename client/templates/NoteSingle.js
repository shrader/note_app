Template.NoteSingle.onCreated(function(){
	var self = this;
    self.autorun(function(){
        self.subscribe('notes');
    });
});

Template.NoteSingle.helpers({
	notes: function() {
        var id = FlowRouter.getParam('_id');
		return Notes.findOne({_id: id});
	}
});
