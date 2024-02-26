import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../../components/Dialog';

const title = 'Filters';

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

it('renders dialog toggle button correctly', async () => {
  render(<Dialog title={title} />);

  const button = screen.getByRole('button', { name: title });

  expect(button).toBeInTheDocument();
});

it('opens dialog when button is clicked', async () => {
  const user = userEvent.setup();
  render(<Dialog title={title} />);

  const button = screen.getByRole('button', { name: title });
  await user.click(button);
  const closeButton = screen.getByRole('button', { name: /close panel/i });

  expect(closeButton).toBeInTheDocument();
});

it('closes dialog when "X" button is clicked', async () => {
  const user = userEvent.setup();
  render(<Dialog title={title} />);

  const openButton = screen.getByRole('button', { name: title });
  await user.click(openButton);
  const closeButton = screen.getByRole('button', { name: /close panel/i });
  await user.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByRole('button', { name: /close panel/i })).not.toBeInTheDocument();
  });
});

it('renders title correctly', async () => {
  const user = userEvent.setup();
  render(<Dialog title={title} />);

  const button = screen.getByRole('button', { name: title });
  await user.click(button);
  const heading = screen.getByRole('heading', { name: title });

  expect(heading).toBeInTheDocument();
});

it('renders children correctly', async () => {
  const user = userEvent.setup();
  render(
    <Dialog title={title}>
      <h3>Test</h3>
    </Dialog>
  );

  const button = screen.getByRole('button', { name: title });
  await user.click(button);
  const heading = screen.getByRole('heading', { name: /test/i });

  expect(heading).toBeInTheDocument();
});
