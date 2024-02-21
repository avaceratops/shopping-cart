import { useState } from 'react';
import styles from '../styles/QuantitySelector.module.scss';

export default function QuantitySelector({ id, initialValue, maxValue, onChange, isCart = false }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  const options = [];
  for (let i = 1; i <= Math.min(maxValue, 8); i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const selectId = `${isCart ? 'cart-' : 'quantity-'}${id}`;

  return (
    <article>
      <label htmlFor={selectId} className="sr-only">
        Quantity
      </label>
      <select
        id={selectId}
        name={selectId}
        className={styles.select}
        defaultValue={value}
        onChange={handleChange}
      >
        {options}
      </select>
    </article>
  );
}
