/* eslint-disable no-unused-vars */
import { QueryRequest, UserNote } from "web-app/domain"

const BACKEND_URL = "http://0.0.0.0:8000"

const wait = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms))

type ApiResponse = {
    status: "success"
}

type QueryResponse = {
    suggestions: string[]
}

export interface IAppApi {
    saveNotes: (vaultName: string, notes: UserNote[]) => Promise<void>
    query: (query: QueryRequest) => Promise<string[]>
}

export const MockAppApi: IAppApi = {
    saveNotes: () => wait(2500),
    query: () => wait(1500).then(() => Promise.resolve(["Lorem ipsum"]))
}

export const Api: IAppApi = {
    saveNotes: async (vaultName: string, notes: UserNote[]) => {
        const response = await fetch(`${BACKEND_URL}/user-notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: vaultName,
                documents: notes.map(n => n.content)
            })
        })

        await response.json() as Promise<ApiResponse>
    },
    query: async ({ question }: QueryRequest) => {
        const response = await fetch(`${BACKEND_URL}/user-notes/suggestion?query=${question}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res = (await response.json()) as QueryResponse

        return res.suggestions
    }
}
