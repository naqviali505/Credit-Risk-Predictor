import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import axios from "axios";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  formControl: {
    minWidth: "120px",
  },
});

const CreditPredict = () => {
  const classes = useStyles();
  const [creditRisk, setCreditRisk] = useState(0);
  const [formData, setFormData] = useState({
    person_age: "",
    person_income: "",
    person_emp_length: "",
    loan_amnt: "",
    loan_int_rate: "",
    loan_status: "",
    cb_person_cred_hist_length: "",
    debt_to_income_ratio: "",
    person_home_ownership: "",
    loan_intent: "",
    loan_grade: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      "http://127.0.0.1:5000/predict_credit_risk",
      formData
    );
    console.log(res.data.credit_risk_percent * 100, "oooo");
    setCreditRisk(res.data.credit_risk_percent * 100);
    console.log(formData);
  };

  const handleResetScore = () => {
    setCreditRisk(0);
  };

  return (
    <>
      {creditRisk === 0 ? (
        <form className={classes.form} onSubmit={handleSubmit}>
          <h1 style={{ margin: "2rem" }}> Predict Credit Risk Score</h1>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Person's age"
                type="number"
                name="person_age"
                value={formData.person_age}
                onChange={handleChange}
                margin="dense"
              />
              <TextField
                label="Person's income"
                type="number"
                name="person_income"
                value={formData.person_income}
                onChange={handleChange}
                margin="dense"
              />
              <TextField
                label="Person's employment length"
                type="number"
                name="person_emp_length"
                value={formData.person_emp_length}
                onChange={handleChange}
                margin="dense"
              />

              <TextField
                label="Loan amount"
                type="number"
                name="loan_amnt"
                value={formData.loan_amnt}
                onChange={handleChange}
                margin="dense"
              />
              <TextField
                label="Loan interest rate"
                type="number"
                name="loan_int_rate"
                value={formData.loan_int_rate}
                onChange={handleChange}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                className={classes.formControl}
                margin="dense"
                style={{ width: "15rem" }}
              >
                <InputLabel id="loan-status-label">Loan status</InputLabel>
                <Select
                  labelId="loan-status-label"
                  id="loan-status"
                  name="loan_status"
                  value={formData.loan_status}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Approved</MenuItem>
                  <MenuItem value={0}>Denied</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Credit history length"
                type="number"
                name="cb_person_cred_hist_length"
                value={formData.cb_person_cred_hist_length}
                onChange={handleChange}
                margin="dense"
              />
              <TextField
                label="Debt-to-income ratio"
                type="number"
                name="debt_to_income_ratio"
                value={formData.debt_to_income_ratio}
                onChange={handleChange}
                margin="dense"
              />
              <FormControl
                className={classes.formControl}
                margin="dense"
                style={{ width: "15rem" }}
              >
                <InputLabel id="person-home-ownership-label">
                  Person's home ownership
                </InputLabel>
                <Select
                  labelId="person-home-ownership-label"
                  id="person-home-ownership"
                  name="person_home_ownership"
                  value={formData.person_home_ownership}
                  onChange={handleChange}
                >
                  <MenuItem value="RENT">Rent</MenuItem>
                  <MenuItem value="MORTGAGE">Mortgage</MenuItem>
                  <MenuItem value="OWN">Own</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                className={classes.formControl}
                margin="dense"
                style={{ width: "15rem" }}
              >
                <InputLabel id="loan-intent-label">Loan intent</InputLabel>
                <Select
                  labelId="loan-intent-label"
                  id="loan-intent"
                  name="loan_intent"
                  value={formData.loan_intent}
                  onChange={handleChange}
                >
                  <MenuItem value="DEBT_CONSOLIDATION">
                    Debt consolidation
                  </MenuItem>
                  <MenuItem value="HOME_IMPROVEMENT">Home improvement</MenuItem>
                  <MenuItem value="BUSINESS">Business</MenuItem>
                  <MenuItem value="EDUCATION">Education</MenuItem>
                  <MenuItem value="PERSONAL">Personal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <h1> Credit Risk Score : {creditRisk}</h1>

          <Button
            onClick={handleResetScore}
            variant="contained"
            color="primary"
          >
            {" "}
            Test another Credit Risk Score
          </Button>
        </div>
      )}
    </>
  );
};

export default CreditPredict;
