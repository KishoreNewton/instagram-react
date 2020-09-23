import React, { useState } from "react"
import { useFeedPostStyles } from "../../styles"
import UserCard from '../shared/UserCard'
import { CommentIcon, MoreIcon, ShareIcon } from '../../icons'
import { Link } from "react-router-dom"
import { Button, Typography } from "@material-ui/core"
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

function FeedPost({ post }) {
  const classes = useFeedPostStyles()
  const { id, media, likes, user, caption, comments } = post
  const [showCaption, setCaption] = useState(false)

  return (
    <>
      <article className={classes.article}>
        <div className={classes.postHeader}>
          <UserCard />
          <MoreIcon className={classes.moreIcon} />
        </div>
        <div>
          <img src={media} alt="Post Media" className={classes.image} />
        </div>
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtonWrapper}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
          <Typography className={classes.like} varient="subtitle2">
            <span>{likes === 1 ? '1 like' : `${likes} likes`}</span>
          </Typography>
          <div className={showCaption ? classes.expanded : classes.collapsed}>
            <Link to={`/${user.username}`}>
              <Typography variant="subtitle2" component="span" className={classes.username}>
                {user.username}
              </Typography>
            </Link>
            {showCaption ? (
              <Typography variant="body2" component="span" dangerouslySetInnerHTML={{ __html: caption }} />
            ) : (
              <div className={classes.captionWrapper}>
                <HTMLEllipsis unsafehtml={caption} className={classes.caption} maxLine="0" ellipsis="..." basedOn="letters" />
                <Button className={classes.moreButton} onClick={() => setCaption(true)}>
                  more
                </Button>
              </div>
            )}
          </div>
          <Link to={`/p/${id}`}>
            <Typography className={classes.commentsLink} variant="body2" component="div" >
              View all {comments.length} comments
            </Typography>
          </Link>
          {comments.map(comment => (
            <div key={comment.id}>
              <Link to={`/${comment.user.username}`}>
                <Typography variant="subtitle2" component="span" className={classes.commentUsername}>
                  {comment.user.username}
                </Typography>{" "}
                <Typography variant="body2" component="span">
                  {comment.content}
                </Typography>
              </Link>
            </div>
          ))}
        </div>
      </article>
    </>
  )
}

function LikeButton() {
  return (
    <>
    
    </>
  )
}

function SaveButton() {
  return (
    <>
    
    </>
  )
}

export default FeedPost;
