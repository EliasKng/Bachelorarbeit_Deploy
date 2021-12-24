from DataStorage import *


class CreateTrainingData:
    def __init__(self, data_storage: DataStorage):
        self.data_storage = data_storage

    def createTrainingData(
            self,
            index_row_name: DataStorage.IndexRowName,
            values_row_name: DataStorage.ValuesRowName,
            aggregate: DataStorage.Aggregate
    ):
        df = self.data_storage.prepare_dataframe(index_row_name, values_row_name, aggregate)
        print(df)

    def createTrainingDataForDataset(self):
        for index_row_name in DataStorage.IndexRowName:
            for values_row_name in DataStorage.ValuesRowName:
                for aggregate in DataStorage.Aggregate:
                    self.createTrainingData(index_row_name, values_row_name, aggregate)
