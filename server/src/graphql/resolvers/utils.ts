export function calculateSkip(page: number, limit: number) {
    return page > 0 ? (page - 1) * limit : 0;
}
