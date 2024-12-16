import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { IObsidianApp } from "../common/types"

import { App } from "./App"

const mockObsidianApp: Partial<IObsidianApp> = {
    vault: {
        read(file) {
            return "Lorem ipsum dolor sit"
        },
        getName() {
            return "web-vault"
        },
        getMarkdownFiles() {
            return [{
                basename: "/sample-vault/notes/january/01.md",
                name: "01.md"
            }]
        }
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App obsidianApp={mockObsidianApp as IObsidianApp} />
    </StrictMode>
)
