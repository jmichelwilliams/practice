import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Homepage from '../Homepage';

test('It renders homepage', async () => {
  // Arrange
  render(<Homepage />);

  // Act
  await userEvent.click(screen.getByText('Click to get Location'));

  // Assert
  expect(screen.getByRole('heading')).toHaveTextContent(
    'ISS Space Station Location',
  );
});

test('It renders button', async () => {
  // Arrange
  render(<Homepage />);

  // Act
  await userEvent.click(screen.getByText('Click to get Location'));

  // Assert
  expect(screen.getByRole('button')).toHaveTextContent('Click to get Location');
});
