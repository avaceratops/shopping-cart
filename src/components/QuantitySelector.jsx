import { useState } from 'react';
import styles from '../styles/QuantitySelector.module.scss';

export default function QuantitySelector({ id, initialValue, maxValue, updateCartItem }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    updateCartItem(id, newValue);
  };

  const options = [];
  for (let i = 1; i <= Math.min(maxValue, 8); i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <article>
      <label htmlFor={`quantity-${id}`} className="sr-only">
        Quantity
      </label>
      <select
        id={`quantity-${id}`}
        name={`quantity-${id}`}
        className={styles.select}
        defaultValue={value}
        onChange={handleChange}
      >
        {options}
      </select>
    </article>
  );
}
