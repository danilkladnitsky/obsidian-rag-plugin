import os
import yaml


def get_config():
    config_path = os.getenv("CONFIG_PATH", "config.yaml")
    with open(config_path, "r") as file:
        config = yaml.safe_load(file)

    return config

