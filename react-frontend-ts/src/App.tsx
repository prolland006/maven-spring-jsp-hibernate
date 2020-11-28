import React from 'react';
import { getUsersAction } from './store/actionCreators'
import './App.css';
import { connect } from 'react-redux';
import {Dispatch} from 'redux'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

export class App extends React.Component<UserComponentType, any> {

   public componentDidMount() {
        this.props.getUsers();
    }

	public render() { 
  		return (
            <div>
                <h1 className = "text-center"> Users</h1>
                <form>
                  <div>
                    <TextField id="standard-basic" label="firstname" />
                  </div>
                  <div>
                    <TextField id="standard-basic" label="lastname" />
                  </div>
                  <div>
                    <TextField id="standard-basic" label="address" />
                  </div>
                  <div>
                    <TextField id="standard-basic" label="pays" />
                  </div>
                  <div>
                    <TextField id="standard-basic" label="age" />
                  </div>
                  <div>
                    <Button variant="contained" color="primary">
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


const mapStateToProps = (state: GlobalState) => {
    return state.userState;
}

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => {
  return {
    getUsers: () => getUsersAction(dispatch),
  }
};

export type UserComponentType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

