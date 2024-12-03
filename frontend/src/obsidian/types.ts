import { ReactNode } from "react"

import { IObsidianApp } from "common/types"

// eslint-disable-next-line no-unused-vars
export type RenderUIFn = (obsidianApp: IObsidianApp) => ReactNode

export interface IObsidianRagPlugin {
    // eslint-disable-next-line no-unused-vars
    init(renderUIFn: RenderUIFn): void
}
