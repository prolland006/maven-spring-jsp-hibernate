import React from 'react';
import { Dispatch } from 'redux';
import './App.css';
import { Box, createStyles, Grid, Tab, Tabs, Typography, withStyles } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import PropTypes from "prop-types";
import { UserContainer } from './components/user.container';
import { MessageListContainer } from './components/message.list.container';
import { MessageContainer } from './components/message.container';
import { UserListContainer } from './components/user.list.container';
import { connect } from 'react-redux';
import { getMessagesAction, getUsersAction } from './store/actionCreators';

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
          <Typography component={'div'}>{children}</Typography>
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

export class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      value: 0,
    }
  }

  public componentDidMount() {
      this.props.getUsers();
      this.props.getMessages();
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
          <Grid container spacing={3}>
            <MessageContainer />
            <MessageListContainer />
          </Grid>
        </TabPanel>
      </div>
    );
	}
}


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
  getMessages: () => getMessagesAction(dispatch),
}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(App as any));
