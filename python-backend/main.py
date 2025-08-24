from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import random
import requests
from sentence_transformers import SentenceTransformer

print("Hello from python-backend!")

app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")

# Allow requests from frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request and response models
class DefinitionRequest(BaseModel):
    word: str
    user_definition: str

class DefinitionResponse(BaseModel):
    dictionary_definitions: list[str]
    scores: list[float]

class WordResponse(BaseModel):
    word: str

# POST endpoint
@app.post("/api/definition-score", response_model=DefinitionResponse)
def getDefinitionScore(request: DefinitionRequest):
    # testing
    print(f"definition requested for: {request.word}")
    print(f"User tried to define it as: {request.user_definition}")
    response_text = f"The dictionary tried to remember the word: {request.word}.\nIt forgot."
    
    url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{request.word}"
    print(f"Requesting this api link: {url}")

    r = requests.get(url)
    print(r.json())

    user_definition = [request.user_definition]
    word_definitions = []
    for meaning in r.json()[0]["meanings"]:
        for definition in meaning["definitions"]:
            word_definitions.append(definition["definition"])

    print(user_definition)
    print(word_definitions)

    # Compute embeddings for both lists
    user_embedding = model.encode(user_definition)
    definition_embeddings = model.encode(word_definitions)

    # Compute cosine similarities
    similarities = model.similarity(user_embedding, definition_embeddings)

    scores = []
    for i, definition in enumerate(definition_embeddings):
        scores.append(similarities[0][i])

    return {
        "dictionary_definitions": word_definitions, # test test
        "scores": scores
    }

@app.get("/api/word",response_model=WordResponse)
def getWord():
    with open('english_10k.json', 'r', encoding="utf-8") as file:
        data = json.load(file)
        words = data["words"]
        # Sample a random word from monkeytype 10k list. 
        # If the definition exists within the dictionary API, return the word. Else, keep re-rolling
        word_with_definition_found = False
        while (not word_with_definition_found):
            word = words[random.randint(0,len(words)-1)]
            url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
            r = requests.get(url)
            try:
                word_definitions = [x["definition"] for x in r.json()[0]["meanings"][0]["definitions"]]
                print(f"{len(word_definitions)} definitions found for the word: {word}")
                word_with_definition_found = True
                return {
                    "word": word
                }
            except:
                print(f"There was trouble getting the definition of {word}")
    