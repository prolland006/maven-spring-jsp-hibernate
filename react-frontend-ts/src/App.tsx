import React from 'react';
import { getUsersAction, createUserAction, displayUserAction, searchUserAction} from './store/actionCreators'
import './App.css';
import { connect } from 'react-redux';
import {Dispatch} from 'redux'
import Button from '@material-ui/core/Button';
import { createStyles, Grid, Paper, TextField, withStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { FeedbackMessage, CreateUserFeedbackType } from './model';
import { UPDATE_USER } from './store/actionTypes';
import { UserListContainer } from './components/user.list.container.';

const styles = (theme: any) => createStyles({  
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export class App extends React.Component<UserComponentType, any> {

  constructor(props: UserComponentType) {
    super(props);

    // Cette liaison est nécéssaire afin de permettre
    // l'utilisation de `this` dans la fonction de rappel.
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleSearchUser = this.handleSearchUser.bind(this);
  }

  public componentDidMount() {
      this.props.getUsers();
  }

  public componentDidUpdate() {
  }

  handleSearchUser() {
    this.props.searchUser(this.props.user);
  }

  handleCreateUser() {
    this.props.createUser(this.props.user);
  }

  handleChangeFirstname = (e: any) => {
    this.props.updateUser({
        ...this.props.user,
        firstname: e.target.value,
    });
  }
  handleChangeLastname = (e: any) => {
    this.props.updateUser({
      ...this.props.user,
        lastname: e.target.value
    });
  }
  handleChangeAge = (e: any) => {
    this.props.updateUser({
      ...this.props.user,
        age: e.target.value
    });
  }
  handleChangeAddress = (e: any) => {
    this.props.updateUser({
      ...this.props.user,
        address: e.target.value
    });
  }

  getAlertMessage = (feedback: FeedbackMessage) => {
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

	public render() { 
    const { classes } = this.props;
    return (
      <div>
        <h1 className = "text-center"> Users</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <form>
                <div>
                  <TextField 
                    id="standard-basic" 
                    label="firstname" 
                    value={this.props.user.firstname || ''}
                    onChange={this.handleChangeFirstname}
                  />
                </div>
                <div>
                  <TextField 
                    id="standard-basic" 
                    label="lastname"
                    value={this.props.user.lastname || ''}
                    onChange={this.handleChangeLastname}
                  />
                </div>
                <div>
                  <TextField 
                    id="standard-basic" 
                    label="address" 
                    value={this.props.user.address || ''}
                    onChange={this.handleChangeAddress}
                  />
                </div>
                <div>
                  <TextField 
                    id="standard-basic" 
                    label="age"
                    value={this.props.user.age}
                    onChange={this.handleChangeAge || undefined}
                  />
                </div>
                { this.getAlertMessage(this.props.feedback) }
                <div>
                  <Button variant="contained" color="primary" onClick={this.handleCreateUser}>
                      Create
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleSearchUser}>
                      Search
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
          <UserListContainer />
        </Grid>
      </div>
    );
	}
}


const mapStateToProps = (state: GlobalState) => {
    return state.userState;
}

const mapDispatchToProps = (dispatch: Dispatch<BaseAction>) => {
  return {
    getUsers: () => getUsersAction(dispatch),
    createUser: (user: IUser) => createUserAction(dispatch, user),
    displayUser: (id: number) => displayUserAction(dispatch, id),
    searchUser: (user: IUser) => searchUserAction(dispatch, user),
    updateUser: (user: IUser) => dispatch({type: UPDATE_USER, payload: user}),
  }
};

export type UserComponentType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {classes: any};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(App as any));

