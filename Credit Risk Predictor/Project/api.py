from flask import Flask, jsonify, request
import pandas as pd
import pickle
from flask_cors import CORS


X = pd.read_csv('X.csv')

# load the trained model from the pickle file
with open('cr_model.pkl', 'rb') as file:
    rf_model = pickle.load(file)


app = Flask(__name__)
cors = CORS(app)


@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello, World!"})


@app.route('/predict_credit_risk', methods=['POST'])
def predict_credit_risk():
    # get input data from request
    data = request.json

    # convert data to input dataframe
    input_data = {
        'person_age': [data['person_age']],
        'person_income': [data['person_income']],
        'person_emp_length': [data['person_emp_length']],
        'loan_amnt': [data['loan_amnt']],
        'loan_int_rate': [data['loan_int_rate']],
        'loan_status': [data['loan_status']],
        'cb_person_cred_hist_length': [data['cb_person_cred_hist_length']],
        'debt_to_income_ratio': [data['debt_to_income_ratio']],
        'person_home_ownership': [data['person_home_ownership']],
        'loan_intent': [data['loan_intent']],
        'loan_grade': [data['loan_grade']]
    }
    input_df = pd.DataFrame.from_dict(input_data)
    input_df = pd.get_dummies(
        input_df, columns=['person_home_ownership', 'loan_intent', 'loan_grade'])
    missing_cols = set(X.columns) - set(input_df.columns)
    for col in missing_cols:
        input_df[col] = 0
    input_df = input_df[X.columns]

    # predict credit risk
    credit_risk_percent = rf_model.predict(input_df)

    # return result as json
    result = {'credit_risk_percent': credit_risk_percent[0]}
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
