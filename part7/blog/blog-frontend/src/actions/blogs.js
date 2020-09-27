import blogService from '../services/blogs';
import {
  GET_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  LIKE_BLOG,
  COMMENT_BLOG,
} from './types';
import { setNotification } from './notification';

export const getBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();

  dispatch({
    type: GET_BLOGS,
    payload: blogs,
  });
};

export const addBlog = (newBlog) => async (dispatch) => {
  const blog = await blogService.createBlog(newBlog);

  dispatch({
    type: ADD_BLOG,
    payload: blog,
  });

  dispatch(
    setNotification({
      message: `New blog!! ${blog.title} by ${blog.author}`,
      style: 'success',
    }),
  );
};

export const deleteBlog = (id) => async (dispatch) => {
  const delBlog = await blogService.deleteBlog(id);

  if (delBlog.error) {
    dispatch(
      setNotification({
        message: delBlog.error,
        style: 'error',
      }),
    );
    return;
  }

  dispatch({
    type: DELETE_BLOG,
    payload: id,
  });

  dispatch(
    setNotification({
      message: 'Removed ok!!',
      style: 'success',
    }),
  );
};

export const likeBlog = (id, likedBlog) => async (dispatch) => {
  const response = await blogService.likeBlog(id, likedBlog);

  dispatch({
    type: LIKE_BLOG,
    payload: response,
  });

  dispatch(
    setNotification({
      message: `New like in ${response.title}`,
      style: 'success',
    }),
  );
};

export const commentBlog = (id, comment) => async (dispatch) => {
  console.log(id, comment);
  const response = await blogService.commentBlog(id, comment);

  dispatch({
    type: COMMENT_BLOG,
    payload: response,
  });

  dispatch(
    setNotification({
      message: `New comment in ${response.title}`,
      style: 'success',
    }),
  );
};
