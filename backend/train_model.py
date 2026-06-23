import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, accuracy_score
import joblib

df = pd.read_csv("clean_transactions.csv")

train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)

X_train = train_df["Description"]
y_train = train_df["Category"]
X_test = test_df["Description"]
y_test = test_df["Category"]


model_pipline = Pipeline([
    ("vectorizer", TfidfVectorizer()),
    ('classifier', LinearSVC())
])

print("training the model")
model_pipline.fit(X_train, y_train)
print("training complete!")

y_pred = model_pipline.predict(X_test)

accuracy = accuracy_score(y_test, y_pred=y_pred)
print(f"Overall Accuracy: {accuracy * 100:.2f}%")

print("\nDetailed Classification Report:")
print(classification_report(y_test, y_pred))

joblib.dump(model_pipline, "smart_budget_model.joblib")
print("The model is saved succefully")