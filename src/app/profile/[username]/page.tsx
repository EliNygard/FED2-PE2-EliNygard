import ProfileLandingPageWrapper from "@/ui/ProfileLandingPage";

/**
 * Page component for displaying the base profile page.
 *
 * - Renders different content for Venue Manager or Customer
 */

export default async function ProfilePage({ params}: { params: Promise<{ username: string}>}) {
  const { username } = await params
    

     
  return (
    <ProfileLandingPageWrapper username={username} />
  );
}
