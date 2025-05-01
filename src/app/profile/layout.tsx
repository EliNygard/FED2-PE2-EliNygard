import ProfileHeader from "@/ui/ProfileHeader";
import ProfileNav from "@/ui/ProfileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ProfileHeader />
      <div className="mt-4 page-padding grid gap-4 md:gap-24 md:grid-cols-[200px_1fr] max-w-7xl m-auto">
        <ProfileNav />
        {children}
      </div>
    </section>
  );
}
