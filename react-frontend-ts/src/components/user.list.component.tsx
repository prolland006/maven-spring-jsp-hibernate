import * as React from 'react';
import { UserComponentType } from '../App';
import { Avatar, Grid, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { List } from '@material-ui/core';

export const UserList: React.FunctionComponent<UserComponentType> = props => {

  const handleDisplayUser = (e: any, id: number) => {
    props.displayUser(id);
  }

  const { classes } = props;

  return (
    <Grid item xs={12} sm={6}>
    <Paper className={classes.paper}>
      <List dense={false}>
        {
          props.users ? props.users.map(
            user => (
              <ListItem
                key={user.id}
                selected={props.selectedUserId!==-1 && props.selectedUserId===user.id}
              >
                <ListItemAvatar>
                  <Avatar src="/broken-image.jpg" />
                </ListItemAvatar>
                  <ListItemText
                    primary={user.id+' '+user.firstname+' '+user.lastname+' '+user.email} 
                    onClick={(e) => handleDisplayUser(e, user.id)} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
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
