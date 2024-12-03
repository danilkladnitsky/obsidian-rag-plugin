/* eslint-disable no-unused-vars */
import { QueryRequest, Suggestion, UserNote } from "web-app/domain"

const wait = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms))

export interface IAppApi {
    saveNotes: (notes: UserNote[]) => Promise<void>
    query: (query: QueryRequest) => Promise<Suggestion[]>
}

export const MockAppApi: IAppApi = {
    saveNotes: () => wait(2500),
    query: () => wait(1500).then(() => Promise.resolve([{
        noteUrl: "vault/sample-vault/notes/january/01.md",
        textContent: "Lorem ipsum"
    }]))
}
