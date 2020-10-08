import React, {
  useState,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useCallback
} from 'react';
import { useFeedPageStyles } from '../styles';
import Layout from '../components/shared/Layout';
import UserCard from '../components/shared/UserCard';
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton';
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions';
import { Hidden } from '@material-ui/core';
import LoadingScreen from '../components/shared/LoadingScreen';
import { LoadingLargeIcon } from '../icons';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../App';
import { GET_FEED } from '../graphql/queries';
import usePageBottom from '../utils/usePageBottom';

const FeedPost = lazy(() => import('../components/feed/FeedPost'));

function FeedPage() {
  const classes = useFeedPageStyles();
  const [isEndOfFeed, setEndOfFeed] = useState(false);
  const { me, feedIds } = useContext(UserContext);
  const variables = { limit: 2, feedIds };
  const { data, loading, fetchMore } = useQuery(GET_FEED, {
    variables,
  });
  const isPageBottom = usePageBottom();

  const handleUpdateQuery = useCallback(
    (prev, { fetchMoreResult }) => {
      if (fetchMoreResult.posts.length === 0) {
        setEndOfFeed(true);
        return prev;
      }
      return { posts: [...prev.posts, ...fetchMoreResult.posts] };
    },
    [],
  );

  useEffect(() => {
    if (!isPageBottom || !data) return;
    const lastTimestamp =
      data.posts[data.posts.length - 1].created_at;
    const variables = { limit: 2, feedIds, lastTimestamp };
    fetchMore({
      variables,
      updateQuery: handleUpdateQuery,
    });
  }, [isPageBottom, data, fetchMore, handleUpdateQuery, feedIds]);

  if (loading) return <LoadingScreen />;
  return (
    <Layout>
      <div className={classes.container}>
        <div>
          {data.posts.map((post, index) => (
            <Suspense key={post.id} fallback={<FeedPostSkeleton />}>
              <FeedPost index={index} post={post} />
            </Suspense>
          ))}
        </div>
        <Hidden smDown>
          <div className={classes.sidebarContainer}>
            <div className={classes.sidebarWrapper}>
              <UserCard user={me} avatarSize={50} />
              <FeedSideSuggestions />
            </div>
          </div>
        </Hidden>
        {!isEndOfFeed && <LoadingLargeIcon />}
      </div>
    </Layout>
  );
}

export default FeedPage;
