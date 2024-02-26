import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MAX_PURCHASE_QUANTITY } from '../../utils/products';
import QuantitySelector from '../../components/QuantitySelector';

it('renders correctly when maxValue > 0', () => {
  render(<QuantitySelector maxValue={1} />);

  const combobox = screen.getByRole('combobox', { name: /quantity/i });
  const options = screen.getAllByRole('option');

  expect(combobox).toBeInTheDocument();
  expect(options.length).toBe(1);
});

it("doesn't render when maxValue === 0", () => {
  render(<QuantitySelector maxValue={0} />);

  const combobox = screen.queryByRole('combobox', { name: /quantity/i });

  expect(combobox).not.toBeInTheDocument();
});

it('renders correct number of options when maxValue > MAX_PURCHASE_QUANTITY', () => {
  render(<QuantitySelector initialValue={3} maxValue={MAX_PURCHASE_QUANTITY} />);

  const options = screen.getAllByRole('option');

  expect(options.length).toBe(MAX_PURCHASE_QUANTITY);
});

it('initialValue is correctly selected', () => {
  render(<QuantitySelector initialValue={3} maxValue={10} />);

  const combobox = screen.getByRole('combobox', { name: /quantity/i });

  expect(combobox).toHaveValue('3');
});

it('id/name are set correctly when isCart is true', () => {
  render(<QuantitySelector id="1" maxValue={10} isCart={true} />);

  const combobox = screen.getByRole('combobox', { name: /quantity/i });

  expect(combobox).toHaveAttribute('id', 'cart-1');
  expect(combobox).toHaveAttribute('name', 'cart-1');
});

it('id/name are set correctly when isCart is false', () => {
  render(<QuantitySelector id="1" maxValue={10} isCart={false} />);

  const combobox = screen.getByRole('combobox', { name: /quantity/i });

  expect(combobox).toHaveAttribute('id', 'quantity-1');
  expect(combobox).toHaveAttribute('name', 'quantity-1');
});

it('calls onChange correctly when selected value changes', async () => {
  const onChange = vi.fn();
  const user = userEvent.setup();
  render(<QuantitySelector maxValue={3} onChange={onChange} />);

  const combobox = screen.getByRole('combobox', { name: /quantity/i });
  await user.selectOptions(combobox, '3');

  expect(combobox).toHaveValue('3');
  expect(onChange).toHaveBeenCalledWith(3);
});
