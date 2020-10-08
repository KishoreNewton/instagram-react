import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMorePostsFromUserStyles } from '../../styles';
import { LoadingLargeIcon } from '../../icons';
import GridPost from '../shared/GridPost';
import {
  GET_POST,
  GET_MORE_POST_FROM_USER,
} from '../../graphql/queries';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

function MorePostsFromUser({ postId }) {
  const variables = { postId };
  const { data, loading } = useQuery(GET_POST, { variables });
  const classes = useMorePostsFromUserStyles();
  const [
    getMorePostFromUser,
    { data: morePosts, loading: loading2 },
  ] = useLazyQuery(GET_MORE_POST_FROM_USER);

  useEffect(() => {
    if (loading) return;
    const userId = data.posts_by_pk.user.id;
    const postId = data.posts_by_pk.id;
    const variables = { userId, postId };
    getMorePostFromUser({ variables });
  }, [data, loading, getMorePostFromUser]);

  return (
    <div className={classes.container}>
      {loading || loading2 ? (
        <LoadingLargeIcon />
      ) : (
        <>
          <Typography
            color="textSecondary"
            variant="subtitle2"
            component="h2"
            gutterBottom
            className={classes.typography}
          >
            More Posts from{' '}
            <Link
              to={`/${data.posts_by_pk.user.username}`}
              className={classes.link}
            >
              {data.posts_by_pk.user.username}
            </Link>
          </Typography>
        
          <article className={classes.article}>
            <div className={classes.postContainer}>
              {morePosts?.posts.map((post) => (
                <GridPost key={post.id} post={post} />
              ))}
            </div>
          </article>
        </>
      )}
    </div>
    
  );
}

export default MorePostsFromUser;
