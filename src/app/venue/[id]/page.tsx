export default async function VenuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  return (
    <main className="grid grid-cols-1 m-auto md:grid-cols-2">
      <div className="md:col-span-full">01 Images</div>
      <div className="md:col-span-full">02 Header</div>
      <div className="md:col-start-1">03 Info</div>
      <div className="md:col-start-2 md:row-start-3 md:row-end-5">
        04 Calendar
      </div>
      <div className="md:col-start-1">05 Location</div>
    </main>
  );
}
