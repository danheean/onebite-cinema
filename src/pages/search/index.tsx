import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useState, useEffect } from "react";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import { useRouter } from "next/router";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   console.log(context);
//   const q = context.query.q;
//   const movies = await fetchMovies(q as string);
//   return {
//     props: {
//       movies,
//     },
//   };
// };

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div className={style.container}>
      <div className={style.movie_list}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
