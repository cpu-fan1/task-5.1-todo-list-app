import { todosAPI } from '../api';

export const deleteTodo = (id) => async (dispatch) => {
	try {
		await todosAPI.delete(id);
		dispatch({ type: 'DELETE_TODO', payload: id });
	} catch (error) {
		dispatch({ type: 'TODOS_ERROR', payload: error });
	}
};
