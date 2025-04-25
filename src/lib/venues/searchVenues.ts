import { IVenue } from "@/interface";

export default async function searchVenues({searchTerm}: { searchTerm: string }): Promise<IVenue[]> {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues/search?q=${searchTerm}`
    );
    const json = await response.json();
    console.log(json.data);

    return json.data;
  } catch (error) {
    console.error(error);
    throw error
  }
}
