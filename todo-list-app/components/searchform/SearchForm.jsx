import { SearchFormLayout } from './SearchFormLayout';

export const SearchForm = ({ setSearchValue, isSorted, setIsSorted }) => {
	const onSearchChange = (event) => {
		setSearchValue(event.target.value.toLowerCase());
	};

	const onSortClick = () => {
		setIsSorted((prevValue) => !prevValue);
	};

	const onSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<SearchFormLayout
			onSubmit={onSubmit}
			onSearchChange={onSearchChange}
			onSortClick={onSortClick}
			isSorted={isSorted}
		/>
	);
};
