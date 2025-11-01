import re
import time


def create_unique_slug(title: str) -> str:
    # clean the title (remove special characters and convert to lowercase)
    clean_title = re.sub(r"[^\w\s-]", "", title).strip().lower()

    # replace spaces with hyphen to combine words
    clean_title = re.sub(r"\s+", "-", clean_title)

    timestamp = str(int(time.time()))

    return f"{clean_title}-{timestamp}"
