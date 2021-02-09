import * as React from 'react';
import { Avatar, Grid, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { List } from '@material-ui/core';
import { ComponentType } from './message.list.container';

export const MessageList: React.FunctionComponent<ComponentType> = props => {

  const handleDisplayUser = (e: any, id: number) => {
    /**props.displayUser(id);*/
  }

  const handleRemoveUser = (e: any, id: number) => {
    /**props.removeUser(id);*/
  }

  const { classes } = props;

  return (
    <Grid item xs={12} sm={6}>
    <Paper className={classes.paper}>
      <List dense={false}>
        {
          props.messages ? props.messages.map(
            message => (
              <ListItem
                key={message.id}
                selected={props.selectedMessageId!==-1 && props.selectedMessageId===message.id}
              >
                <ListItemAvatar>
                  <Avatar src="/broken-image.jpg" />
                </ListItemAvatar>
                  <ListItemText
                    primary={message.id+' '+message.time+' '+message.description} 
                    onClick={(e) => handleDisplayUser(e, message.id)} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"
                    onClick={(e) => handleRemoveUser(e, message.id)}                    
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
          )) : ''
        }
      </List>
    </Paper>
  </Grid>
  );
};
