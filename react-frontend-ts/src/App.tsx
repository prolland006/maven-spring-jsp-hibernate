import React from 'react';
import { getUsersAction } from './store/actionCreators'
import './App.css';
import { connect } from 'react-redux';
import {Dispatch} from 'redux'

export class App extends React.Component<UserComponentType, any> {

   public componentDidMount() {
        this.props.getUsers();
    }

	public render() { 
  		return (
            <div>
                <h1 className = "text-center"> Users List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>

                            <td> User Id</td>
                            <td> User First Name</td>
                            <td> User Last Name</td>
                            <td> User Email Id</td>
                        </tr>

                    </thead>
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

