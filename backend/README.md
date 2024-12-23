# Backend

## How to run
* install packages by `pip3 install -r requirements.txt`
* run server by `python3 src/app.py`

## How to check
### add notes
```bash
curl -X POST "http://localhost:8000/user-notes" -H "Content-Type: application/json" -d '{"user_id": "1", "documents": ["Байкал - это самое больше озеро.", "Площадь водной поверхности Байкала — 31 722 км."]}'
```

### get chunks and suggestion
```bash
curl -X GET "http://localhost:8000/user-notes/suggestion" -H "Content-Type: application/json" -d '{"user_id": "1", "query": "Какова площадь Байкала?"}'
# {"suggestions":["Байкал - это самое больше озеро.","Площадь водной поверхности Байкала — 31 722 км."],"llm_output":"Площадь водной поверхности Байкала составляет 31 722 км²."}
```
