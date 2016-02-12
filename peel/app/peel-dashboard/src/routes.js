import router  from 'koa-router';
import React from 'react';
import ReactDOM  from 'react-dom/server';
import ExampleContainer from './js/components/containers/ExampleContainer/ExampleContainer';

import request from 'koa-request';
import fetch from 'node-fetch';
import message from './messages';
import FormData from 'form-data';
const Router = router();

//Router
//	.use(session())
//	.use(authorize());

Router.get('/holi', function *(next) {
	var options = {
		url: 'http://laravel-oauth-server.app/api/users',
		formData: { 'client_secret': 'secret' },
		method: 'POST'
	};
	console.log(options);
	var response = yield request(options);
	console.log('hola :)');
	console.log(response.body);
	this.body = response.body;

});

Router.get('/auth', function *(ctx, next) {
	var options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: '{"name":"Edgar","password":"Secret"}'
	};
	const fetch_users = fetch('http://junior.app:8080/api/authenticate', options).then(res => {
		return res.json();
	});

	const result = yield fetch_users.then(user => {
		return user;

	});
	//sessionStorage.setItem('token', result.token);
	
	this.body = result;
	console.log(result);
	console.log(result.token);
	
	
	//this.body = fetch_res;
	//console.log(options);
	//var response = yield request(options); //Yay, HTTP requests with no callbacks! 
	//console.log(response.body);
	//this.cookies.set('mycookie1', 'value1', options);
	//var info = JSON.parse(response.body);

});

Router.get('/single', function *(next) {
	var options = {
		url: 'http://laravel-oauth-server.app/api/users/1',
		formData: {	'client_secret': 'secret' },
		method: 'POST'
	};
	var response = yield request(options); //Yay, HTTP requests with no callbacks! 
	//this.cookies.set('mycookie1', 'value1', options);
	var info = JSON.parse(response.body);
	console.log(info);
	this.body = info;
});

Router.get('/networks/:id', function *(next) {
	console.log(this.params.id);
	yield this.render('network', {
		title: `Network ${this.params.id}`,
		react: ReactDOM.renderToString(<ExampleContainer />)
	});
});

module.exports = Router;