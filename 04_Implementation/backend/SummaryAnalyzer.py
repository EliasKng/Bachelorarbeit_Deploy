import string
import nltk



def analyze_summary(summary: string, vis_data):
    print('befpre')
    tokenize_sentences(summary)
    print('after')
    print(vis_data)


def tokenize_sentences(summary):
    return nltk.sent_tokenize(summary)