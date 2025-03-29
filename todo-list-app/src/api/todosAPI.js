import config from '../config.json';

const TODOS_ENDPOINT = 'todos/';

export const todosAPI = {
	create: async (title) => {
		const response = await fetch(config.BASE_URL + TODOS_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: title,
				completed: false,
			}),
		});
		return response.json();
	},
	read: async () => {
		const response = await fetch(config.BASE_URL + TODOS_ENDPOINT);
		return await response.json();
	},
	update: async (id, key) => {
		let body = {};

		if (typeof key === 'boolean') {
			body.completed = !key;
		} else if (typeof key === 'string') {
			body.title = key;
		}

		const response = await fetch(`${config.BASE_URL}${TODOS_ENDPOINT}${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(body),
		});
		return response.json();
	},
	delete: async (id) => {
		const response = await fetch(`${config.BASE_URL}${TODOS_ENDPOINT}${id}`, {
			method: 'DELETE',
		});
		return response.json();
	},
};
