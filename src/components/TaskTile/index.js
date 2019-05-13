import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CheckCircle from '@material-ui/icons/CheckCircleOutlined'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  gridImage: {
    paddingRight: "16px" 
  },
  userImage: {
    borderRadius: '50%',
    backgroundColor: 'grey',
    height: '50px',
    width: '50px'
  },
  checkIcon: {
    height: '100%',
    float: 'right',
  }
})

class TaskTile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, task, taskId } = this.props;
    return (
      <Paper className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={2} className={classes.gridImage}>
            <div className={classes.userImage}></div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {task.title && <Typography variant="subheading">{task.title}</Typography>}
              {task.dueDate && <Typography variant="caption">{task.dueDate}</Typography>}
            </div>
          </Grid>
          <Grid item xs={4}>
            <CheckCircle  className={classes.checkIcon} fontSize="large" color="disabled"/>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(TaskTile)
