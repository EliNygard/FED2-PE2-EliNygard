/**
 * Formats a date string into the Norwegian locale date format (DD.MM.YYYY).
 *
 * @remarks
 * Internally uses `Intl.DateTimeFormat` with locale `"no-NO"` to output
 * numeric year, month, and day.
 *
 * @example
 * ```ts
 * dateFormat("2025-05-08"); // → "08.05.2025"
 * dateFormat("July 1, 2023"); // → "01.07.2023"
 * ```
 *
 * @param date - A date string recognized by the JavaScript `Date` constructor.
 * @returns A string representing the date in Norwegian format (`day.month.year`).
 */

export function dateFormat(date: string): string {
  const dateFormat = new Intl.DateTimeFormat("no-NO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedDate = dateFormat.format(new Date(date))
  return formattedDate
}