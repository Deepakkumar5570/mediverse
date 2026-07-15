export interface PaginationOptions {
  page: number;
  limit: number;
}

export function getOffset({
  page,
  limit,
}: PaginationOptions) {
  return (page - 1) * limit;
}