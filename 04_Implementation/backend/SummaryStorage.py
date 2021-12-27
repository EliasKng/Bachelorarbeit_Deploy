from DataStorage import *
import json
from os import path


class SummaryStorage:
    summaries_by_title = []
    titles = []
    path_to_summaries = './Summaries/'

    def __init__(self):
        summary_paths = os.listdir(self.path_to_summaries)

        for summary_path in summary_paths:
            with open(self.path_to_summaries + summary_path, 'r', encoding='utf-8') as titleFile:
                summary = json.load(titleFile)
                title = summary["title"]
                summary = ''.join(summary["summary"])
                self.summaries_by_title.append((title, summary))
                self.titles.append(title)

    def get_summary(self, title):
        index = self.titles.index(title)
        return self.summaries_by_title[index][1]
