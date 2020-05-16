import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from '../Login/Login';

export const Router = () => <BrowserRouter>
	<Route
		path='/'
		render={
			() => <Login />
		}
	/>
</BrowserRouter>

Router.displayName = 'Router';
