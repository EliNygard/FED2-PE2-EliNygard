"use client";

import { useVenuesByProfile } from "@/hooks/useVenuesByProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import MyVenues from "@/ui/venues/MyVenues";

export default function MyVenuesPage() {
  const username = useAuthStore((s) => s.user?.name) ?? "";
  const { venues, loading, error } = useVenuesByProfile(username);
  console.log(venues);

  if(loading) {
    return <p>Loading venues...</p>
  }

  if (!username) {
    return <p>Please log in to view your venues</p>
  }


  // useEffect(() => {
  //   if (!username || '') return

  //   async function fetchVenuesByProfile() {
  //     try {
  //       const data = await getVenuesByProfile(username)
  //       console.log(data);

  //     } catch (error) {
  //       console.error('Failed to fetch venues', error);

  //     }
  //   }
  //   fetchVenuesByProfile()
  // }, [username])

  return (
<section>
  {venues && venues.length > 0 ? (
    <MyVenues venues={venues} />
  ) : ( 
    <p>You have no venues</p>
  )}
</section>  
);
}
