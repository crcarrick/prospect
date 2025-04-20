import os

from fastapi import FastAPI, Response

app = FastAPI()


@app.get("/")
def read_root() -> Response:
    return Response(content=os.environ["VISIONARY_BUCKET_NAME"])
