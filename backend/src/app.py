from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .api_model import UserNotesInput, UserQueryInput
from .llm import LLM
from .user_notes_store import UserNotesStore


def get_app(config):
    llm = LLM(config)
    user_notes_store = UserNotesStore(config)
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=config["server"]["middleware"]["allow_origins"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.post("/api/user-notes")
    async def add_user_notes(input_data: UserNotesInput):
        try:
            user_notes_store.add_documents(input_data.user_id, input_data.documents)
            return {"status": "success"}
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Ошибка при добавлении документов: {str(e)}"
            )

    @app.post("/api/user-notes/suggestion")
    async def get_user_notes_suggestions(input_data: UserQueryInput):
        try:
            docs = user_notes_store.retrieve_chunks(
                input_data.user_id, input_data.query
            )
            chunks = [chunk.page_content for chunk in docs]
            llm_output = llm.get_output(chunks, input_data.query)

            return {"suggestions": chunks, "llm_output": llm_output}
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Ошибка при извлечении чанков: {str(e)}"
            )

    @app.get("/api/ping")
    async def ping():
        return "pong"

    return app
