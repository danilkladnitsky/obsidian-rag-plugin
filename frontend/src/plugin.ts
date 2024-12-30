import { App, Modal, Plugin } from "obsidian"
import { Root, createRoot } from "react-dom/client"

import { RenderUIFn } from "obsidian/types"
import { RenderAppFn } from "web-app"

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

export default class MyPlugin extends Plugin {
    async onload() {  
        // This creates an icon in the left ribbon.
           const ribbonIconEl =  this.addRibbonIcon("brain", "Obsidian Rag Plugin", () => {
            // Called when the user clicks the icon.
                new UIModal(this.app, RenderAppFn).open()
        })
        // Perform additional things with the ribbon
        ribbonIconEl.addClass("my-plugin-ribbon-class")
    }
}                   