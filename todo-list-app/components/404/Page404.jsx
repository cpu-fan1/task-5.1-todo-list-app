import { NavLink } from 'react-router-dom';
import styles from './page404.module.css';

export const Page404 = () => {
	return (
		<div className={styles['page404']}>
			<h1>Такой страницы не существует😭</h1>
			<NavLink to="/" className={styles.link}>
				<button>Вернуться к списку</button>
			</NavLink>
		</div>
	);
};
