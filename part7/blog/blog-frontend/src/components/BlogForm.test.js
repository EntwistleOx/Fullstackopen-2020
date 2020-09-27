import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import BlogForm from './BlogForm';

test('<BlogForm />', () => {
  const newBlog = jest.fn();

  const component = render(<BlogForm createNewBlog={newBlog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('#blogForm');

  fireEvent.change(title, {
    target: { value: 'Batman: Year One' },
  });
  fireEvent.change(author, {
    target: { value: 'Frank Miller' },
  });
  fireEvent.change(url, {
    target: { value: 'www.batmanzero.com' },
  });

  fireEvent.submit(form);

  expect(newBlog.mock.calls.length).toBe(1);
  expect(newBlog.mock.calls[0][0].title).toBe('Batman: Year One');
  expect(newBlog.mock.calls[0][0].author).toBe('Frank Miller');
  expect(newBlog.mock.calls[0][0].url).toBe('www.batmanzero.com');
});
