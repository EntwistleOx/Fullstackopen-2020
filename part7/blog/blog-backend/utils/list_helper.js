// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, { likes }) => acc + likes, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((acc, cur) => {
    return acc.likes > cur.likes ? acc : cur;
  });

  delete favorite._id;
  delete favorite.url;
  delete favorite.__v;

  return favorite;
};

const mostBlogs = (blogs) => {
  const most = blogs.reduce((count, author) => {
    if (count[author.author] === undefined) {
      count[author.author] = 1;
    } else {
      count[author.author] = count[author.author] + 1;
    }
    return count;
  }, {});

  const max = Object.keys(most).reduce((acc, cur) => {
    return most[acc] > most[cur] ? acc : cur;
  });

  return { author: max, blogs: most[max] };
};

const mostLikes = (blogs) => {
  const most = blogs.reduce((count, author) => {
    if (count[author.author] === undefined) {
      count[author.author] = author.likes;
    } else {
      count[author.author] = count[author.author] + author.likes;
    }
    return count;
  }, {});

  const max = Object.keys(most).reduce((acc, cur) => {
    return most[acc] > most[cur] ? acc : cur;
  });

  return { author: max, likes: most[max] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
