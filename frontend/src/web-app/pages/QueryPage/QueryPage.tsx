import { Box, Button, Skeleton, Text, TextArea } from "@gravity-ui/uikit"
import { useState } from "react"

import { QueryResult } from "../../components/QueryResult/QueryResult"
import { useAppContext } from "../../context/AppContext.context"

import "./QueryPage.css"

export const QueryPage = () => {
    const { suggestions, questionAnswer, getSuggestions } = useAppContext()
    const [question, setQuestion] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleQuery = async () => {
        setIsLoading(true)
        setQuestion("")
        await getSuggestions(question)
        setIsLoading(false)
    }

    return (
        <Box className="query">
            <Text variant="subheader-2">Введите свой запрос:</Text>
            <Box className="input">
                <TextArea onChange={e => setQuestion(e.target.value)} value={question} size="xl" hasClear minRows={2} maxRows={8} />
                <Button disabled={!question} width="max" size="l" loading={isLoading} onClick={handleQuery}>Отправить</Button>
            </Box>
            {questionAnswer && (
                <Box className="questionAnswer">
                    <Text variant="subheader-2">Ответ: </Text>
                    <Text variant="body-2">
                        {questionAnswer}
                    </Text>
                </Box>
            )}
            {/* {suggestions.length > 0 && <Text variant="subheader-2">Источники:</Text>} */}
            <Box style={{ display: "none" }} className="query-list">
                {
                    isLoading
                        ? (
                                <>
                                    <Skeleton className="skeleton" />
                                    <Skeleton className="skeleton" />
                                    <Skeleton className="skeleton" />
                                </>
                            )
                        : suggestions.map((suggestion, idx) => (
                            <QueryResult key={idx} suggestion={suggestion} />
                        ))
                }

            </Box>
        </Box>
    )
}
