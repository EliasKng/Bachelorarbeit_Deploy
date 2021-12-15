from fastapi import FastAPI

app = FastAPI()


@app.get("/hello/{name}")
async def hello(name):
    return "welcome3 " + name
