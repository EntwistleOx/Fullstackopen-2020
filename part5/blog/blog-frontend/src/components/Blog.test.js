import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Blog from './Blog';

let component;

const blog = {
  title: 'Batman: Year One',
  author: 'Frank Miller',
  url: 'www.batmanone.com',
  likes: 666,
  user: {
    name: 'Juan D',
  },
};
const mockHandler = jest.fn();
beforeEach(() => {
  component = render(<Blog blog={blog} like={mockHandler} />);
});

test('Blog renders title and autor, but no url and likes', () => {
  const blogDiv = component.container.querySelector('.blog');
  expect(blogDiv).toHaveTextContent('Batman: Year One | Frank Miller');
  expect(blogDiv).not.toHaveTextContent('www.batmanone.com');
  expect(blogDiv).not.toHaveTextContent(666);
});

test('clicking view button shown url and likes', () => {
  const blogDiv = component.container.querySelector('.blog');
  const btn = component.getByText('view');

  fireEvent.click(btn);
  expect(blogDiv).toHaveTextContent('www.batmanone.com');
  expect(blogDiv).toHaveTextContent(666);
});

test('clicking like button twice, calls the handler twice', () => {
  const btn = component.getByText('view');
  fireEvent.click(btn);

  const btnLikes = component.container.querySelector('.btnLikes');

  for (let x = 0; x < 2; x++) {
    fireEvent.click(btnLikes);
  }

  expect(mockHandler.mock.calls).toHaveLength(2);
});
