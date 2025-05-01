import ProfileHeader from "@/ui/ProfileHeader";
import ProfileNav from "@/ui/ProfileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid md:grid-cols-2 md:grid-rows-[1fr_auto]">
      <div className="md:col-span-full md:row-start-1">
        <ProfileHeader />
      </div>
      <div className="md:col-start-1 md:row-start-2">
        <ProfileNav />
        
      </div>
      <div className="md:col-start-2 md:row-start-2">{children}</div>
    </main>
  );
}
