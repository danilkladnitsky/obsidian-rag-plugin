from typing import List

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from pydantic import BaseModel

app = FastAPI()

origins = ["http://localhost:5173", "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# TODO: remove hardcode
class UserNotesStore:
    def __init__(self):
        self.vectorstore = None
        self.documents = {}
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    def add_documents(self, user_id: str, documents: List[str]):
        # TODO: add settings to configure chunker
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        docs = [Document(page_content=doc) for doc in documents]
        chunks = text_splitter.split_documents(docs)

        if user_id not in self.documents:
            self.documents[user_id] = []

        if self.vectorstore is None:
            self.vectorstore = FAISS.from_documents(chunks, self.embeddings)
        else:
            self.vectorstore.add_documents(chunks)

        self.documents[user_id].extend(documents)

    def retrieve_chunks(self, query: str, top_k: int = 5):
        if not self.vectorstore:
            raise ValueError(
                "Индекс пуст. Добавьте документы перед выполнением запроса."
            )
        return self.vectorstore.similarity_search(query, k=top_k)


user_notes_store = UserNotesStore()


class UserNotesInput(BaseModel):
    user_id: str
    documents: List[str]


@app.post("/user-notes")
async def add_user_notes(input_data: UserNotesInput):
    try:
        user_notes_store.add_documents(input_data.user_id, input_data.documents)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Ошибка при добавлении документов: {str(e)}"
        )


@app.get("/user-notes/suggestion")
async def get_user_notes_suggestions(
    query: str = Query(..., description="Запрос пользователя"),
):
    try:
        chunks = user_notes_store.retrieve_chunks(query)
        return {"suggestions": [chunk.page_content for chunk in chunks]}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Ошибка при извлечении чанков: {str(e)}"
        )


@app.get("/ping")
async def ping():
    return "pong"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
