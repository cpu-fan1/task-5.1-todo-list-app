const initialState = {
	todos: [],
	loading: false,
	error: null,
};

export const todosReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'TODOS_LOADING':
			return { ...state, loading: true, error: null };
		case 'READ_TODOS':
			return { ...state, loading: false, todos: payload };
		case 'TODOS_ERROR':
			return { ...state, loading: false, error: payload };
		case 'ADD_TODO':
			return { ...state, todos: [...state.todos, payload] };
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== payload),
			};
		case 'UPDATE_COMPLETED':
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === payload.id
						? { ...todo, completed: !todo.completed }
						: todo,
				),
			};
		case 'UPDATE_TITLE':
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === payload.id ? { ...todo, title: payload.key } : todo,
				),
			};
		default:
			return state;
	}
};
