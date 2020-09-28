import React, { useState } from "react"
import { useEditProfilePageStyles } from "../styles"
import Layout from '../components/shared/Layout'
import { Button, Drawer, Hidden, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@material-ui/core"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Menu } from '@material-ui/icons'
import { defaultCurrentUser } from "../data"
import ProfilePicture from "../components/shared/ProfilePicture"

function EditProfilePage({ history }) { 
  const path = history.location.pathname
  const classes = useEditProfilePageStyles()
  const [showDrawer, setDrawer] = useState(false)

  function handleToggleDrawer() {
    setDrawer(prev => !prev)
  }

  function handleSelected(index) {
    switch(index) {
      case 0:
        return path.includes('edit')
      default:
        break
    }
  }

  function handleListClick(index) {
    switch(index) {
      case 0:
        return history.push('account/edit')
      default:
        break
    }
  }

  const options = ["Edit Profile", "Change Password", "Apps and Websites", "Email and SMS", "Push Notifications", "Manage Contacts", "Privacy and Security", "Login Activity", "Emails from Instagram"]

  const drawer = (
    <List>
      {options.map((option, index) => (
        <ListItem key={option} button selected={handleSelected(index)} onClick={() => handleListClick(index)} classes={{ selected: classes.listItemSelected, button: classes.listItemButton }} >
          <ListItemText primary={option} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <Layout title="Edit Profile">
      <section className={classes.section}>
        <IconButton edge="start" onClick={handleToggleDrawer} className={classes.menuButton} >
          <Menu />
        </IconButton>
        <nav>
          <Hidden smUp implementation="css" > 
            <Drawer variant="temporary" anchor="left" open={showDrawer} onClose={handleToggleDrawer} classes={{ paperAnchorLeft: classes.temporaryDrawer }}>
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css" className={classes.permanentDrawerRoot} > 
            <Drawer variant="permanent" anchor="left" open classes={{ paper: classes.permanentDrawerPaper, root: classes.permanentDrawerRoot }}>
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main>
          {path.includes('edit') && <EditUserInfo user={defaultCurrentUser} />}
        </main>
      </section>
    </Layout>
  )
}

function EditUserInfo({ user }) {
  const classes = useEditProfilePageStyles()
  const theme = createMuiTheme({
    typography: {
      fontSize: 12,
      h6: {
        "fontWeight": 600,
      },
    },
  })

  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
        <ProfilePicture size={38} user={user} />
        <div className={classes.justifySelfStart}>
          <Typography className={classes.typography}>
            {user.username}
          </Typography>
          <Typography color="primary" variant="body2" className={classes.typographyChangePic}>
            Change Profile Photo
          </Typography>
        </div>
      </div>
      <form className={classes.form}>
        <SectionItem text="Name" formItem={user.name} />
        <SectionItem  text="Username" formItem={user.username} />
        <SectionItem text="Website" formItem={user.website} />
        <div className={classes.sectionItem}>
          <aside>
            <MuiThemeProvider theme={theme}>
              <Typography variant="h6" color="inherit" className={classes.bio}>
                Bio
              </Typography>
            </MuiThemeProvider>
          </aside>
          <TextField variant="outlined" multiline rowsMax={3} rows={3} fullWidth value={user.bio} />
        </div>
        <div className={classes.sectionItem}>
          <div />
          <Typography color="textSecondary" className={classes.justifySelfStart}>
            Personal Information
          </Typography>
        </div>
        <SectionItem text="Email" formItem={user.email} type="email" />
        <SectionItem text="Phone Number" formItem={user.phone_number} />
        <div className={classes.sectionItem}>
          <div />
          <Button type="submit" variant="contained" color="primary" className={classes.justifySelfStart}> 
            Submit
          </Button>
        </div>
      </form>
    </section>
  )
}

function SectionItem({ type = "text", text, formItem }) {
  const classes = useEditProfilePageStyles()

  return (
    <div className={classes.sectionItemWrapper}>
      <aside>
        <Hidden xsDown>
          <Typography className={classes.typography} align="right" >
            {text}
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.typography} >
            {text}
          </Typography>
        </Hidden>
      </aside>
      <TextField variant="outlined" className={classes.textField} fullWidth value={formItem} type={type} inputProps={{
        className: classes.textFieldInput
      }} />
    </div>
  )
}

export default EditProfilePage
