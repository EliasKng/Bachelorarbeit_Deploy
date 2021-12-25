from DataStorage import *
from os import path


class CreateTrainingData:
    def __init__(self, data_storage: DataStorage):
        self.data_storage = data_storage

    def create_training_table(
            self,
            index_row_name: DataStorage.IndexRowName,
            values_row_name: DataStorage.ValuesRowName,
            aggregate: DataStorage.Aggregate
    ):
        return self.data_storage.prepare_dataframe(index_row_name, values_row_name, aggregate)

    def create_training_data(self):
        data = []
        for index_row_name in DataStorage.IndexRowName:
            for values_row_name in DataStorage.ValuesRowName:
                for aggregate in DataStorage.Aggregate:
                    df = self.create_training_table(index_row_name.value, values_row_name.value, aggregate.value)
                    title = '{aggregate} of {values_row_name} by {index_row_name}'.format(
                        aggregate=aggregate, values_row_name=values_row_name, index_row_name=index_row_name)
                    data.append((title, df))
        return data


def save_training_data(training_data):
    assert path.exists('')
    i = 6763
    for (title, df) in training_data:
        with open('nlg/Titles/' + str(i) + '.txt', 'w') as text_file:
            text_file.write(title)
            text_file.close()
        df.to_csv('nlg/Tables/' + str(i) + '.csv')
        i += 1



data_storage = DataStorage()
ctd = CreateTrainingData(data_storage)
data = ctd.create_training_data()
save_training_data(data)
