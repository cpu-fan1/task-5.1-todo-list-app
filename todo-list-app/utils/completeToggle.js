export const completeToggle = (todos, id, title, completed, setTodos, refreshTodos) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: title,
			completed: !completed,
		}),
	})
		.then(() => {
			setTodos(
				todos.map((todo) =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo,
				),
			);
			refreshTodos();
		})
		.catch((error) => console.error('Ошибка при удалении:', error));
	// return todos.map((todo) =>
	// 	todo.id === id ? { ...todo, completed: !todo.completed } : todo,
	// );
};
