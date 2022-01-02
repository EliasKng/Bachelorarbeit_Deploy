import string

from fastapi import FastAPI
import json
from pydantic import BaseModel
from DataStorage import *
from SummaryStorage import *
from fastapi.middleware.cors import CORSMiddleware
from SummaryAnalyzer import analyze_summary

class DataRequestBody(BaseModel):
    values_row_name: DataStorage.ValuesRowName
    index_row_name: DataStorage.IndexRowName
    aggregate: DataStorage.Aggregate

class AnalyzeSummaryRequestBody(BaseModel):
    summary: str
    vis_data: list


data_storage = DataStorage()
summary_storage = SummaryStorage()


# ----- API and endpoints -----
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/data")
async def data(request_body: DataRequestBody):
    prepared_df = data_storage.prepare_dataframe(
        request_body.index_row_name.value,
        request_body.values_row_name.value,
        request_body.aggregate.value
    )

    #Process title, which is sent, but also used as identifier to find the correct summary
    title = get_title(
        request_body.aggregate.value,
        request_body.values_row_name.value,
        request_body.index_row_name.value
    )
    summary = summary_storage.get_summary(title)

    json_string = prepared_df.to_json(orient='table')
    json_obj = json.loads(json_string)
    json_obj["title"] = title
    json_obj["summary"] = summary
    return json_obj

@app.post("/analyze-summary")
async def analyzesummary(requestBody: AnalyzeSummaryRequestBody):
    sentence_mappings = analyze_summary(requestBody.summary, requestBody.vis_data)
    return sentence_mappings

# --- help functions ---
def get_title(aggregate, values_row_name, index_row_name):
    return '{aggregate} of {values_row_name} by {index_row_name}'.format(
        aggregate=aggregate, values_row_name=values_row_name, index_row_name=index_row_name)