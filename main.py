from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows requests from the frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
# Replace with your actual WeatherAPI key
WEATHERAPI_KEY = "851ec8b03e454c39b2665148241512"
BASE_URL = "http://api.weatherapi.com/v1/current.json"

@app.get("/weather")
async def get_weather(city: str):
    """
    Fetch weather details for a specific city using WeatherAPI.
    """
    url = f"{BASE_URL}?key={WEATHERAPI_KEY}&q={city}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Error fetching weather data")
