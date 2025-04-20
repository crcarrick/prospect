from fastapi import FastAPI, Response

app = FastAPI()


@app.get("/")
def read_root() -> Response:
    return Response(content="Hello World", media_type="text/plain")
