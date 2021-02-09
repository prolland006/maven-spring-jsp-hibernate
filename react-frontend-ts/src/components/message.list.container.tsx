import {Dispatch} from 'redux'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { MessageList } from './message.list.component';
import { createMessageAction, getMessagesAction } from '../store/actionCreators';

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
  }
};

export type ComponentType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & {classes: any};

export const MessageListContainer = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(MessageList as any));
