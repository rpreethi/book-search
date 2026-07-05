"use client";

import { useMemo, useState } from "react";
import booksData from "@/data/books.json";
import styles from "./page.module.scss";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  rating: number;
  blurb: string;
};

const books: Book[] = booksData as Book[];

export default function Home() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "year" | "rating">("rating");

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return books
      .filter((book) => {
        const haystack = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
      .slice(0, 5);
  }, [query]);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const nextBooks = books.filter((book) => {
      if (!normalizedQuery) return true;
      const haystack = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });

    return [...nextBooks].sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "year") return b.year - a.year;
      return b.rating - a.rating;
    });
  }, [query, sortBy]);

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div>
              <p className={styles.badge}>✨ Curated for cozy reading nights</p>
              <h1 className={styles.title}>Find your next favorite book in a few calm clicks.</h1>
              <p className={styles.description}>
                Search by title, author, or genre, then sort by mood, newest release, or best rating.
              </p>
            </div>
            <div className={styles.trendingCard}>
              <strong>Trending this week</strong>
              Mystery, memoirs, and magical realism
            </div>
          </div>

          <div className={styles.searchArea}>
            <div className={styles.searchWrapper}>
              <label htmlFor="book-search" className="sr-only">
                Search books
              </label>
              <input
                id="book-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for a book, author, or genre"
                className={styles.input}
              />
              <span className={styles.icon}>🔎</span>
              {suggestions.length > 0 && (
                <div className={styles.suggestions}>
                  {suggestions.map((book) => (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() => setQuery(book.title)}
                      className={styles.suggestionButton}
                    >
                      <span>
                        <span className={styles.suggestionTitle}>{book.title}</span>
                        <span className={styles.suggestionMeta}>by {book.author}</span>
                      </span>
                      <span className={styles.suggestionGenre}>{book.genre}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.metaBar}>
              <div className={styles.resultCount}>
                Showing <strong>{filteredBooks.length}</strong> books
              </div>
              <label className={styles.sortLabel}>
                <span>Sort by</span>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as "title" | "year" | "rating")}
                  className={styles.sortSelect}
                >
                  <option value="rating">Top rated</option>
                  <option value="year">Newest</option>
                  <option value="title">Title</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <section className={styles.grid}>
          {filteredBooks.map((book) => (
            <article key={book.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <p className={styles.cardGenre}>{book.genre}</p>
                  <h2 className={styles.cardTitle}>{book.title}</h2>
                </div>
                <div className={styles.ratingBadge}>★ {book.rating.toFixed(1)}</div>
              </div>
              <p className={styles.cardBlurb}>{book.blurb}</p>
              <div className={styles.cardMeta}>
                <span>{book.author}</span>
                <span>{book.year}</span>
              </div>
            </article>
          ))}
        </section>

        {filteredBooks.length === 0 && (
          <div className={styles.emptyState}>
            No books matched that search yet. Try a broader keyword like “fiction” or “memoir”.
          </div>
        )}
      </div>
    </main>
  );
}
