from typing import List

from pydantic import BaseModel


class UserNotesInput(BaseModel):
    user_id: str
    documents: List[str]


class UserQueryInput(BaseModel):
    user_id: str
    query: str
