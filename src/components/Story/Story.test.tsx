import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Story from './Story';

describe('Story', () => {
  it('should render the label', () => {
    const label = 'Test Label';
    render(<Story label={label}>Children content here</Story>);
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it.skip('should render the description', () => {
    const description = 'Test Description';
    render(<Story description={description}>Children content here</Story>);
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it.skip('should render the image', () => {
    const imageSrc = 'test-image.jpg';
    render(<Story image={imageSrc}>Children content here</Story>);
    const imageElement = screen.getByAltText('Story Image');
    expect(imageElement).toHaveAttribute('src', imageSrc);
  });
});
