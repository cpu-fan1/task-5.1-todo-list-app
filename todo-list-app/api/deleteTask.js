export const deleteTask = (todos, id, setTodos, setPickedTask) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'DELETE',
	})
		.then(() => {
			setTodos(todos.filter((todo) => todo.id !== id));
			setPickedTask('');
		})
		.catch((error) => console.error('Ошибка при удалении:', error));
};
