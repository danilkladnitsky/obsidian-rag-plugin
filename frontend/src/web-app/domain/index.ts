export type UserNote = {
    path: string
    name: string
    content: string
}

export type Suggestion = {
    noteUrl: string
    textContent: string
}

export type QueryRequest = {
    question: string
}
