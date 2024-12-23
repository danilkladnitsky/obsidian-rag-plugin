import { App } from "obsidian"
import { createContext, ReactNode, useContext, useState } from "react"

import { IAppApi } from "web-app/api/api"
import { Suggestion, UserNote } from "web-app/domain"

interface AppContextProps {
    obsidianApp: App
    api: IAppApi
    children: ReactNode
}

interface IAppContextState {
    obsidianApp: App
    suggestions: Suggestion[]
    questionAnswer: string
    getSuggestions: (question: string) => Promise<void>
    saveNotes: (notes: UserNote[]) => Promise<void>
}

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as IAppContextState

export const AppContextProvider = ({ children, obsidianApp, api }: AppContextProps) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [questionAnswer, setQuestionAnswer] = useState("")

    const getSuggestions = async (question: string) => {
        setSuggestions([])
        const { suggestions, llm_output } = await api.query({ question, user_id: obsidianApp.vault.getName() })
        setSuggestions(suggestions)
        setQuestionAnswer(llm_output)
    }

    const saveNotes = async (notes: UserNote[]) => {
        const vaultName = obsidianApp.vault.getName()
        await api.saveNotes(vaultName, notes)
    }

    return (
        <AppContext.Provider value={{ obsidianApp, suggestions, questionAnswer, getSuggestions, saveNotes }}>
            {children}
        </AppContext.Provider>

    )
}
