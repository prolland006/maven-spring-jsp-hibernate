import React from 'react';
import { getUsersAction, createUserAction } from './store/actionCreators'
import './App.css';
import { connect } from 'react-redux';
import {Dispatch} from 'redux'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { FeedbackMessage, FeedbackType } from './model';

export class App extends React.Component<UserComponentType, any> {

  public state = {
    user: {
      id: -1,
      firstname: '',
      lastname: '',
      address: '',
      email: '',
      age: 0,
    }
  }

  constructor(props: UserComponentType) {
    super(props);

    // Cette liaison est nécéssaire afin de permettre
    // l'utilisation de `this` dans la fonction de rappel.
    this.handleCreateUser = this.handleCreateUser.bind(this);
  }

  public componentDidMount() {
      this.props.getUsers();
  }

  public componentDidUpdate() {
    console.log('component did update');
    console.log(this.props);
  }


  handleCreateUser() {
    console.log('create user');
    console.log(this.state);
    this.props.createUser(this.state.user);
  }

  handleChangeFirstname = (e: any) => {
    this.setState({
      user: {
        ...this.state.user,
        firstname: e.target.value,
      }
    });
  }
  handleChangeLastname = (e: any) => {
    this.setState({
      user: {
        ...this.state.user,
        lastname: e.target.value
      }
    });
  }
  handleChangeAge = (e: any) => {
    this.setState({
      user: {
        ...this.state.user,
        age: e.target.value
      }
    });
  }
  handleChangeAddress = (e: any) => {
    this.setState({
      user: {
        ...this.state.user,
        address: e.target.value
      }
    });
  }

  getAlertMessage = (feedback: FeedbackMessage) => {
    console.log('getAlertMessage');
    console.log(feedback);
    switch (feedback.id) {
      case FeedbackType.USER_CREATED_SUCCESSFULLY :
        return (
        <div>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {feedback.message} — <strong>check it out!</strong>
          </Alert>
        </div>)
      case FeedbackType.USER_ALREADY_EXIST :
        return (
        <div>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            {feedback.message} — <strong>check it out!</strong>
          </Alert>
        </div>)
        case FeedbackType.CONSTRAINT_VIOLATION :
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
  		return (
            <div>
                <h1 className = "text-center"> Users</h1>
                <form>
                  <div>
                    <TextField 
                      id="standard-basic" 
                      label="firstname" 
                      onChange={this.handleChangeFirstname}
                    />
                  </div>
                  <div>
                    <TextField 
                      id="standard-basic" 
                      label="lastname"
                      onChange={this.handleChangeLastname}
                    />
                  </div>
                  <div>
                    <TextField 
                      id="standard-basic" 
                      label="address" 
                      onChange={this.handleChangeAddress}
                    />
                  </div>
                  <div>
                    <TextField 
                      id="standard-basic" 
                      label="age"
                      onChange={this.handleChangeAge}
                    />
                  </div>
                  { this.getAlertMessage(this.props.feedback) }
                  <div>
                    <Button variant="contained" color="primary" onClick={this.handleCreateUser}>
                        Create User
                    </Button>
                    <Button variant="contained" color="primary">
                        Display User
                    </Button>
                  </div>
                </form>
                <table className = "table table-striped">
                    <tbody>
                        {
                            this.props.users ? this.props.users.map(
                                user => 
                                <tr key = {user.id}>
                                        <td> {user.id}</td>   
                                        <td> {user.firstname}</td>   
                                        <td> {user.lastname}</td>   
                                        <td> {user.email}</td>   
                                </tr>
                            ) : ''
                        }

                    </tbody>
                </table>
            </div>

		);
	}
}


const mapStateToProps = (state: GlobalState) => {console.log('dispathc to prop');console.log(state);
    return state.userState;
}

const mapDispatchToProps = (dispatch: Dispatch<BaseAction>) => {
  return {
    getUsers: () => getUsersAction(dispatch),
    createUser: (user: IUser) => createUserAction(dispatch, user),
  }
};

export type UserComponentType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

