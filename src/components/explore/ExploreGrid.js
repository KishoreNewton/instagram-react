import { Typography } from '@material-ui/core';
import { UserContext } from '../../App';
import React, { useContext } from 'react';
import { useExploreGridStyles } from '../../styles';
import { LoadingLargeIcon } from '../../icons';
import GridPost from '../shared/GridPost';
import { useQuery } from '@apollo/react-hooks';
import { EXPLORE_POSTS } from '../../graphql/queries';

function ExploreGrid() {
  const classes = useExploreGridStyles();
  const { feedIds } = useContext(UserContext);
  const variables = { feedIds };
  const {data, loading} = useQuery(EXPLORE_POSTS, { variables });

  return (
    <>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        component="h2"
        gutterBottom
        className={classes.typography}
      >
        Explore
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={classes.article}>
          <div className={classes.postContainer}>
            {data.posts.map(
              (post) => (
                <GridPost key={post.id} post={post} />
              ),
            )}
          </div>
        </article>
      )}
    </>
  );
}

export default ExploreGrid;
