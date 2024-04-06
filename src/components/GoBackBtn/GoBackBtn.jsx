import styles from './GoBackBtn.module.css';
import { Link } from 'react-router-dom';
export const GoBackBtn = ({ to }) => {
  return (
    <Link className={styles.link} to={to}>
      GoBackBtn
    </Link>
  );
};
