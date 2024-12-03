import { IObsidianApp } from "../common/types"

import { AppContextProvider } from "./context/AppContext.context"
import { StartPage } from "./pages/StartPage/StartPage"

export interface AppProps {
    obsidianApp: IObsidianApp
}

export const App = ({ obsidianApp }: AppProps) => {
    return (
        <AppContextProvider obsidianApp={obsidianApp}>
            <StartPage />
        </AppContextProvider>
    )
}
