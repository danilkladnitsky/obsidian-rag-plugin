from src.app import get_app
from src.config import get_config

if __name__ == "__main__":
    import uvicorn

    config = get_config()
    app = get_app(config)

    uvicorn.run(
        app,
        host=config["server"]["host"],
        port=config["server"]["port"],
    )


# HOW TO RUN
# python3 backend/main.py
