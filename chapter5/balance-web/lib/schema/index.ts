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

export type PageSearch = {
    page?: number
    size?: number
}

export const DEFAULT_PAGE_RESULT:PageResult<any> = {
    contents: [],
    count: 0,
    page: 0,
    size: 0,
    totalPages: 0,
    links: []
}

export type ApplicationError = {
    logout: boolean
    message: string []
}