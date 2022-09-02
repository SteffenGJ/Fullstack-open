const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    if (!blogs) {
      return 0;
    }
    const likesArray = blogs.map(blog => blog.likes);
    const sum = likesArray.reduce((prev, curr) => prev + curr);
    return sum;
};

const favoriteBlog = (blogs) => {
    if (!blogs) {
      return 0;
    }
    
    const likesArray = blogs.map(blog => blog.likes);
    console.log(likesArray)
    const max = Math.max(...likesArray);
    console.log(max)
    const index = likesArray.indexOf(max)
    console.log(index);
    return blogs[index];
};

const mostBlogs = arr => {
  const authorArr = arr.map(blog => blog.author).sort();
  const counterArray = []
  let counter = 0;

  for(let i = 0; i < authorArr.length; i++) {
    if (authorArr[i] !== authorArr[i + 1]) {
      counter++;
      counterArray.push({author: authorArr[i], count: counter});
      counter = 0;
    } else if (authorArr[i] === authorArr[i+1]) {
      counter++;
    } 
  }

  const countArray = counterArray.map(counter => counter.count);
  const max = Math.max(...countArray);
  const index = countArray.indexOf(max);

  return counterArray[index];
}

const mostLikes = arr => {
  const likesArr = arr.map(arr => arr.likes);
  const max = Math.max(...likesArr);
  const index = likesArr.indexOf(max);
  const likes = arr[index].likes;
  const author = arr[index].author;
  return {author: author, likes: likes}

}

const getTokenFrom = req => {
  const authorization = req.get("authorization");
  
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    getTokenFrom
};