export type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  rating: number;
  blurb: string;
};

const normalizeQuery = (query: string) => query.trim().toLowerCase();

export const getSuggestions = (books: Book[], query: string) => {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) return [];

  return books
    .filter((book) => {
      const haystack = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    })
    .slice(0, 5);
};

export const getFilteredBooks = (
  books: Book[],
  query: string,
  sortBy: "title" | "year" | "rating"
) => {
  const normalizedQuery = normalizeQuery(query);

  const filtered = books.filter((book) => {
    if (!normalizedQuery) return true;
    const haystack = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "year") return b.year - a.year;
    return b.rating - a.rating;
  });
};
