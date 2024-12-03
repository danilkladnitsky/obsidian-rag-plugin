import { Box, Text } from "@gravity-ui/uikit"
import React from "react"

import "./Layout.css"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box className="wrapper">
            <Box className="layout">
                <Box className="header">
                    <Text variant="subheader-2">Obsidian RAG Plugin</Text>
                    <Text variant="code-1">ITMO LLM course</Text>
                </Box>
                <Box className="content">{children}</Box>
            </Box>
        </Box>
    )
}
