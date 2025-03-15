import styles from './editmodalwindow.module.css';

export const EditModalWindowLayout = ({
	editedTask,
	buttonActive,
	modalActive,
	setModalActive,
	onSubmit,
	editHandler,
	textAreaRef,
}) => {
	return (
		<div
			className={`${styles.modal} ${modalActive ? styles['modal-active'] : ''}`}
			onClick={() => setModalActive(false)}
		>
			<form
				className={styles['modal-content']}
				onSubmit={onSubmit}
				onClick={(event) => event.stopPropagation()}
			>
				<textarea
					ref={textAreaRef}
					name="edit"
					value={editedTask}
					placeholder="✎ Откорректируйте дело"
					onChange={editHandler}
				/>
				<div className={styles['button-container']}>
					<button type="submit" disabled={!buttonActive}>
						Принять
					</button>
					<button onClick={() => setModalActive(false)}>Отклонить</button>
				</div>
			</form>
		</div>
	);
};
