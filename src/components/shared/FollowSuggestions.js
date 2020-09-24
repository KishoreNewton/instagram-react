import { Typography } from "@material-ui/core"
import React from "react"
import { useFollowSuggestionsStyles } from "../../styles"

function FollowSuggestions() {
  const classes = useFollowSuggestionsStyles()

  return (
    <div className={classes.container}>
      <Typography color="textSecondary" variant="subtitle2" className={classes.typography} >
        Suggestions For You
      </Typography>
    </div>
  )
}

export default FollowSuggestions
