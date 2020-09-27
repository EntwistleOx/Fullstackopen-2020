import {
  GET_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  LIKE_BLOG,
  COMMENT_BLOG,
} from '../actions/types';

const initialState = [];

const blogsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BLOGS:
      return payload;
    case ADD_BLOG:
      return [...state, payload];
    case DELETE_BLOG:
      return state.filter((blog) => {
        return blog.id !== payload;
      });
    case LIKE_BLOG:
      return state.map((blog) => {
        return blog.id === payload.id
          ? { ...blog, likes: payload.likes }
          : blog;
      });
    case COMMENT_BLOG:
      return state.map((blog) => {
        return blog.id === payload.id
          ? { ...blog, comments: [...payload.comments] }
          : blog;
      });
    default:
      return state;
  }
};

export default blogsReducer;
