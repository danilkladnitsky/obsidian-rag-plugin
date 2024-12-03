import { IObsidianRagPlugin, RenderUIFn } from "obsidian/types"

export const setupPlugin = (ui: RenderUIFn, plugin: unknown) => {
    (plugin as IObsidianRagPlugin).init(ui)
    return plugin
}
