
export function dateFormat(date: string): string {
  const dateFormat = new Intl.DateTimeFormat("no-NO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedDate = dateFormat.format(new Date(date))
  return formattedDate
}