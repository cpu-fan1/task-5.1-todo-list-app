export const deleteTaskButton = (todos, id, refreshTodos, setTodos) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'DELETE',
	})
		.then(() => {
			setTodos(todos.filter((todo) => todo.id !== id));
			refreshTodos();
		})
		.catch((error) => console.error('Ошибка при удалении:', error));
};
