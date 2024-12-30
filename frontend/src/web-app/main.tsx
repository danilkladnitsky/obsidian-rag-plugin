import { TFile } from "obsidian"
import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { IObsidianApp } from "../common/types"

import { App } from "./App"
import { WebWrapper } from "./WebWrapper"
import mockData from "./mock/validation.json"

const mockObsidianApp: Partial<IObsidianApp> = {
    vault: {
        read(file: TFile) {
            const fileId = file.name as unknown as number

            return new Promise((resolve) => {
                const file = mockData.find(({ id }) => id === fileId)

                resolve(file?.Answer || "")
            })
        },
        getName() {
            return "web-vault"
        },
        getMarkdownFiles() {
            return mockData.map(({ id, Answer }) => ({
                name: id,
                basename: `${id}.md`,
                extension: ".md",
                parent: null,
                path: `${id}.md`,
                stat: {
                    ctime: 0,
                    mtime: 0,
                    size: Answer.length
                },
                vault: {
                    getName: () => "web-vault"
                }
            }))
        }
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <WebWrapper>
            <App obsidianApp={mockObsidianApp as IObsidianApp} />
        </WebWrapper>
    </StrictMode>
)
