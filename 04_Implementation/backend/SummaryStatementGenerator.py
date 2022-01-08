from itertools import combinations
from typing import List
from nltk.tokenize.treebank import TreebankWordDetokenizer
import math


def generate_summary_statements(selected: List[int], vis_data: List[dict]):

    # Extract kkeys and labels as list
    keys = list(vis_data[0].keys())
    labels = [datum[keys[0]] for datum in vis_data]

    # Sort selected indices ascending
    selected.sort()

    filtered_vis_data = [vis_data[index] for index in selected]
    filtered_labels = [datum[keys[0]] for datum in filtered_vis_data]

    list_value_sentences: str = generate_list_values(filtered_vis_data, keys)

    if len(filtered_vis_data) > 1:
        compared_values_absolute_sentences: str = compare_values_absolute(filtered_vis_data, keys)
        compared_values_relative_sentences: str = compare_values_relative(filtered_vis_data, keys)
        compared_values_maximum_sentences: str = compare_values_max(filtered_vis_data, keys, filtered_labels)
        compared_values_minimum_sentences: str = compare_values_min(filtered_vis_data, keys, filtered_labels)

        return {
            'list': list_value_sentences,
            'compare_absolute': compared_values_absolute_sentences,
            'compare_relative': compared_values_relative_sentences,
            'compare_max': compared_values_maximum_sentences,
            'compare_min': compared_values_minimum_sentences,
        }

    return {
        'list': list_value_sentences
    }


def generate_list_values(filtered_data: List[dict], keys):
    list_value_sentences = []
    for datum in filtered_data:
        list_value_sentences.append(generate_list_value(keys, datum[keys[0]], datum[keys[1]]))

    return '. '.join(list_value_sentences) + '.'


def generate_list_value(keys, label, value):
    return TreebankWordDetokenizer().detokenize([label, 'has', keys[1], 'of', str(value)])


def compare_values_absolute(filtered_data: List[dict], keys):
    # Create pairs of values
    tuples = combinations(filtered_data, 2)

    compare_value_absolute_sentences = []

    for data_tuple in tuples:
        compare_value_absolute_sentences.append(compare_value_absolute(data_tuple[0], data_tuple[1], keys))

    return '. '.join(compare_value_absolute_sentences) + '.'


def compare_value_absolute(data_first: dict, data_second: dict, keys):
    # keys=e.g.[product,unitsSold]

    if data_first[keys[1]] > data_second[keys[1]]:
        higher = data_first
        lower = data_second
    elif data_first[keys[1]] < data_second[keys[1]]:
        lower = data_first
        higher = data_second
    elif data_first[keys[1]] == data_second[keys[1]]:
        tokens = ['The', keys[1], 'of', data_first[keys[0]], 'and', data_second[keys[0]], 'is', 'equal']
        return TreebankWordDetokenizer().detokenize(tokens)

    value_difference = millify(higher[keys[1]] - lower[keys[1]])
    tokens = ['The', keys[1], 'of', higher[keys[0]], 'is', 'higher',
              'by', str(value_difference), ',', 'compared', 'to', lower[keys[0]]]
    return TreebankWordDetokenizer().detokenize(tokens)


def compare_values_relative(filtered_data: List[dict], keys):
    # Create pairs of values
    tuples = combinations(filtered_data, 2)

    compare_value_relative_sentences = []

    for data_tuple in tuples:
        compare_value_relative_sentences.append(compare_value_relative(data_tuple[0], data_tuple[1], keys))

    return '. '.join(compare_value_relative_sentences) + '.'


def compare_value_relative(data_first: dict, data_second: dict, keys):
    # keys=e.g.[product,unitsSold]

    if data_first[keys[1]] > data_second[keys[1]]:
        higher = data_first
        lower = data_second
    elif data_first[keys[1]] < data_second[keys[1]]:
        lower = data_first
        higher = data_second
    elif data_first[keys[1]] == data_second[keys[1]]:
        tokens = ['The', keys[1], 'of', data_first[keys[0]], 'and', data_second[keys[0]], 'is', 'equal']
        return TreebankWordDetokenizer().detokenize(tokens)

    factor = (higher[keys[1]] / lower[keys[1]])
    factor_in_percent = str(int(round((factor - 1) * 100, 0))) + '%'

    tokens = ['The', keys[1], 'of', higher[keys[0]], 'compared', 'to', lower[keys[0]], 'is',
              factor_in_percent, 'higher']
    return TreebankWordDetokenizer().detokenize(tokens)


def compare_values_max(filtered_data: List[dict], keys, labels):
    # Filter the element which has the maximum value (e.g. Units sold)
    max_data = max(filtered_data, key=lambda x: x[keys[1]])
    labels_without_max = labels.copy()
    labels_without_max.remove(max_data[keys[0]])
    labels_without_max_string = list_words(labels_without_max)

    tokens = [max_data[keys[0]], 'has the maximum', keys[1], 'compared to', labels_without_max_string, '.']
    return TreebankWordDetokenizer().detokenize(tokens)


def compare_values_min(filtered_data: List[dict], keys, labels):
    # Filter the element which has the minimum value (e.g. Units sold)
    min_data = min(filtered_data, key=lambda x: x[keys[1]])
    labels_without_min = labels.copy()
    labels_without_min.remove(min_data[keys[0]])
    labels_without_min_string = list_words(labels_without_min)

    tokens = [min_data[keys[0]], 'has the minimum', keys[1], 'compared to', labels_without_min_string, '.']
    return TreebankWordDetokenizer().detokenize(tokens)


def list_words(words: List[str]):
    if len(words) > 2:
        return ', '.join(words[:-1]) + ' and ' + words[-1]
    if len(words) == 2:
        return ' and '.join(words)
    if len(words) == 1:
        return words[0]
    return None


def millify(n):
    millnames = ['', ' Thousand', ' Million', ' Billion', ' Trillion']
    n = float(n)
    millidx = max(0,min(len(millnames)-1,
                        int(math.floor(0 if n == 0 else math.log10(abs(n))/3))))

    return '{:.2f}{}'.format(n / 10**(3 * millidx), millnames[millidx])