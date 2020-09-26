import React from "react"
import Layout from "../components/shared/Layout"
import { useProfilePageStyles } from "../styles"
import { defaultCurrentUser } from '../data'
import { Card, CardContent, Hidden } from "@material-ui/core"
import ProfilePicture from '../components/shared/ProfilePicture'

function ProfilePage() {
  const classes = useProfilePageStyles()

  return (
    <Layout title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`} >
      <div className={classes.container}>
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture />
            <CardContent className={classes.cardContentLarge}>

            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>

        </Hidden>
      </div>
    </Layout>
  )
}

function ProfileNameSection() {
  
}

export default ProfilePage
