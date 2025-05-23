/**
 * Returns a promise that resolves after the given number of milliseconds.
 * Useful for simulating network latency or testing loading states.
 *
 * @param ms - Number of milliseconds to wait before resolving.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
