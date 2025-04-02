import style from "./[id].module.css";
import { InferGetServerSidePropsType } from "next";
import fetchMovie from "@/lib/fetch-movie";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;

  const movie = await fetchMovie(Number(id));

  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movie) {
    return <div>존재하지 않는 영화입니다.</div>;
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
