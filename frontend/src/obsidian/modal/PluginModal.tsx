import { App, Modal } from "obsidian"
import { createRoot, Root } from "react-dom/client"

import { ReactApp } from "../../web-app/ReactApp"

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
