import { Box, Button, Text } from "@gravity-ui/uikit"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { UserNote } from "web-app/domain"

import { useAppContext } from "../../context/AppContext.context"

import "./StartPage.css"

export const StartPage = () => {
    const { obsidianApp: { vault }, saveNotes } = useAppContext()
    const [isLoading, setIsLoading] = useState(false)

    const nav = useNavigate()

    const handleSync = async () => {
        setIsLoading(true)
        const files = vault.getMarkdownFiles()
        const notes: Partial<UserNote>[] = files.map(file => ({
            name: file.name,
            path: file.basename
        }))

        const readPromiseList = files.map(file => vault.read(file))
        const contentList = await Promise.all(readPromiseList)
        notes.forEach((note, index) => note.content = contentList[index])

        await saveNotes(notes as UserNote[])
        setIsLoading(false)

        nav("/query")
    }

    return (
        <Box className="page">
            <Text variant="header-1" className="title">Добро пожаловать!</Text>
            <Text variant="body-2" className="description">Нажмите на кнопку, чтобы синхронизировать заметки в Obsidian</Text>
            <Button loading={isLoading} size="xl" onClick={handleSync}>
                {`Синхронизировать ${vault.getName()}`}
            </Button>
        </Box>

    )
}
