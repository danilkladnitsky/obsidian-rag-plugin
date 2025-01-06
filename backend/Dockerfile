FROM python:3.11

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENV LLM_API_KEY=$LLM_API_KEY

EXPOSE 8000