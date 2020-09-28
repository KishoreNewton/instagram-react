import React, { useState } from "react"
import { useEditProfilePageStyles } from "../styles"
import Layout from '../components/shared/Layout'
import { IconButton } from "@material-ui/core"
import { Menu } from '@material-ui/icons'

function EditProfilePage() {
  const classes = useEditProfilePageStyles()
  const [showDrawer, setDrawer] = useState(false)

  function handleToggleDrawer() {
    setDrawer(prev => !prev)
  }

  return (
    <Layout title="Edit Profile">
      <section className={classes.section}>
        <IconButton edge="start" onClick={handleToggleDrawer} className={classes.menuButton} >
          <Menu />
        </IconButton>
      </section>
    </Layout>
  )
}

export default EditProfilePage
