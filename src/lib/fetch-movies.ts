import { MovieData } from "@/types";

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = `https://onebite-cinema-api-vert.vercel.app/movies`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    console.log(url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
