from fastapi import FastAPI
from pydantic import BaseModel
from enum import Enum
from DataStorage import *


class IndexRowNames(str, Enum):
    Segment = 'Segment'
    Country = 'Country'
    Product = 'Product'
    DiscountBand = "Discount Band"


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


@app.post("/data")
async def data(request_body: DataRequestBody):
    return data_storage.prepare_dataframe(
        request_body.index_row_name,
        request_body.values_row_name,
        request_body.aggregate
    )
