import { Card, Link, Text } from "@gravity-ui/uikit"

import { Suggestion } from "web-app/domain"

import "./QueryResult.css"

interface Props {
    suggestion: Suggestion
}

export const QueryResult = ({ suggestion }: Props) => {
    return (
        <Card theme="success" className="result">
            <Text variant="code-1">
                <Link href="#">
                    {suggestion.noteUrl}
                </Link>
            </Text>
            <Text className="output" variant="body-1" ellipsis ellipsisLines={2}>
                {suggestion.textContent}
            </Text>
        </Card>
    )
}
