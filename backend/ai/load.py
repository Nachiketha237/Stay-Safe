import os
from langchain.indexes import VectorstoreIndexCreator
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader

import pickle


def load_txt(): 
    file_name = os.path.join(os.path.dirname(__file__), './output.txt')
    loaders = [TextLoader(file_name, encoding="utf8")]

    index = VectorstoreIndexCreator(
        embedding=HuggingFaceEmbeddings(model_name='all-MiniLM-L12-v2'), 
        text_splitter=RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    ).from_loaders(loaders)

    return index

vectorstore_index = load_txt()


with open("vectorstore_index.pkl", "wb") as f:
    pickle.dump(vectorstore_index, f)






