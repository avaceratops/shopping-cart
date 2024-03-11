import styles from '../styles/Checkbox.module.scss';

export default function Checkbox({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex items-center">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
      />
      {label}
    </label>
  );
}
