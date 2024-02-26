import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../../components/Checkbox';

const id = 'in-stock';
const label = 'In stock';
const onChange = vi.fn();

it('renders correctly when checked is true', () => {
  render(<Checkbox id={id} label={label} checked={true} onChange={onChange} />);

  const checkbox = screen.getByRole('checkbox', { name: label });

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeChecked();
});

it('renders correctly when checked is false', () => {
  render(<Checkbox id={id} label={label} checked={false} onChange={onChange} />);

  const checkbox = screen.getByRole('checkbox', { name: label });

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

it('calls onChange handler when user clicks the checkbox', async () => {
  const user = userEvent.setup();
  render(<Checkbox id={id} label={label} checked={true} onChange={onChange} />);

  const checkbox = screen.getByRole('checkbox', { name: label });
  await user.click(checkbox);

  expect(onChange).toHaveBeenCalledTimes(1);
});
