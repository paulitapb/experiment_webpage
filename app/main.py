import uvicorn

if __name__ == "__main__":
    uvicorn.run("server.app:app", host="0.0.0.0", port=8000, reload=True)

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()


# origins = [
#     "http://localhost:3000",
#     # Añade otros orígenes permitidos aquí
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# async def root():
#     return {"message": "Hello World"}


# @app.post("/api/addTutorialTime")
# async def add_tutorial_time():
#     return {"message": "Tutorial time added succesfully"}


# @app.post("/api/addUser")
# async def add_user():
#     return {"message": "Tutorial time added succesfully"}


# @app.post("/api/addRating")
# async def add_rating():
#     return {"message": "Tutorial time added succesfully"}


# @app.post("/api/checkUser")
# async def check_user():
#     return {"message": "Tutorial time added succesfully"}


# @app.post("/api/hasRated")
# async def has_rated():
#     return {"message": "Tutorial time added succesfully"}


# @app.post("/api/getCurrentSerie")
# async def get_current_serie():
#     return {"message": "Tutorial time added succesfully"}