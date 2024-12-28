import { ReactNode } from "react"

import { IObsidianApp } from "common/types"

export type RenderUIFn = (obsidianApp: IObsidianApp) => ReactNode

export interface IObsidianRagPlugin {

    init(renderUIFn: RenderUIFn): void
}
