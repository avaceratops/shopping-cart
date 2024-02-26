import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NAVIGATION_LINKS } from '../../utils/navigation';
import Hamburger from '../../components/Hamburger';

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

it('renders toggle button correctly', async () => {
  render(<Hamburger />);

  const button = screen.getByRole('button', { name: /open menu/i });

  expect(button).toBeInTheDocument();
});

it('opens menu when toggle button is clicked', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <Hamburger />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /open menu/i });
  await user.click(button);
  const closeButton = screen.getByRole('button', { name: /close panel/i });

  expect(closeButton).toBeInTheDocument();
});

it('closes menu when "X" button is clicked', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <Hamburger />
    </BrowserRouter>
  );

  const openButton = screen.getByRole('button', { name: /open menu/i });
  await user.click(openButton);
  const closeButton = screen.getByRole('button', { name: /close panel/i });
  await user.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByRole('button', { name: /close panel/i })).not.toBeInTheDocument();
  });
});

it('closes menu when navigation link is clicked', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <Hamburger />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /open menu/i });
  await user.click(button);
  const navLink = screen.getByRole('link', { name: NAVIGATION_LINKS[0].name });
  await user.click(navLink);

  await waitFor(() => {
    expect(screen.queryByRole('button', { name: /close panel/i })).not.toBeInTheDocument();
  });
});

it('renders all navigation links correctly', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <Hamburger />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /open menu/i });
  await user.click(button);

  NAVIGATION_LINKS.forEach((item) => {
    expect(screen.getByRole('link', { name: item.name })).toBeInTheDocument();
  });
});
