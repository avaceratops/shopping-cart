import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CloseButton from '../../components/CloseButton';

it('renders button correctly', () => {
  const { container } = render(<CloseButton />);
  expect(container).toMatchSnapshot();
});

it('calls onClick handler when user clicks the button', async () => {
  const onClick = vi.fn();
  const user = userEvent.setup();
  render(<CloseButton onClick={onClick} />);

  const button = screen.getByRole('button', { name: /close panel/i });
  await user.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});
