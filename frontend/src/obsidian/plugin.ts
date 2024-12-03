import { App, Modal, Plugin } from "obsidian"
import { createRoot, Root } from "react-dom/client"

import { IObsidianRagPlugin, RenderUIFn } from "./types"

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

export class ObsidianPlugin extends Plugin implements IObsidianRagPlugin {
    renderUIFn: RenderUIFn

    init(renderUIFn: RenderUIFn): void {
        this.renderUIFn = renderUIFn
    }

    getUIModal(): UIModal {
        return new UIModal(this.app, this.renderUIFn)
    }

    static setUIRenderFn(renderUIFn: RenderUIFn) {
        this.prototype.renderUIFn = renderUIFn
    }

    async onload() {
        this.addRibbonIcon("dice", "Open Modal", () => {
            this.getUIModal().open()
        })

        this.addCommand({
            id: "display-modal",
            name: "Display Modal",
            callback: () => {
                this.getUIModal().open()
            }
        })
    }
}
