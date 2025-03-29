import { useEffect, useState } from 'react';
import { todosAPI } from '../api';

export const useTodos = (initialState = []) => {
	const [todos, setTodos] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		readTodos();
	}, []);

	const readTodos = async () => {
		setIsLoading(true);
		try {
			const todos = await todosAPI.read();
			setTodos(todos);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const createTodo = async (title) => {
		if (!title.trim()) return;
		try {
			const newTodo = await todosAPI.create(title);
			setTodos((prevTodos) => [...prevTodos, newTodo]);
		} catch (error) {
			setError(error);
		}
	};

	const updateTodo = async (id, key) => {
		try {
			await todosAPI.update(id, key);
			if (typeof key === 'boolean') {
				setTodos((prevTodos) =>
					prevTodos.map((todo) =>
						todo.id === id ? { ...todo, completed: !todo.completed } : todo,
					),
				);
			} else if (typeof key === 'string') {
				setTodos((prevTodos) =>
					prevTodos.map((todo) =>
						todo.id === id ? { ...todo, title: key } : todo,
					),
				);
			}
		} catch (error) {
			setError(error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await todosAPI.delete(id);
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
		} catch (error) {
			setError(error);
		}
	};

	const filteredTodos = searchValue
		? todos.filter((todo) =>
				todo.title.toLowerCase().includes(searchValue.toLowerCase()),
			)
		: todos;

	const sortedTodos = isSorted
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return {
		todos: sortedTodos,
		setTodos,
		isLoading,
		setIsLoading,
		error,
		isSorted,
		setSearchValue,
		setIsSorted,
		createTodo,
		deleteTodo,
		updateTodo,
	};
};
