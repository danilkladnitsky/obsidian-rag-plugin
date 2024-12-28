import { App, Modal } from "obsidian"
import React from "react"
import { createRoot, Root } from "react-dom/client"

import { App as ReactApp } from "web-app/App"

export class PluginModal extends Modal {
    private root: Root | null = null

    constructor(app: App) {
        super(app)
        this.app = app
    }

    onOpen() {
        const { contentEl } = this

        const container = document.createElement("div")
        contentEl.appendChild(container)

        this.root = createRoot(container)
        this.root.render(<ReactApp obsididanApp={this.app} />)
    }

    onClose() {
        if (this.root) {
            this.root.unmount()
            this.root = null
        }
        this.contentEl.empty()
    }
}
