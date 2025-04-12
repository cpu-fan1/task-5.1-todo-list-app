const initialState = {
	editingValue: '',
	editingId: null,
};

export const editingReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'START_EDITING':
			return { ...state, editingId: payload.id, editingValue: payload.title };
		case 'SET_EDITING_VALUE': {
			return { ...state, editingValue: payload };
		}
		case 'EDITING_FINISHED':
			return initialState;
		default:
			return state;
	}
};
