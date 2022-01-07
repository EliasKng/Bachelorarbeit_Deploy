from typing import List


def generate_summary_statements(selected: List[int], vis_data: List[dict]):

    # Extract kkeys and labels as list
    keys = list(vis_data[0].keys())
    labels = [datum[keys[0]] for datum in vis_data]

    # Sort selected indices ascending
    selected.sort()

    filtered_vis_data = [vis_data[index] for index in selected]

    print(filtered_vis_data)

    print(generate_list_value(keys, filtered_vis_data[0][keys[0]], filtered_vis_data[0][keys[1]]))


def generate_list_value(keys, label, value):
    print(keys, label, value)

    return label + ' had ' + keys[1] + ' of ' + str(value)
