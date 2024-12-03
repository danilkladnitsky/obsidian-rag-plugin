import { App } from "obsidian"
import { createContext, ReactNode, useContext } from "react"

interface AppContextProps {
    obsidianApp: App
}

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as AppContextProps

export const AppContextProvider = ({ children, obsidianApp }: AppContextProps & { children: ReactNode }) => {
    return (
        <AppContext.Provider value={{ obsidianApp }}>
            {children}
        </AppContext.Provider>

    )
}
