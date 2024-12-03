import { ObsidianPlugin } from "obsidian/plugin"
import { setupPlugin } from "setup"
import { RenderAppFn } from "web-app"

export default setupPlugin(RenderAppFn, ObsidianPlugin)
