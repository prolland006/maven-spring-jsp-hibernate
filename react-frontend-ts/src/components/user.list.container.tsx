import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { createUserAction, displayUserAction, getUsersAction, removeUserAction, searchUserAction } from '../store/actionCreators';
import { Dispatch } from 'redux';
import { UPDATE_USER } from '../store/actionTypes';
import { UserList } from './user.list.component';

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


export const mapStateToProps = (state: GlobalState) => {
  return state.userState;
}

export const mapDispatchToProps = (dispatch: Dispatch<BaseAction>) => {
return {
  getUsers: () => getUsersAction(dispatch),
  createUser: (user: IUser) => createUserAction(dispatch, user),
  displayUser: (id: number) => displayUserAction(dispatch, id),
  searchUser: (user: IUser) => searchUserAction(dispatch, user),
  updateUser: (user: IUser) => dispatch({type: UPDATE_USER, payload: user}),
  removeUser: (id: number) => removeUserAction(dispatch, id),
}
};

export type ComponentType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {classes: any};

export const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(UserList as any));