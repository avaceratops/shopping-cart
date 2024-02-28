import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Collapsible from '../../components/Collapsible';

it('renders button correctly', () => {
  const buttonText = 'Description';
  render(<Collapsible buttonText={buttonText} />);

  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
  expect(within(button).getByText(buttonText)).toBeInTheDocument();
  expect(within(button).getByText('Open panel')).toBeInTheDocument();
});

it('displays panel text when button is clicked', async () => {
  const panelText = 'This is some panel text.';
  const user = userEvent.setup();
  render(<Collapsible panelText={panelText} />);

  const button = screen.getByRole('button');
  await user.click(button);

  waitFor(() => {
    expect(within(button).getByText('Close panel')).toBeInTheDocument();
    expect(screen.getByText(panelText)).toBeInTheDocument();
  });
});

it('hides panel text when button is clicked again', async () => {
  const panelText = 'This is some panel text.';
  const user = userEvent.setup();
  render(<Collapsible panelText={panelText} />);

  const button = screen.getByRole('button');
  await user.click(button);
  await user.click(button);

  expect(within(button).getByText('Open panel')).toBeInTheDocument();
  expect(screen.queryByText(panelText)).not.toBeInTheDocument();
});
