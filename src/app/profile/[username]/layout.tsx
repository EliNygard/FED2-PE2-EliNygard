import Loading from "@/app/loading";
import ProfileHeader from "@/ui/ProfileHeader";
import ProfileNav from "@/ui/ProfileNav";
import { Suspense } from "react";

import type { Metadata } from "next";

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  
): Promise<Metadata> {
  const username = (await params).username;

  // fetch post information
  // const venue = (await getVenueById(id)).data;

  return {
    title: `Profile page ${username} `,
    description: `${username}'s profile page`,
  };
}

/**
 * Layout component for /profile pages.
 *
 * - Renders <Profile Header> and <ProfileNav>
 */
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ProfileHeader />
      <div className="mt-4 page-padding grid gap-4 md:gap-9 lg:gap-24 md:grid-cols-[200px_1fr] max-w-7xl m-auto">
        <ProfileNav />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </section>
  );
}
