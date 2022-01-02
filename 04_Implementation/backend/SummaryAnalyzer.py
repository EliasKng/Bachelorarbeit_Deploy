import json
import string
import nltk
from typing import List


def analyze_summary(summary: string, vis_data: List[dict]):
    sentences = tokenize_sentences(summary)
    keys = list(vis_data[0].keys())
    labels = [datum[keys[0]] for datum in vis_data]

    sentence_mappings = []

    for sentence in sentences:
        sentence_mappings.append(analyze_sentence(sentence, labels, keys))

    return sentence_mappings


def analyze_sentence(sentence, labels, keys):
    mapped_labels = []
    for label in labels:
        if label in sentence:
            mapped_labels.append(label)

    # Only search for mapped keys if there were no labels found in the sentence
    # This prevents for every: "The Product with the highest Sales was Amarillo" to highlight Sales and Product
    mapped_keys = []
    if len(mapped_labels) == 0:
        for key in keys:
            if key in sentence:
                mapped_keys.append(key)

    return {
        "sentence": sentence,
        "mapped_labels": mapped_labels,
        "mapped_keys": mapped_keys
    }


def tokenize_sentences(summary):
    return nltk.sent_tokenize(summary)