import ProfileHeader from "@/ui/ProfileHeader";
import ProfileNav from "@/ui/ProfileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full grid md:grid-cols-[200px_1fr] md:grid-rows-[1fr_auto]">
      <div className="md:col-span-full md:row-start-1 bg-secondary-background">
        <ProfileHeader />
      </div>

      <div className="md:col-start-1 md:row-start-2 pl-6 md:pl-10 2xl:pl-20">
        <ProfileNav />
      </div>
      <div className="md:col-start-2 md:row-start-2 pl-6 md:pl-10 2xl:pl-20">
        {children}
      </div>
    </section>
  );
}
