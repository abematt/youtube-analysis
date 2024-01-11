from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import googleapiclient.discovery
import googleapiclient.errors

from dotenv import load_dotenv
import os

load_dotenv()

api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=DEVELOPER_KEY)


app = FastAPI()

origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/comments")
def get_comments(videoId: str):

    request = youtube.commentThreads().list(
    part="snippet",
    videoId=videoId,
    maxResults=100
    )
    response = request.execute()

    commentList = []
    for item in response['items']:
        commentList.append(item['snippet']['topLevelComment']['snippet']['textDisplay'])
    
    return response

