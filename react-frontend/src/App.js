import React from 'react';
import { connect } from 'react-redux';
import { getUsers, getUsersReceived } from './redux';
import './App.css';
import UserComponent from './components/UserComponent';

function App() {
  return (
    <div className="App">
        <UserComponent getUsers={getUsers} />
    </div>
  );
}

const mapStateToProps = state => state.users;
const mapDispatchToProps = {getUsers};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserComponent);

export default AppContainer;
