/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
import _ from 'underscore';
import Todo from '../new/Todo'
import React from 'react'
import ReactDom from 'react-dom'

var app = window.app || {};


// Todo Item View
// --------------

// The DOM element for a todo item...
app.TodoView = Backbone.View.extend({
	tagName:  'li',

	// The DOM events specific to an item.
	events: {
		'click .toggle': 'toggleCompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
	},

	// The TodoView listens for changes to its model, re-rendering. Since
	// there's a one-to-one correspondence between a **Todo** and a
	// **TodoView** in this app, we set a direct reference on the model for
	// convenience.
	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	// Re-render the titles of the todo item.
	render: function () {
		// Backbone LocalStorage is adding `id` attribute instantly after
		// creating a model.  This causes our TodoView to render twice. Once
		// after creating a model and once on `id` change.  We want to
		// filter out the second redundant render, which is caused by this
		// `id` change.  It's known Backbone LocalStorage bug, therefore
		// we've to create a workaround.
		// https://github.com/tastejs/todomvc/issues/469
		if (this.model.changed.id !== undefined) {
			return;
		}

		ReactDom.render(
			<Todo 
				save={(val) => this.save(val)}
				revert={() => this.revert()} 
				completed={this.model.attributes.completed} 
				title={this.model.attributes.title} 
			/>, 
			this.$el[0],
		)

		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();
		this.$input = this.$('.edit');
		return this;
	},

	toggleVisible: function () {
		this.$el.toggleClass('hidden', this.isHidden());
	},

	isHidden: function () {
		return this.model.get('completed') ?
			app.TodoFilter === 'active' :
			app.TodoFilter === 'completed';
	},

	// Toggle the `"completed"` state of the model.
	toggleCompleted: function () {
		this.model.toggle();
	},

	// Switch this view into `"editing"` mode, displaying the input field.
	edit: function () {
		var textLength = this.$input.val().length;
		this.$el.addClass('editing');
		this.$input.focus();
		this.$input[0].setSelectionRange(textLength, textLength);
	},

	// Close the `"editing"` mode, saving changes to the todo.
	save: function (value) {
		var trimmedValue = value.trim();

		// We don't want to handle blur events from an item that is no
		// longer being edited. Relying on the CSS class here has the
		// benefit of us not having to maintain state in the DOM and the
		// JavaScript logic.
		if (!this.$el.hasClass('editing')) {
			return;
		}

		if (value) {
			this.model.save({ title: trimmedValue });
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	// If you're pressing `escape` we revert your change by simply leaving
	// the `editing` state.
	revert: function (e) {
		this.$el.removeClass('editing');
		// Also reset the hidden input back to the original value.
		this.$input.val(this.model.get('title'));
	},

	// Remove the item, destroy the model from *localStorage* and delete its view.
	clear: function () {
		this.model.destroy();
	}
});
