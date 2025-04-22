export async function getVenues() {
  const response = await fetch("https://v2.api.noroff.dev/holidaze/venues");
  const json = await response.json();
  return json.data;
}