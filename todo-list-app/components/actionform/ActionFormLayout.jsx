import styles from './actionForm.module.css';

export const ActionFormLayout = ({ task, onSubmit, taskHandler, buttonActive }) => {
	return (
		<form onSubmit={onSubmit}>
			<input
				type="text"
				name="task"
				value={task}
				placeholder="Введите задачу"
				onChange={taskHandler}
			/>
			<button type="submit" disabled={!buttonActive}>
				Добавить задачу
			</button>
		</form>
	);
};
