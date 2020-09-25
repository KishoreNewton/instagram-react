import { Typography } from "@material-ui/core"
import React from "react"
import { Link } from 'react-router-dom'
import { useMorePostsFromUserStyles } from "../../styles"
import { LoadingLargeIcon } from '../../icons'
import { getDefaultPost, defaultUser } from '../../data'
import GridPost from '../shared/GridPost'

function MorePostsFromUser() {
  const classes = useMorePostsFromUserStyles()

  let loading = false

  return (
    <div className={classes.container}>
      <Typography color="textSecondary" variant="subtitle2" component="h2" gutterBottom className={classes.typography} >
        More Posts from {" "}
        <Link to={`/${defaultUser.username}`} className={classes.link}>
        </Link>
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={classes.article}>
          <div className={classes.postContainer}>
            {Array.from({ length: 20 }, () => getDefaultPost()).map(post => (
              <GridPost key={post.id} post={post}  />
            ))}
          </div>
        </article>
      )}
    </div>
  )
}

export default MorePostsFromUser
