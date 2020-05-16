import { SerializableCharacter } from "../core/Character";

export const getDeepProperty = (obj: object, path: (string | number)[]) => {
	const propName = path.shift();
	if (path.length === 0) {
		return obj[propName];
	} else {
		return getDeepProperty(obj[propName], path);
	}
}

export const setDeepProperty = (obj: object, path: (string | number)[], value: any) => {
	const propName = path.shift();
	if (path.length === 0) {
		obj[propName] = value;
	} else {
		if (!obj.hasOwnProperty(propName)) {
			obj[propName] = typeof path[0] === 'number' ? [] : {};
		}
		setDeepProperty(obj[propName], path, value);
	}
}

export const getDeepProxy = (game, path = []) => {
	const getDeepProxyHandler = () => ({
		get: (target, key) => {
			console.log("#### : getDeepProxy -> key", key);
			path.push(key)
			console.log("-- get: getDeepProxy -> path", ...path);
			const value = getDeepProperty(game, [...path]);
			console.log("-- get: getDeepProxy ->", key, value);
			if (typeof value === 'object') {
				// return getDeepProxy(value, []);
				return new Proxy({}, getDeepProxyHandler());
			} else {
				path = [];
				return value
			}
		},
		set: (target, key, value) => {
			console.log("== set: getDeepProxy -> path", ...path);
			path.push(key)
			setDeepProperty(game, path, value);
			path = [];
			return true;
		}
	})
	return new Proxy({}, getDeepProxyHandler());
}

export const defaults: {
	character: SerializableCharacter,
} = {
	character: {
		name: 'name',
		team: 'player',
		movement: 0
	}
}
