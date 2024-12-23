export type UserNote = {
    path: string
    name: string
    content: string
}

export type Suggestion = string

export type QueryRequest = {
    question: string
    user_id: string
}
