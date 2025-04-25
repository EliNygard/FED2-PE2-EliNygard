export async function getVenues() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/holidaze/venues");
    const json = await response.json();

    return json.data;
  } catch (error) {
    console.error(error);
  }
}
