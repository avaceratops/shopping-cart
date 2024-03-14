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
  render(
    <Collapsible>
      <p>{panelText}</p>
    </Collapsible>
  );

  const button = screen.getByRole('button');
  await user.click(button);
  const closeButton = await screen.findByText('Close panel');
  const text = await screen.findByText(panelText);

  expect(closeButton).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});

it('hides panel text when button is clicked again', async () => {
  const panelText = 'This is some panel text.';
  const user = userEvent.setup();
  render(
    <Collapsible>
      <p>{panelText}</p>
    </Collapsible>
  );

  const button = screen.getByRole('button');
  await user.click(button);
  await screen.findByText('Close panel');
  await user.click(button);
  await screen.findByText('Open panel');

  expect(screen.queryByText(panelText)).not.toBeInTheDocument();
});
