import React, { useState, useEffect } from "react";
import styles from "./PaginationBar.module.css";

interface IPagination {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  postsCount: number;
  postLimit: number;
  scale: number;
}

function PaginationBar(props: IPagination) {
  let totalPages = Math.ceil(props.postsCount / props.postLimit);
  const pageNeighbours = 2;

  const getPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2; // включая кнопки "Previous" и "Next"

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, props.page - pageNeighbours);
      const endPage = Math.min(totalPages - 1, props.page + pageNeighbours);
      const pages = [];

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 2) {
        pages.unshift("...");
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.unshift(1);
      pages.push(totalPages);

      return pages;
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pages = getPageNumbers();
  return (
    //   <div
    //     className={styles.pagination_container}
    //     style={{ scale: `${props.scale}` }}
    //   >
    //     <div>
    //       <p>
    //         Результаты{" "}
    //         {`${props.page * props.postLimit}-${
    //           (props.page + 1) * props.postLimit
    //         }`}{" "}
    //         из {props.postsCount}
    //       </p>
    //     </div>
    //     <ul className={styles.pagination}>
    //       <button onClick={() => props.setPage(props.page - 1)}>{"<"}</button>
    //       {pagesButtons.map((button) => (
    //         <button onClick={() => props.setPage(button)} key={button}>
    //           {button}
    //         </button>
    //       ))}
    //       <button onClick={() => props.setPage(props.page + 1)}>{">"}</button>
    //     </ul>
    //   </div>
    // );

    <div
      className={styles.pagination_container}
      style={{ scale: `${props.scale}` }}
    >
      <div>
        <p>
          Результаты{" "}
          {`${(props.page - 1) * props.postLimit}-${
            props.page * props.postLimit
          }`}{" "}
          из {props.postsCount}
        </p>
      </div>
      <ul className={styles.pagination}>
        <button
          className={styles.pagination_side_button}
          onClick={() => props.setPage(props.page - 1)}
          disabled={props.page === 1}
        >
          {"<"}
        </button>
        {pages.map((button, index) => (
          <button
            className={styles.pagination_main_button}
            onClick={() => {
              if (typeof button === "number") {
                props.setPage(button);
              }
            }}
            key={index}
            disabled={button === props.page}
          >
            {button}
          </button>
        ))}
        <button
          onClick={() => props.setPage(props.page + 1)}
          className={styles.pagination_side_button}
        >
          {">"}
        </button>
      </ul>
    </div>
  );
}

export default PaginationBar;
