import React from 'react';
import { getUsersAction, createUserAction, displayUserAction, searchUserAction, removeUserAction} from './store/actionCreators'
import './App.css';
import { connect } from 'react-redux';
import {Dispatch} from 'redux'
import { Box, createStyles, Grid, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import { UPDATE_USER } from './store/actionTypes';
import { UserListContainer } from './components/user.list.container.';
import { AppBar } from '@material-ui/core';
import PropTypes from "prop-types";
import { UserContainer } from './components/user.container';

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

    this.state = {
      value: 0,
    }
  }

  public componentDidMount() {
      this.props.getUsers();
  }

  public componentDidUpdate() {
  }

  handleChange = (event: any, newValue: number) => {
    this.setState({value: newValue});
  };

	public render() { 
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
            <UserContainer />
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

