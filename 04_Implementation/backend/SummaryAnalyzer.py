import string
import nltk



def analyze_summary(summary: string, vis_schema):
    tokenize_sentences(summary)


def tokenize_sentences(summary):
    return nltk.sent_tokenize(summary)