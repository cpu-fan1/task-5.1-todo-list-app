import { useState, useEffect } from 'react';
import { AppLayout } from './AppLayout';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

function App() {
	const [todos, setTodos] = useState({});
	const [task, setTask] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [initialTodos, setInitialTodos] = useState({});

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};
			setTodos(loadedTodos);
			setInitialTodos(loadedTodos);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		const debounce = setTimeout(() => {
			// Преобразуем объект todos в массив для фильтрации и сортировки
			let todosArray = Object.entries(todos);

			// Фильтрация по строке поиска
			if (searchValue) {
				todosArray = todosArray.filter(([id, todo]) =>
					todo.title.toLowerCase().includes(searchValue.toLowerCase()),
				);
			}

			// Сортировка по алфавиту
			if (isSorted) {
				todosArray = todosArray.sort(([, a], [, b]) =>
					a.title.localeCompare(b.title),
				);
			}

			// Преобразуем обратно в объект и обновляем состояние
			setTodos(Object.fromEntries(todosArray));
		}, 500);

		return () => clearTimeout(debounce);
	}, [searchValue, isSorted, todos]);

	useEffect(() => {
		if (searchValue === '') {
			setTodos(initialTodos);
		}
	}, [searchValue, initialTodos]);

	return (
		<AppLayout
			todos={todos}
			isLoading={isLoading}
			task={task}
			setTask={setTask}
			setSearchValue={setSearchValue}
			isSorted={isSorted}
			setIsSorted={setIsSorted}
		/>
	);
}
export default App;
