import { Card, Link, Text } from "@gravity-ui/uikit"

import "./QueryResult.css"

interface Props {
    suggestion: string
}

export const QueryResult = ({ suggestion }: Props) => {
    return (
        <Card theme="success" className="result">
            <Text variant="code-1">
                <Link href="#">
                    Нет ссылки
                </Link>
            </Text>
            <Text className="output" variant="body-1" ellipsis ellipsisLines={2}>
                {suggestion}
            </Text>
        </Card>
    )
}
