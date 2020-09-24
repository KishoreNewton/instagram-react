import { Typography } from "@material-ui/core"
import React from "react"
import { useExploreGridStyles } from "../../styles"
import { LoadingLargeIcon } from '../../icons'
import { getDefaultPost } from '../../data'

function ExploreGrid() {
  const classes = useExploreGridStyles()

  let loading = true

  return (
    <>
      <Typography color="textSecondary" variant="subtitle2" component="h2" gutterBottom className={classes.typography} >
        Explore
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (

      )}
    </>
  )
}

export default ExploreGrid
