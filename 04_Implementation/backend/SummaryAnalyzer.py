import json
import string
import nltk
from typing import List


def analyze_summary(summary: string, vis_data: List[dict]):
    sentences = tokenize_sentences(summary)

    # Extract kkeys and labels as list
    keys = list(vis_data[0].keys())
    labels = [datum[keys[0]] for datum in vis_data]

    sentence_mappings = []

    for sentence in sentences:
        sentence_mappings.append(analyze_sentence(sentence, labels, keys))

    return sentence_mappings


def analyze_sentence(sentence, labels, keys):
    # Split each key and label by whitespace ('Discount Band' => ['Discount', 'Band'])
    keys_tokenized = [key.split() for key in keys]
    labels_tokenized = [label.split() for label in labels]

    mapped_labels = []
    for label, label_tokens in zip(labels, labels_tokenized):
        are_all_tokens_in_sentence = True
        for label_token in label_tokens:
            if label_token not in sentence:
                are_all_tokens_in_sentence = False
                continue

        if are_all_tokens_in_sentence:
            mapped_labels.append(label)

    # Only search for mapped keys if there were no labels found in the sentence
    # This prevents for every: "The Product with the highest Sales was Amarillo" to highlight Sales and Product
    mapped_keys = []
    if len(mapped_labels) == 0:
        for key, key_tokens in zip(keys, keys_tokenized):
            are_all_tokens_in_sentence = True
            for key_token in key_tokens:
                if key_token not in sentence:
                    are_all_tokens_in_sentence = False
                    continue

            if are_all_tokens_in_sentence:
                mapped_keys.append(key)

    return {
        "sentence": sentence,
        "mapped_labels": mapped_labels,
        "mapped_keys": mapped_keys
    }


def tokenize_sentences(summary):
    return nltk.sent_tokenize(summary)