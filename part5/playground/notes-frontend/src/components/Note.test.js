import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const component = render(<Note note={note} />);

  component.debug();

  // method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  // method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();

  // method 3
  const div = component.container.querySelector('.note');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  const li = component.container.querySelector('li');

  console.log(prettyDOM(li));
});

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = jest.fn();

  const component = render(<Note note={note} toggleImportance={mockHandler} />);

  const button = component.getByText('make no important');
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
