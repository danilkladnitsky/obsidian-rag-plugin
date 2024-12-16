import { ThemeProvider } from "@gravity-ui/uikit"
import { MemoryRouter, Route, Routes } from "react-router-dom"

import { IObsidianApp } from "../common/types"

import "@gravity-ui/uikit/styles/fonts.css"
import "@gravity-ui/uikit/styles/styles.css"
import { Api } from "./api/api"
import { AppContextProvider } from "./context/AppContext.context"
import "./index.css"
import { Layout } from "./layout/Layout"
import { QueryPage } from "./pages/QueryPage/QueryPage"
import { StartPage } from "./pages/StartPage/StartPage"

export interface AppProps {
    obsidianApp: IObsidianApp
}
export const App = ({ obsidianApp }: AppProps) => {
    return (
        <ThemeProvider theme="dark">
            <AppContextProvider api={Api} obsidianApp={obsidianApp}>
                <MemoryRouter basename="/">
                    <Layout>
                        <Routes>
                            <Route path="/" element={<StartPage />} />
                            <Route path="/query" element={<QueryPage />} />
                        </Routes>
                    </Layout>
                </MemoryRouter>
            </AppContextProvider>
        </ThemeProvider>

    )
}
