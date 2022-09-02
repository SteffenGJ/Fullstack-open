const {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes} = require("../utils/list_helper");

const oneBlog = [{title: "something", author: "someone", likes: 7}];
const multiBlog = [{title: "something", author: "someone", likes: 7}, {title: "something", author: "someone", likes: 14}]
const megaMultiBlog = [
  {title: "Title1", author: "anders", url: "https.fk", likes: 1},
  {title: "Title2", author: "torben", url: "h4ttps.fk", likes: 13},
  {title: "rnlvre", author: "anders", url: "httnrelps.fk", likes: 128},
  {title: "fbreilubgæ", author: "ulrik", url: "rbkr.fk", likes: 114},
  {title: "fnvu", author: "torben", url: "hrvttps.fk", likes: 12},
  {title: "wgbægej", author: "anders", url: "https.45fk", likes: 152}
]

test('dummy returns one', () => {
    const blogs = []
    expect(dummy(blogs)).toBe(1)
})

describe("totalLikes", () => {
    test("of empty list is 0", () => {
        expect(totalLikes()).toBe(0);
    });
    test("when list has only one blog equals the likes of that", () => {
        expect(totalLikes(oneBlog)).toBe(7);
    });
    test("of a bigger list is calculated right", () => {
        expect(totalLikes(multiBlog)).toBe(21);
    });
});

describe("favoriteBlog", () => {
    test("of empty list is 0", () => {
        expect(favoriteBlog()).toBe(0);
    });
    test("when list has only one blog returns the one blog", () => {
        expect(favoriteBlog(oneBlog)).toEqual({title: "something", author: "someone", likes: 7});
    });
    test("of a bigger list returns the right blog", () => {
        expect(favoriteBlog(multiBlog)).toEqual({title: "something", author: "someone", likes: 14});
    });
})

describe("mostBlogs", () => {
    test("returns the author and count of the author of most blogs", () => {
        expect(mostBlogs(megaMultiBlog)).toEqual({author: "anders", count: 3});
    });
    test("returns just one of the top bloggers if there are more", () => {
        megaMultiBlog.shift();
        expect(mostBlogs(megaMultiBlog)).toEqual({author: "anders", count: 2} || {author: "torben", count: 2})
    })
})

describe("mostLikes", () => {
    test("returns the author and likes of the blog with most likes", () => {
        expect(mostLikes(megaMultiBlog)).toEqual({author: "anders", likes: 152});
    });
    test("returns just one of the top bloggers if there are more", () => {
        megaMultiBlog[1].likes = 152;
        expect(mostLikes(megaMultiBlog)).toEqual({author: "anders", likes: 152} || {author: "torben", likes: 152})
    })
})