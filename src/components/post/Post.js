import React, { useState, useContext } from 'react';
import { usePostStyles } from '../../styles';
import UserCard from '../shared/UserCard';
import { UserContext } from '../../App';
import {
  CommentIcon,
  MoreIcon,
  ShareIcon,
  UnlikeIcon,
  LikeIcon,
  RemoveIcon,
  SaveIcon,
} from '../../icons';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Hidden,
  TextField,
  Typography,
  Avatar,
} from '@material-ui/core';
import OptionsDialog from '../shared/OptionsDialog';
import PostSkeleton from './PostSkeleton';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { GET_POST } from '../../graphql/subscriptions';
import {
  LIKE_POST,
  UNLIKE_POST,
  SAVE_POST,
  UNSAVE_POST,
  CREATE_COMMENT,
} from '../../graphql/mutations';
import {
  formatDateToNowShort,
  formatPostDate,
} from '../../utils/formatData';

function Post({ postId }) {
  const classes = usePostStyles();
  const variables = { postId };
  const { data, loading } = useSubscription(GET_POST, { variables });
  // const [loading, setLoading] = useState(true);
  const [showOptionsDialog, setOptionsDialog] = useState(false);

  // setTimeout(() => setLoading(false), 2000);
  if (loading) return <PostSkeleton />;
  const {
    id,
    media,
    likes,
    likes_aggregate,
    saved_posts,
    created_at,
    user_id,
    user,
    caption,
    comments,
    location,
  } = data.posts_by_pk;

  const likesCount = likes_aggregate.aggregate.count;

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        <div className={classes.postHeader}>
          <UserCard user={user} location={location} avatarSize={32} />
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setOptionsDialog(true)}
          />
        </div>
        <div className={classes.postImage}>
          <img
            src={media}
            alt="Post Media"
            className={classes.image}
          />
        </div>
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton
              likes={likes}
              postId={id}
              authorId={user.id}
            />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton savedPosts={saved_posts} postId={id} />
          </div>
          <Typography className={classes.likes} varient="subtitle2">
            <span>
              {likesCount === 1 ? '1 like' : `${likesCount} likes`}
            </span>
          </Typography>
          <div
            style={{
              overflowY: 'auto',
              padding: '16px 12px',
              height: '100%',
            }}
          >
            <AuthorCaption
              user={user}
              createdAt={created_at}
              caption={caption}
            />
            {comments.map((comment) => (
              <UserComment key={comment.id} comment={comment} />
            ))}
          </div>
          <Typography
            color="textSecondary"
            className={classes.datePosted}
          >
            { formatPostDate(created_at) }
          </Typography>

          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment postId={id} />
            </div>
          </Hidden>
        </div>
      </article>
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setOptionsDialog(false)} />
      )}
    </div>
  );
}

function AuthorCaption({ user, caption, createdAt }) {
  const classes = usePostStyles();

  return (
    <div style={{ display: 'flex' }}>
      <Avatar
        src={user.profile_image}
        alt="User avatar"
        style={{
          width: 32,
          height: 32,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 10,
        }}
      >
        <Link to={`/${user.username}`}>
          <Typography
            variant="subtitle2"
            component="span"
            className={classes.username}
          >
            {user.username}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className={classes.postCaption}
            style={{ paddingLeft: 0 }}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </Link>
        <Typography
          style={{
            mariginTop: 16,
            marginBotton: 4,
            display: 'inline-block',
          }}
          color="textSecondary"
          variant="caption"
        >
          {formatDateToNowShort(createdAt)}
        </Typography>
      </div>
    </div>
  );
}

function UserComment({ comment }) {
  const classes = usePostStyles();

  return (
    <div style={{ display: 'flex', marginTop: 10 }}>
      <Avatar
        src={comment.user.profile_image}
        alt="User avatar"
        style={{
          mariginRight: 14,
          width: 32,
          height: 32,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 10,
        }}
      >
        <Link to={`/${comment.user.username}`}>
          <Typography
            variant="subtitle2"
            component="span"
            className={classes.username}
          >
            {comment.user.username}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className={classes.postCaption}
            style={{ paddingLeft: 0 }}
          >
            {comment.content}
          </Typography>
        </Link>
        <Typography
          style={{
            mariginTop: 16,
            marginBotton: 4,
            display: 'inline-block',
          }}
          color="textSecondary"
          variant="caption"
        >
          {formatDateToNowShort(comment.created_at)}
        </Typography>
      </div>
    </div>
  );
}

function LikeButton({ likes, authorId, postId }) {
  const classes = usePostStyles();
  const { currentUserId } = useContext(UserContext);
  const isAlreadyLiked = likes.some(
    ({ user_id }) => user_id === currentUserId,
  );
  const [liked, setLiked] = React.useState(isAlreadyLiked);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const variables = {
    postId,
    userId: currentUserId,
    profileId: authorId,
  };

  function handleLike() {
    setLiked(true);
    likePost({ variables });
  }

  function handleUnlike() {
    setLiked(false);
    unlikePost({ variables });
  }

  return <Icon className={className} onClick={onClick} />;
}

function SaveButton({ savedPosts, postId }) {
  const classes = usePostStyles();
  const { currentUserId } = useContext(UserContext);
  const isAlreadySaved = savedPosts.some(
    ({ user_id }) => user_id === currentUserId,
  );
  const [saved, setSaved] = React.useState(isAlreadySaved);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSave;
  const [savePost] = useMutation(SAVE_POST);
  const [unsavePost] = useMutation(UNSAVE_POST);
  const variables = {
    postId,
    userId: currentUserId,
  };

  function handleSave() {
    setSaved(true);
    savePost({ variables });
  }

  function handleRemove() {
    setSaved(false);
    unsavePost({ variables });
  }

  return <Icon onClick={onClick} className={classes.saveIcon} />;
}

function Comment({ postId }) {
  const classes = usePostStyles();
  const { currentUserId } = useContext(UserContext);
  const [content, setContent] = React.useState('');
  const [createComment] = useMutation(CREATE_COMMENT);

  function handleAddComment() {
    const variables = {
      content,
      postId,
      userId: currentUserId,
    };
    createComment({ variables });
    setContent('');
  }

  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        rowsMax={2}
        rows={1}
        className={classes.textField}
        onChange={(event) => setContent(event.target.value)}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline,
          },
        }}
      />
      <Button
        onClick={handleAddComment}
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>
  );
}

export default Post;
