import React from 'react';
import { getUsersAction, createUserAction, displayUserAction, searchUserAction, removeUserAction} from './store/actionCreators'
import './App.css';
import { connect } from 'react-redux';
import {Dispatch} from 'redux'
import Button from '@material-ui/core/Button';
import { Box, createStyles, Grid, Paper, Tab, Tabs, TextField, Typography, withStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { FeedbackMessage, CreateUserFeedbackType } from './model';
import { UPDATE_USER } from './store/actionTypes';
import { UserListContainer } from './components/user.list.container.';
import { AppBar } from '@material-ui/core';
import PropTypes from "prop-types";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};


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

    this.state = {
      value: 0,
    }
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
  handleChange = (event: any, newValue: number) => {
    this.setState({value: newValue});
  };

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
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Users" />
            <Tab label="Messages" />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
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
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
        <h1 className = "text-center"> Messages</h1>
        </TabPanel>
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
    removeUser: (id: number) => removeUserAction(dispatch, id),
  }
};

export type UserComponentType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {classes: any};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(App as any));

