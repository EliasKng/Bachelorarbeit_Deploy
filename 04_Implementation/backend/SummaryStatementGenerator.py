from typing import List


def generate_summary_statements(selected: List[int], vis_data: List[dict]):

    # Extract kkeys and labels as list
    keys = list(vis_data[0].keys())
    labels = [datum[keys[0]] for datum in vis_data]

    print(keys)
    print(labels)
    print(selected)
