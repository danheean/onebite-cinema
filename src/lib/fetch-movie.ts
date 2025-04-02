import { MovieData } from "@/types";

export default async function fetchMovie(
  id: number
): Promise<MovieData | null> {
  const url = `http://localhost:12345/movies/${id}`;

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
