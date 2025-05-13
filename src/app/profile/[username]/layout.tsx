import Loading from "@/app/loading";
import ProfileHeader from "@/ui/ProfileHeader";
import ProfileNav from "@/ui/ProfileNav";
import { Suspense } from "react";

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
