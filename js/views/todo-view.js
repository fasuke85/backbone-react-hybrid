/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
import Todo from '../new/Todo'
import React from 'react'
import ReactDom from 'react-dom'

var app = window.app || {};

app.TodoView = Backbone.View.extend({
	tagName:  'li',

	// The TodoView listens for changes to its model, re-rendering. Since
	// there's a one-to-one correspondence between a **Todo** and a
	// **TodoView** in this app, we set a direct reference on the model for
	// convenience.
	initialize: function () {
		this.listenTo(this.model, 'destroy', () => this.remove());
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
				update={(title) => this.model.save({ title })}
				toggle={() => this.model.toggle()} 
				clear={() => this.model.destroy()}
				isHidden={() => this.isHidden()}
				model={this.model}
			/>, 
			this.$el[0],
		)

		return this;
	},
	remove() {
		ReactDom.unmountComponentAtNode(this.$el[0]);
		Backbone.View.prototype.remove.call(this);
	},

	isHidden: function () {
		return this.model.get('completed') ?
			app.TodoFilter === 'active' :
			app.TodoFilter === 'completed';
	},
});
