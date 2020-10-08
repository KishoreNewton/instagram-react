import React from 'react';
import { useGridPostStyles } from '../../styles';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Img from 'react-graceful-image';

function GridPost({ post }) {
  const history = useHistory();
  const classes = useGridPostStyles();

  function handleOpenPostModal() {
    history.push({
      pathname: `/p/${post.id}`,
      state: { modal: true },
    });
  }

  const commentsCount = post.comments_aggregate.aggregate.count;
  const likesCount = post.likes_aggregate.aggregate.count;

  return (
    <div
      onClick={handleOpenPostModal}
      className={classes.gridPostContainer}
    >
      <div className={classes.gridPostOverlay}>
        <div className={classes.gridPostInfo}>
          <span className={classes.likes} />
          <Typography>{likesCount}</Typography>
        </div>
        <div className={classes.gridPostInfo}>
          <span className={classes.comments} />
          <Typography>{commentsCount}</Typography>
        </div>
      </div>
      <Img
        src={post.media}
        alt="Post Cover"
        className={classes.image}
      />
    </div>
  );
}

export default GridPost;
