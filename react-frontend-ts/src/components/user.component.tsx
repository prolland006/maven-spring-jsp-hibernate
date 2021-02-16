import React from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import { Grid, Paper, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { FeedbackMessage, CreateUserFeedbackType } from '../model';
import { ComponentType } from './user.container';

export const User: React.FunctionComponent<ComponentType> = props => {

  const handleSearchUser = () => {
    props.searchUser(props.user);
  }

  const handleCreateUser = () => {
    props.createUser(props.user);
  }

  const handleChangeFirstname = (e: any) => {
    props.updateUser({
        ...props.user,
        firstname: e.target.value,
    });
  }
  const handleChangeLastname = (e: any) => {
    props.updateUser({
      ...props.user,
        lastname: e.target.value
    });
  }
  const handleChangeAge = (e: any) => {
    props.updateUser({
      ...props.user,
        age: e.target.value
    });
  }
  const handleChangeAddress = (e: any) => {
    props.updateUser({
      ...props.user,
        address: e.target.value
    });
  }
  const handleChangeCompany = (e: any) => {
    props.updateUser({
      ...props.user,
        company: e.target.value
    });
  }
  const getAlertMessage = (feedback: FeedbackMessage) => {
    switch (feedback.id) {
      case CreateUserFeedbackType.USER_CREATED_SUCCESSFULLY :
        return (
        <div>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {feedback.message} — <strong>check it out!</strong>
          </Alert>
        </div>)
      case CreateUserFeedbackType.USER_ALREADY_EXIST :
        return (
        <div>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {feedback.message} — <strong>check it out!</strong>
          </Alert>
        </div>)
        case CreateUserFeedbackType.CONSTRAINT_VIOLATION :
          return (
          <div>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              {feedback.message} — <strong>check it out!</strong>
            </Alert>
          </div>)
      default :
          return(
          <div>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {feedback.message} — <strong>check it out!</strong>
            </Alert>
          </div>)
    }
  }

  const { classes } = props;

  return (
    <Grid item xs={12} sm={6}>
      <Paper className={classes.paper}>
        <form>
          <div>
            <TextField 
              id="standard-basic" 
              label="firstname" 
              value={props.user.firstname || ''}
              onChange={handleChangeFirstname}
            />
          </div>
          <div>
            <TextField 
              id="standard-basic" 
              label="lastname"
              value={props.user.lastname || ''}
              onChange={handleChangeLastname}
            />
          </div>
          <div>
            <TextField 
              id="standard-basic" 
              label="address" 
              value={props.user.address || ''}
              onChange={handleChangeAddress}
            />
          </div>
          <div>
            <TextField 
              id="standard-basic" 
              label="company" 
              value={props.user.company || ''}
              onChange={handleChangeCompany}
            />
          </div>
          <div>
            <TextField 
              id="standard-basic" 
              label="age"
                value={props.user.age}
              onChange={handleChangeAge || undefined}
            />
          </div>
          { getAlertMessage(props.feedback) }
          <div>
            <Button variant="contained" color="primary" onClick={handleCreateUser}>
                Create
            </Button>
            <Button variant="contained" color="primary" onClick={handleSearchUser}>
                Search
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};
