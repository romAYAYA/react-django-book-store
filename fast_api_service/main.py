import datetime
from functools import wraps
from typing import Union

from fastapi import FastAPI, Request
import sqlite3

app = FastAPI()


def block_ddos(func: callable):
    @wraps(func)
    def wrapper(*args, **kwargs):
        request = kwargs['request']
        client_ip = request.client.host
        time_now = datetime.datetime.now().timestamp()

        conn = sqlite3.connect('logs.db')
        cur = conn.cursor()
        cur.execute('''
        CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY,
        client_ip TEXT,
        time_now TIMESTAMP)''')

        second_ago = datetime.datetime.now().timestamp() - 1

        cur.execute(
            "SELECT count(*) FROM logs WHERE client_ip=? AND time_now > ?", (client_ip, second_ago)
        )
        login_count = cur.fetchone()[0]

        if login_count > 100:
            raise Exception("Too many requests per second")

        cur.execute("INSERT INTO logs (client_ip, time_now) VALUES (?, ?)", (client_ip, time_now))

        conn.commit()
        res = func(*args, **kwargs)
        return res

    return wrapper


@app.get("/")
@block_ddos
def read_root(request: Request):
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
