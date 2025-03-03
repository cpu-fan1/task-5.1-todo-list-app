import styles from './app.module.css';

export const AppLayout = ({ todos, isLoading }) => {
	return (
		<>
			<div className={styles.app}>
				<h1>Cписок дел</h1>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<ul>
						{todos.map(({ id, userId, title, completed }) => (
							<li
								key={id}
								className={completed ? `${styles.completed}` : ''}
							>
								<p>{userId}</p>
								<p>{title}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};
