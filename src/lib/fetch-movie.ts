import { MovieData } from "@/types";

export default async function fetchMovie(
  id: number
): Promise<MovieData | null> {
  const url = `https://onebite-cinema-api-vert.vercel.app/movies/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
