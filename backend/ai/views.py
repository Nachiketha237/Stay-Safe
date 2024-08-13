from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.contrib.sessions.models import Session
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import json
import pickle
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA



# Load the serialized index



def load_index(): 
    with open("vectorstore_index.pkl", "rb") as f:
      index = pickle.load(f)

    return index

# Load the index once at startup
index = load_index()
GOOGLE_API_KEY = 'AIzaSyCZnH6Uc95wMAQLlRUuE2Kbf56nVL_Iz9U'
llm = ChatGoogleGenerativeAI(model="models/gemini-1.5-flash-001", google_api_key=GOOGLE_API_KEY)
chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type='stuff',
    retriever=index.vectorstore.as_retriever(),
    input_key='question'
)


@csrf_exempt
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def query(request):
    print("query")
    if request.method == 'GET':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    question = request.data.get('content')
    
    if not question:
        return JsonResponse({'error': 'No question provided'}, status=400)

    try:
        # Retrieve the current context from the session
        session_id = request.session.session_key or request.session.create()
        context = request.session.get('context', '')

        # Pass the current context along with the question to the AI chain
        response = chain.run({"question": question, "context": context})
        
        # Update the context with the new response
        new_context = context + " " + question + " " + response
        
        # Store the updated context back in the session
        request.session['context'] = new_context

        return JsonResponse({'response': response})
    except Exception as e:
        return JsonResponse({'error': 'Internal server error'}, status=500)

# @csrf_exempt
# @api_view(['POST'])
# @permission_classes([permissions.AllowAny])
# def query(request):
#     print("query")
#     if request.method == 'GET':
#         return JsonResponse({'error': 'Method not allowed'}, status=405)

    
#     question = request.data.get('content')
    
#     if not question:
#         return JsonResponse({'error': 'No question provided'}, status=400)

#     try:
#         response = chain.run({"question": question})
#         return JsonResponse({'response': response})
#     except Exception as e:
#         return JsonResponse({'error': 'Internal server error'}, status=500)


def predict_flood(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        # Sample data for training
        x = pd.read_csv("./kerala.csv")
        y1 = list(x["YEAR"])
        x1 = list(x["Jun-Sep"])
        z1 = list(x["JUN"])
        w1 = list(x["MAY"])

        flood = []
        june = []
        sub = []

        for i in range(len(x1)):
            flood.append(1 if x1[i] > 2400 else 0)
            june.append(z1[i] / 3)
            sub.append(abs(w1[i] - z1[i]))

        x["flood"] = flood
        x["avgjune"] = june
        x["sub"] = sub

        X = x.iloc[:, [16, 20, 21]].values
        y = x.iloc[:, 19].values

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

        scaler = StandardScaler()
        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)

        Lr = LogisticRegression()
        Lr.fit(X_train, y_train)

        features = [
            [data['q1'], data['w1'], data['e1']],
            [data['q2'], data['w2'], data['e2']],
            [data['q3'], data['w3'], data['e3']]
        ]

        features = scaler.transform(features)
        predictions = Lr.predict(features)

        results = []
        for prediction in predictions:
            if prediction == 1:
                results.append("Possibility of severe flood")
            else:
                results.append("No chance of severe flood")

        return JsonResponse({'predictions': results})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)