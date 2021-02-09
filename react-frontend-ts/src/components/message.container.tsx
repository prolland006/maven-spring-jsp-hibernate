import {Dispatch} from 'redux'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { createMessageAction, getMessagesAction } from '../store/actionCreators';
import { UPDATE_MESSAGE } from '../store/actionTypes';
import { Message } from './message.component';

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
  return state.messageState;
}

const mapDispatchToProps = (dispatch: Dispatch<BaseAction>) => {
  return {
    getMessages: () => getMessagesAction(dispatch),
    createMessage: (message: IMessage) => createMessageAction(dispatch, message),
    updateMessage: (message: IMessage) => dispatch({type: UPDATE_MESSAGE, payload: message}),
  }
};
export type ComponentType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {classes: any};

export const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(Message as any));
