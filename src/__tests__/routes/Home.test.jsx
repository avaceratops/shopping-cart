import { render, screen, within } from '@testing-library/react';
import { GAME_LOGOS, PROMOTIONAL_IMAGES } from '../../utils/images';
import Home from '../../routes/Home';

it('renders promotional images correctly', () => {
  render(<Home />);

  const container = screen.getByTestId('promotional-images');
  const images = within(container).getAllByRole('img');

  expect(images).toHaveLength(PROMOTIONAL_IMAGES.length);
  images.forEach((image, index) => {
    expect(image).toHaveAttribute('src', PROMOTIONAL_IMAGES[index]);
  });
});

it('renders game logos correctly', () => {
  render(<Home />);

  const container = screen.getByTestId('game-logos');
  const images = within(container).getAllByRole('img');

  expect(images).toHaveLength(GAME_LOGOS.length);
  images.forEach((image, index) => {
    expect(image).toHaveAttribute('src', GAME_LOGOS[index]);
  });
});
