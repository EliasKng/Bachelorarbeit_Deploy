from zipfile import ZipFile, Path
import pandas as pd

# import zipfile
# print(f.name)
# print(f.readlines())
# df = pd.read_csv('Archive.zip')
# print(df)


# with ZipFile('Archive.zip', 'r') as archive:
#     fileNames = archive.namelist()
#     for fileName in fileNames:
#         file = archive.open(fileName)
#         print(file.read())
#         file.close()


# pass in the specific file name
# to the open method
with ZipFile("Archive.zip") as myzip:
    data = myzip.open("6763.csv")

#Now, we can read in the data
df = pd.read_csv(data)
print(df)