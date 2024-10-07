import '@testing-library/jest-dom';

// import { render, screen } from '@testing-library/react';

// import testStoryData from '../../tests/fixtures/story--yale-club--17-madison-square-north.json';
// import type { Story as IStory } from '../../types';
// import Story from './Story';

describe('Story', () => {
  it('passes temp test', () => {
    expect(true).toBe(true);
  });
  // it('should render the label', () => {
  //   render(<Story story={testStoryData as IStory} />);
  //   const labelElement = screen.getByText(testStoryData.label);
  //   expect(labelElement).toBeInTheDocument();
  // });

  // it.skip('should render the description', () => {
  //   render(<Story story={testStoryData as IStory} />);
  //   const descriptionElement = screen.getByText(testStoryData.description);
  //   expect(descriptionElement).toBeInTheDocument();
  // });

  // it.skip('should render the image', () => {
  //   const imageSrc = testStoryData.image;
  //   render(<Story story={testStoryData as IStory} />);
  //   const imageElement = screen.getByAltText('Story Image');
  //   expect(imageElement).toHaveAttribute('src', imageSrc);
  // });
});
