/*global $ */
/*jshint unused:false */
import './views/todo-view'
import AppView from './views/app-view'
import './routers/router'

window.ENTER_KEY = 13;

$(function () {
	'use strict';

	// kick things off by creating the `App`
	new AppView();
});
