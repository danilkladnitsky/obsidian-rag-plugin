import React from "react"

import { IObsidianApp } from "common/types"
import { RenderUIFn } from "obsidian/types"

import { App } from "./App"

export interface IWebApp {
    obsidian: IObsidianApp
}

export const RenderAppFn: RenderUIFn = (obsidianApp: IObsidianApp) => {
    return React.createElement(App, { obsidianApp })
}
