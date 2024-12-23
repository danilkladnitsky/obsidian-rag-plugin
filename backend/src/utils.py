import re

def clean_markdown(text: str) -> str:
    # Убираем лишние markdown элементы из текста документов: 
    text = re.sub(r'#[^#]*', '', text)          # Заголовки формата #текст
    text = re.sub(r'\*\*.*?\*\*', '', text)     # Жирный текст формата **текст**
    text = re.sub(r'__.*?__', '', text)         # Жирный текст 2 формата __текст__
    text = re.sub(r'\[.*?\]\(.*?\)', '', text)  # Ссылки формата [ссылка](URL)
    text = re.sub(r'\*\s*', '', text)           # Маркеры списков формата * элемент списка
    text = re.sub(r'\n+', '\n', text)           # Лишние переносы строк
    return text.strip()                         # Пробелы по краям текста
