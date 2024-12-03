import { useAppContext } from "../../context/AppContext.context"

export const StartPage = () => {
    const { obsidianApp: { vault } } = useAppContext()

    return (
        <div>
            {vault.getName()}
        </div>

    )
}
