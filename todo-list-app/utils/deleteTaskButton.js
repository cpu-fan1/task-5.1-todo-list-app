import { db } from '../src/firebase';
import { ref, remove } from 'firebase/database';

export const deleteTaskButton = (id) => {
	const deleteTaskRef = ref(db, `todos/${id}`);
	remove(deleteTaskRef).catch((error) => console.error('Ошибка при удалении:', error));
};
