import { vi } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchDialog from '../../components/SearchDialog';

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

const mocks = vi.hoisted(() => {
  return {
    useNavigate: vi.fn(),
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useNavigate: vi.fn(() => mocks.useNavigate),
  };
});

it('renders search button with dialog initially hidden', () => {
  render(
    <BrowserRouter>
      <SearchDialog />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /open search/i });
  const input = screen.queryByRole('textbox');

  expect(button).toBeInTheDocument();
  expect(input).not.toBeInTheDocument();
});

it('opens dialog when search button is clicked', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchDialog />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /open search/i });
  await user.click(button);
  const input = screen.getByRole('textbox');

  expect(input).toBeInTheDocument();
});

it('closes dialog when "Escape" key is pressed', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchDialog />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /open search/i });
  await user.click(button);
  await user.keyboard('{Escape}');

  await waitFor(() => {
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});

it("doesn't call navigate when input field is empty", async () => {
  const navigate = useNavigate();
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchDialog />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /open search/i });
  await user.click(button);
  await user.keyboard('{Enter}');

  expect(navigate).toHaveBeenCalledTimes(0);
});

it('calls navigate when input is valid and "Enter" key is pressed', async () => {
  const navigate = useNavigate();
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchDialog />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /open search/i });
  await user.click(button);
  await user.keyboard('test');
  await user.keyboard('{Enter}');

  expect(navigate).toHaveBeenCalledTimes(1);
  vi.clearAllMocks();
});

it('calls navigate when input is valid and submit button is clicked', async () => {
  const navigate = useNavigate();
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchDialog />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /open search/i });
  await user.click(button);
  await user.keyboard('test');
  const submitButton = screen.getByRole('button', { name: /submit search/i });
  await user.click(submitButton);

  expect(navigate).toHaveBeenCalledTimes(1);
  vi.clearAllMocks();
});
