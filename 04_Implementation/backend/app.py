from fastapi import FastAPI
import json
from pydantic import BaseModel
from enum import Enum
from DataStorage import *
from fastapi.middleware.cors import CORSMiddleware


class IndexRowNames(str, Enum):
    Segment = 'Segment'
    Country = 'Country'
    Product = 'Product'
    DiscountBand = "Discount Band"

    def toJSON(self):
        return json.dumps(self.__dict__)

print(IndexRowNames.__dict__)

class ValueRowNames(str, Enum):
    UnitsSold = "Units Sold"
    ManufacturingPrice = "Manufacturing Price"
    SalePrice = "Sale Price"
    GrossSales = "Gross Sales"
    Discounts = "Discounts"
    Sales = "Sales"
    Cogs = "COGS"
    Profit = "Profit"
    Month = "Month"
    Year = "Year"


class Aggregates(str, Enum):
    sum = "sum"
    mean = "mean"
    min = "min"
    max = "max"
    count = "count"


class DataRequestBody(BaseModel):
    values_row_name: ValueRowNames
    index_row_name: IndexRowNames
    aggregate: Aggregates


data_storage = DataStorage()


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
    json_string = prepared_df.to_json(orient='table')
    jsonObj = json.loads(json_string)
    return jsonObj


@app.get("/dataset-fields")
async def dataset_fields():
    a = IndexRowNames()
    print(IndexRowNames.toJSON(a))
    return 'success'


@app.get("/test")
async def data():
    return 'helloWorld'