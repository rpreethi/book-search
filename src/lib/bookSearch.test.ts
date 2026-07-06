import { getFilteredBooks, getSuggestions, type Book } from "./bookSearch";

const books: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy",
    year: 2020,
    rating: 4.7,
    blurb: "A woman steps into a magical library where each book reveals a different version of her life.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    year: 2018,
    rating: 4.6,
    blurb: "A practical guide to building habits that last with small, steady steps.",
  },
  {
    id: 3,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    year: 2019,
    rating: 4.5,
    blurb: "A psychological thriller told through a chilling portrait of silence.",
  },
];

describe("book search helpers", () => {
  test("suggestions match title, author, or genre", () => {
    expect(getSuggestions(books, "atomic")).toHaveLength(1);
    expect(getSuggestions(books, "atomic")[0].title).toBe("Atomic Habits");
    expect(getSuggestions(books, "thriller")[0].title).toBe("The Silent Patient");
    expect(getSuggestions(books, "James")[0].author).toBe("James Clear");
  });

  test("filtered books returns all items when query is empty", () => {
    const result = getFilteredBooks(books, "", "rating");
    expect(result).toHaveLength(3);
  });

  test("filtered books sorts by rating descending", () => {
    const result = getFilteredBooks(books, "", "rating");
    expect(result[0].title).toBe("The Midnight Library");
    expect(result[1].title).toBe("Atomic Habits");
  });

  test("filtered books sorts by newest year", () => {
    const result = getFilteredBooks(books, "", "year");
    expect(result[0].year).toBe(2020);
    expect(result[1].year).toBe(2019);
  });

  test("filtered books applies query filtering", () => {
    const result = getFilteredBooks(books, "patient", "title");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("The Silent Patient");
  });
});
