const initialState = {
	inputValue: '',
	buttonActive: false,
	searchValue: '',
	isSorted: false,
};

export const controlPanelReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_INPUT_VALUE': {
			const isActive = payload.trim().length > 0;
			return { ...state, inputValue: payload, buttonActive: isActive };
		}
		case 'SET_SEARCH_VALUE':
			return { ...state, searchValue: payload };
		case 'IS_SORTED':
			return { ...state, isSorted: state.isSorted === false ? true : false };
		case 'EMPTY_INPUT_VALUE':
			return initialState;
		default:
			return state;
	}
};
