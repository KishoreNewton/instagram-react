import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useMutation } from '@apollo/react-hooks'
import { Button } from '@material-ui/core';
import { useFollowButtonStyles } from '../../styles';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../graphql/mutations';

function FollowButton({ side, id }) {
  const classes = useFollowButtonStyles({ side });
  const { currentUserId, followingIds } = useContext(UserContext);
  const isAlreadyFollowing = followingIds.some(
    (followingId) => (followingId === id),
  );
  const [isFollwing, setFollowing] = useState(isAlreadyFollowing);
  const [followUser] = useMutation(FOLLOW_USER)
  const [unfollowUser] = useMutation(UNFOLLOW_USER)
  const variables = {
    userIdToFollow: id,
    currentUserId
  }

  function handleFollowUser () {
    setFollowing(true)
    followUser({ variables })
  }

  function handleFollowingUser() {
    setFollowing(false)
    unfollowUser({ variables })
  }

  const followButton = (
    <Button
      variant={side ? 'text' : 'contained'}
      color="primary"
      className={classes.button}
      onClick={handleFollowUser}
      fullWidth
    >
      Follow
    </Button>
  );

  const followingButton = (
    <Button
      variant={side ? 'text' : 'outlined'}
      color="primary"
      className={classes.button}
      onClick={handleFollowingUser}
      fullWidth
    >
      Following
    </Button>
  );

  return isFollwing ? followingButton : followButton;
}

export default FollowButton;
