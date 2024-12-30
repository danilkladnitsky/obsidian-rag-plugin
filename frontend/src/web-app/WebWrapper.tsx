import { Box, Label, Table, Text } from "@gravity-ui/uikit"
import React from "react"

import "./WebWrapper.css"

import mockData from "./mock/validation.json"

interface Props {
    children: React.ReactNode
}

const MOCK_TABLE_DATA = mockData.map(v => ({
    id: v.id,
    answer: v.Answer,
    question: v.Question
}))

const MOCK_TABLE_COLUMNS = [
    {
        id: "id",
        name: "ID"
    },
    {
        id: "answer",
        name: "Конспект"
    },
    {
        id: "question",
        name: "Вопрос для проверки"
    }
]

export const WebWrapper = ({ children }: Props) => {
    return (
        <Box className="web-frame">
            <Box className="web-header">
                <Text variant="subheader-3">TBD Team | LLM course ITMO</Text>
                <Label>Веб-версия</Label>
            </Box>
            <Box className="web-content">
                <Box className="web-instance">
                    {children}
                </Box>
                <Box className="web-data">
                    <Text variant="subheader-1">Веб-версия работает на основе следующих данных:</Text>
                    <Box className="web-table">
                        <Table stickyHorizontalScrollBreakpoint={200} columns={MOCK_TABLE_COLUMNS} data={MOCK_TABLE_DATA} />
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}
