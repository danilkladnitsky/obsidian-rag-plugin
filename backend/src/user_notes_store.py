from typing import List

from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


class UserNotesStore:
    def __init__(self, config):
        self.vectorstores = {}
        self.top_k = config["user_notes_store"]["top_k"]
        self.embeddings = HuggingFaceEmbeddings(
            model_name=config["user_notes_store"]["embedder_model_name"]
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=config["user_notes_store"]["chunker"]["chunk_size"],
            chunk_overlap=config["user_notes_store"]["chunker"]["chunk_overlap"],
            add_start_index=True,
            is_separator_regex=False,
            separators=config["user_notes_store"]["chunker"]["separators"],
        )

    def add_documents(self, user_id: str, documents: List[str]):
        chunks = self.text_splitter.split_documents(
            [Document(page_content=doc) for doc in documents]
        )

        if user_id not in self.vectorstores:
            self.vectorstores[user_id] = FAISS.from_documents(chunks, self.embeddings)
        else:
            self.vectorstores[user_id].add_documents(chunks)

    def retrieve_chunks(self, user_id: str, query: str):
        if user_id not in self.vectorstores:
            raise ValueError(
                "Индекс пуст. Добавьте документы перед выполнением запроса."
            )
        return self.vectorstores[user_id].similarity_search(query, k=self.top_k)
