import { todosAPI } from '../api';

export const updateTodo = (id, key) => async (dispatch) => {
	try {
		await todosAPI.update(id, key);
		if (typeof key === 'boolean') {
			dispatch({ type: 'UPDATE_COMPLETED', payload: { id } });
		} else if (typeof key === 'string') {
			dispatch({ type: 'UPDATE_TITLE', payload: { id, key } });
		}
	} catch (error) {
		dispatch({ type: 'TODOS_ERROR', payload: error });
	}
};
