import React from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import { Grid, Paper, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { FeedbackMessage, CreateMessageFeedbackType } from '../model';
import { ComponentType } from './message.container';

export const Message: React.FunctionComponent<ComponentType> = props => {

  const handleSearch = () => {
  }
  const handleCreate = () => {
    props.createMessage(props.message);
  }
  const handleChangeDescription = (e: any) => {
    props.updateMessage({
        ...props.message,
        description: e.target.value,
    });
  }
  const getAlertMessage = (feedback: FeedbackMessage) => {
    switch (feedback.id) {
      case CreateMessageFeedbackType.USER_CREATED_SUCCESSFULLY :
        return (
        <div>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {feedback.message} — <strong>check it out!</strong>
          </Alert>
        </div>)
      case CreateMessageFeedbackType.USER_ALREADY_EXIST :
        return (
        <div>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {feedback.message} — <strong>check it out!</strong>
          </Alert>
        </div>)
        case CreateMessageFeedbackType.CONSTRAINT_VIOLATION :
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
              label="description" 
              value={props.message.description || ''}
              onChange={handleChangeDescription}
            />
          </div>
          { getAlertMessage(props.feedback) }
          <div>
            <Button variant="contained" color="primary" onClick={handleCreate}>
                Create
            </Button>
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};
