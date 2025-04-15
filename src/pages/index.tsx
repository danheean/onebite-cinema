import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import { InferGetStaticPropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";

export const getStaticProps = async () => {
  console.log("인덱스 페이지");
  const [allMovies, recommendedMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: { allMovies, recommendedMovies },
  };
};

export default function Home({
  allMovies,
  recommendedMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log(allMovies);

  /*
  useEffect(() => {
    console.log(window);
  }, []);
*/
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.movie_recommend_list}>
          {recommendedMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>등록된 모든 영화</section>
      <div className={style.movie_list}>
        {allMovies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
