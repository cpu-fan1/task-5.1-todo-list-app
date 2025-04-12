import { todosAPI } from '../api';

export const readTodos = () => async (dispatch) => {
	dispatch({ type: 'TODOS_LOADING' });
	try {
		const data = await todosAPI.read();
		dispatch({ type: 'READ_TODOS', payload: data });
	} catch (error) {
		dispatch({ type: 'TODOS_ERROR', payload: error });
	}
};
