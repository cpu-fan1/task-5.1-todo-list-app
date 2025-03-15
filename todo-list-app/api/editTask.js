export const editTask = (newTitle, todos, id, completed, setTodos, refreshTodos) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: newTitle,
			completed: completed,
		}),
	})
		.then(() => {
			setTodos(
				todos.map((todo) =>
					todo.id === id ? { ...todo, title: newTitle } : todo,
				),
			);
			refreshTodos();
		})
		.catch((error) => console.error('Ошибка при удалении:', error));
};
