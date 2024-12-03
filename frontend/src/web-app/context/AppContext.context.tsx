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
    getSuggestions: (question: string) => Promise<void>
    saveNotes: (notes: UserNote[]) => Promise<void>
}

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as IAppContextState

export const AppContextProvider = ({ children, obsidianApp, api }: AppContextProps) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])

    const getSuggestions = async (question: string) => {
        setSuggestions([])
        const suggestions = await api.query({ question })
        setSuggestions(suggestions)
    }

    const saveNotes = async (notes: UserNote[]) => {
        await api.saveNotes(notes)
    }

    return (
        <AppContext.Provider value={{ obsidianApp, suggestions, getSuggestions, saveNotes }}>
            {children}
        </AppContext.Provider>

    )
}
