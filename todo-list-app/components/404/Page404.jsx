import { Link } from 'react-router-dom';
import styles from './page404.module.css';

export const Page404 = () => {
	return (
		<div className={styles['page404']}>
			<h1>Такой страницы не существует😭</h1>
			<Link to="/" className={styles.link}>
				<button>Вернуться к списку</button>
			</Link>
		</div>
	);
};
