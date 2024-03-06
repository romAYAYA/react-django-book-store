from concurrent.futures import ThreadPoolExecutor

import requests


def test_requests():
    try:
        res = requests.get("http://127.0.0.1:8000/")
        if res.status_code != 200:
            print("Failed to get response from the server")
    except Exception as e:
        pass


num_threads = 150

with ThreadPoolExecutor(max_workers=num_threads) as executor:
    futures = [executor.submit(test_requests) for _ in range(num_threads)]

    for future in futures:
        future.result()















