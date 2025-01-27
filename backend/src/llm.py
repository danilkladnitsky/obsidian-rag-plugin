import logging
import os
from typing import List

from openai import OpenAI

logger = logging.getLogger(__name__)


class LLM:
    def __init__(self, config):
        self.model = config["llm"]["model"]
        self.prompt = config["llm"]["system_prompt"]
        self.temperature = config["llm"]["temperature"]
        self.top_p = config["llm"]["top_p"]
        self.max_tokens = config["llm"]["max_tokens"]
        self.llm_client = OpenAI(
            base_url=config["llm"]["base_url"],
            api_key=os.environ[config["llm"]["api_key"]],
        )

    @staticmethod
    def build_prompt(chunks: List[str], query: str) -> str:
        prompt = "Отвечай используя контекст:\n"
        for i, context in enumerate(chunks):
            prompt += f"Контекст {i + 1}: {context}\n"
        prompt += f"Вопрос: {query}\nНе упоминай, что ты пользуешься контекстом\nПодробный Ответ: "
        return prompt

    def get_output(self, chunks: List[str], query: str) -> str:
        try:
            prompt = self.build_prompt(chunks, query)
            print(prompt)
            response = self.llm_client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self.prompt},
                    {"role": "user", "content": prompt},
                ],
                temperature=self.temperature,
                top_p=self.top_p,
                max_tokens=self.max_tokens,
                stream=False,
            )

            print(response)

            generated_response = ""
            for chunk in response:
                if chunk.choices[0].delta.content is not None:
                    generated_response += chunk.choices[0].delta.content

            logger.info(f"Generated response: {generated_response[:30]}...")
            return generated_response
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            return ""
