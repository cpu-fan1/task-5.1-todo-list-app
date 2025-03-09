import { db } from '../src/firebase';
import { ref, set } from 'firebase/database';

export const completeToggle = (id, title, completed) => {
	const completeDbRef = ref(db, `todos/${id}`);

	set(completeDbRef, {
		title: title,
		completed: !completed,
	}).catch((error) => console.error('Ошибка при удалении:', error));
};
