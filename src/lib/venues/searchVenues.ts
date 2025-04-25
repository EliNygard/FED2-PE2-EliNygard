export default async function searchVenues() {
  try {
    const response = await fetch('https://v2.api.noroff.dev/holidaze/', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    const json = await response.json()

    if (!response.ok) {
      console.error(json.errors[0].message);
      throw new Error(
        json.errors[0].message ||
          "Can not get the venues at the moment. Please try again."
      );
    }

    return json.data;
  } catch (error) {
    console.error(error);
  }
}