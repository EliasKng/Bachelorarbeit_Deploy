from DataStorage import *


class CreateTrainingData:
    def __init__(self, data_storage: DataStorage):
        self.data_storage = data_storage

    def createTrainingTable(
            self,
            index_row_name: DataStorage.IndexRowName,
            values_row_name: DataStorage.ValuesRowName,
            aggregate: DataStorage.Aggregate
    ):
        return self.data_storage.prepare_dataframe(index_row_name, values_row_name, aggregate)

    def createTrainingDataForDataset(self):
        i = 0
        for index_row_name in DataStorage.IndexRowName:
            for values_row_name in DataStorage.ValuesRowName:
                for aggregate in DataStorage.Aggregate:
                    df = self.createTrainingTable(index_row_name, values_row_name, aggregate)
                    title = '{aggregate} of {values_row_name} by {index_row_name}'.format(
                        aggregate=aggregate, values_row_name=values_row_name, index_row_name=index_row_name)
                    print(df)
                    print(title)
        print(i)



data_storage = DataStorage()
CreateTrainingData(data_storage).createTrainingDataForDataset()