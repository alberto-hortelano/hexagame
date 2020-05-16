import * as React from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => <ul className="menu">
	<li>
		<Link to="/demo">Demo</Link>
	</li>
	<li>
		<Link to="/log-in">Log in</Link>
	</li>
	<li>
		<Link to="/register">Register</Link>
	</li>
</ul>

Menu.displayName = 'Menu';
