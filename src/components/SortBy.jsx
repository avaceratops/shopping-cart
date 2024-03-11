import { SORT_METHODS } from '../utils/products';
import styles from '../styles/Select.module.scss';

export default function SortBy({ defaultValue, onChange }) {
  return (
    <label htmlFor="sort-method" className="self-center font-medium xs:self-auto">
      Sort By
      <select
        id="sort-method"
        name="sort-method"
        className={`${styles.select} ml-3`}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {Object.keys(SORT_METHODS).map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
    </label>
  );
}
