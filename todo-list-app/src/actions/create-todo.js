import { todosAPI } from '../api';

export const createTodo = (title) => async (dispatch) => {
	if (!title.trim()) return;
	try {
		const newTodo = await todosAPI.create(title);
		dispatch({ type: 'ADD_TODO', payload: newTodo });
	} catch (error) {
		dispatch({ type: 'TODOS_ERROR', payload: error });
	}
};
