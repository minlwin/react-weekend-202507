export type Pager = {
    count: number
    page: number
    size: number
    totalPages: number
    links: number[]
}

export type PageResult<T> = {
    contents: T []
} & Pager

export type DataModificationResult<T> = {
    id: T
}