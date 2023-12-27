export function getDateString(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}