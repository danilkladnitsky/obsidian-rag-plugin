/* eslint-disable no-unused-vars */
import { QueryRequest, Suggestion, UserNote } from "web-app/domain"
import { OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const wait = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms))

export interface IAppApi {
    saveNotes: (notes: UserNote[]) => Promise<void>
    query: (query: QueryRequest) => Promise<Suggestion[]>
}

export const MockAppApi: IAppApi = {
    saveNotes: () => wait(2500),
    query: () => wait(1500).then(() => Promise.resolve([{
        noteUrl: "vault/sample-vault/notes/january/01.md",
        textContent: "Lorem ipsum"
    }]))
}

/**
 * Splits text into chunks for embedding.
 * @param {string} text - The text to split.
 * @param {string} id - The document ID.
 * @returns {Array} - Array of text chunks.
 */
function splitText(text, id) {
  const maxChunkSize = 500;
  const overlap = 100;
  const chunks = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    const chunk = text.slice(startIndex, startIndex + maxChunkSize + overlap);
    chunks.push({ pageContent: chunk, metadata: { id } });
    startIndex += maxChunkSize;
  }

  return chunks;
}

const ollamaEmbeddings = new OllamaEmbeddings({ baseUrl: "http://127.0.0.1:1143", model: "nomic-embed-text:latest" })
const vectorStore = new MemoryVectorStore(ollamaEmbeddings)

export const FrontApi: IAppApi = {
	saveNotes: (notes: UserNote[]) => {
		for (const note of notes) {
			const splitDocs = splitText(note.content, note.path);
			await vectorStore.addDocuments(splitDocs);
			splitDocs.forEach(splitDoc => fileEmbeddings.set(splitDoc.metadata.id, splitDoc));
		  }

	  console.log('Vector store initialized');
	},

    query: (query: QueryRequest) => wait(1500).then(() => Promise.resolve([{
        noteUrl: "vault/sample-vault/notes/january/01.md",
        textContent: "Lorem ipsum"
    }]))
}
