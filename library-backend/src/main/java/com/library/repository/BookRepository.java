package com.library.repository;

import com.library.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByAvailable(Boolean available);

    List<Book> findByCategoryIgnoreCase(String category);

    @Query("SELECT b FROM Book b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Book> searchByKeywordJPQL(@Param("keyword") String keyword);

    @Query(value = "SELECT * FROM books WHERE published_year >= :year ORDER BY published_year DESC", nativeQuery = true)
    List<Book> findBooksPublishedAfterNative(@Param("year") Integer year);
}