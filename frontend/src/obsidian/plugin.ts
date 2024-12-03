import { App, Modal } from "obsidian"
import { createRoot, Root } from "react-dom/client"

import { RenderUIFn } from "./types"

export class UIModal extends Modal {
    private root: Root | null = null
    private renderUIFn: RenderUIFn

    constructor(app: App, renderUIFn: RenderUIFn) {
        super(app)
        this.renderUIFn = renderUIFn
    }

    onOpen() {
        const { contentEl } = this

        const container = document.createElement("div")
        contentEl.appendChild(container)

        this.root = createRoot(container)
        this.root.render(this.renderUIFn(this.app))
    }

    onClose() {
        if (this.root) {
            this.root.unmount()
            this.root = null
        }
        this.contentEl.empty()
    }
}
