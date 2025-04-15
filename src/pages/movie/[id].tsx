import style from "./[id].module.css";
import { InferGetStaticPropsType } from "next";
import fetchMovie from "@/lib/fetch-movie";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return "로딩중입니다.";
  if (!movie) {
    return "문제가 발생했습니다. 다시 시도하세요";
  }

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt={title} />
      </div>

      <div className={style.title}>{title}</div>

      <div className={style.detail}>
        {releaseDate} / {genres} / {runtime}분
      </div>

      <div className={style.detail}>{company}</div>

      <div className={style.subTitle}>{subTitle}</div>

      <div className={style.description}>{description}</div>
    </div>
  );
}
