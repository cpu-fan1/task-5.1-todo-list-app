export const deleteTask = (todos, id, setTodos) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'DELETE',
	})
		.then(() => {
			setTodos(todos.filter((todo) => todo.id !== id));
		})
		.catch((error) => console.error('Ошибка при удалении:', error));
};
