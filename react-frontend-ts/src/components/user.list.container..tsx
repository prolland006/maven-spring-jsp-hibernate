import {Dispatch} from 'redux'
import { connect } from 'react-redux';
import { createUserAction, displayUserAction, getUsersAction, removeUserAction, searchUserAction } from '../store/actionCreators';
import { UPDATE_USER } from '../store/actionTypes';
import { UserList } from './user.list.component';
import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core';

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
export const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(UserList as any));
