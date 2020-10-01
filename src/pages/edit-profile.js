<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { useEditProfilePageStyles } from '../styles';
import Layout from '../components/shared/Layout';
import {
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import {  Menu } from '@material-ui/icons';
import ProfilePicture from '../components/shared/ProfilePicture';
import { UserContext } from '../App';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_EDIT_USER_PROFILE } from '../graphql/queries';
import LoadingScreen from '../components/shared/LoadingScreen';
import { useForm } from 'react-hook-form';
import isURL from 'validator/lib/isURL';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone'
import { EDIT_USER } from '../graphql/mutations';
import { AuthContext } from '../auth';

function EditProfilePage({ history }) {
  const { currentUserId } = useContext(UserContext);
  const variables = { id: currentUserId };
  const { data, loading } = useQuery(GET_EDIT_USER_PROFILE, {
    variables,
  });
  const path = history.location.pathname;
  const classes = useEditProfilePageStyles();
  const [showDrawer, setDrawer] = useState(false);

  if (loading) return <LoadingScreen />;

  function handleToggleDrawer() {
    setDrawer((prev) => !prev);
  }

  function handleSelected(index) {
    switch (index) {
      case 0:
        return path.includes('edit');
      default:
        break;
=======
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
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
    }
  }

  function handleListClick(index) {
<<<<<<< HEAD
    switch (index) {
      case 0:
        return history.push('account/edit');
      default:
        break;
    }
  }

  const options = [
    'Edit Profile',
    'Change Password',
    'Apps and Websites',
    'Email and SMS',
    'Push Notifications',
    'Manage Contacts',
    'Privacy and Security',
    'Login Activity',
    'Emails from Instagram',
  ];
=======
    switch(index) {
      case 0:
        return history.push('account/edit')
      default:
        break
    }
  }

  const options = ["Edit Profile", "Change Password", "Apps and Websites", "Email and SMS", "Push Notifications", "Manage Contacts", "Privacy and Security", "Login Activity", "Emails from Instagram"]
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d

  const drawer = (
    <List>
      {options.map((option, index) => (
<<<<<<< HEAD
        <ListItem
          key={option}
          button
          selected={handleSelected(index)}
          onClick={() => handleListClick(index)}
          classes={{
            selected: classes.listItemSelected,
            button: classes.listItemButton,
          }}
        >
=======
        <ListItem key={option} button selected={handleSelected(index)} onClick={() => handleListClick(index)} classes={{ selected: classes.listItemSelected, button: classes.listItemButton }} >
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
          <ListItemText primary={option} />
        </ListItem>
      ))}
    </List>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d

  return (
    <Layout title="Edit Profile">
      <section className={classes.section}>
<<<<<<< HEAD
        <IconButton
          edge="start"
          onClick={handleToggleDrawer}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <nav>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={showDrawer}
              onClose={handleToggleDrawer}
              classes={{ paperAnchorLeft: classes.temporaryDrawer }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden
            xsDown
            implementation="css"
            className={classes.permanentDrawerRoot}
          >
            <Drawer
              variant="permanent"
              anchor="left"
              open
              classes={{
                paper: classes.permanentDrawerPaper,
                root: classes.permanentDrawerRoot,
              }}
            >
=======
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
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main>
<<<<<<< HEAD
          {path.includes('edit') && (
            <EditUserInfo user={data.users_by_pk} />
          )}
        </main>
      </section>
    </Layout>
  );
}

const DEFAULT_ERROR = { type: "", message: "" }

function EditUserInfo({ user }) {
  const classes = useEditProfilePageStyles();
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const { updateEmail } = useContext(AuthContext)
  const [editUser] = useMutation(EDIT_USER)
  const [error, setError] = useState(DEFAULT_ERROR)
  const [open, setOpen] = useState(false)

  async function onSubmit(data) {
    try {
      setError(DEFAULT_ERROR)
      const variables = { ...data, id: user.id }
      await updateEmail(data.email)
      await editUser({ variables })
      setOpen(true)
    } catch(error) {
      console.log("Error updating profile", error)
      handleError(error)
    }
  }

  function handleError(error) {
    if(error.message.includes("users_username_key")) {
      setError({ type: "username", message: "This username is already taken." })
    } else if (error.code.includes("auth")) {
      setError({ type: "email", message: error.message })
    }
  }
  
=======
          {path.includes('edit') && <EditUserInfo user={defaultCurrentUser} />}
        </main>
      </section>
    </Layout>
  )
}

function EditUserInfo({ user }) {
  const classes = useEditProfilePageStyles()
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
  const theme = createMuiTheme({
    typography: {
      fontSize: 12,
      h6: {
<<<<<<< HEAD
        fontWeight: 600,
      },
    },
  });
=======
        "fontWeight": 600,
      },
    },
  })
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d

  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
<<<<<<< HEAD
        <ProfilePicture size={38} image={user.profile_image} />
=======
        <ProfilePicture size={38} user={user} />
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
        <div className={classes.justifySelfStart}>
          <Typography className={classes.typography}>
            {user.username}
          </Typography>
<<<<<<< HEAD
          <Typography
            color="primary"
            variant="body2"
            className={classes.typographyChangePic}
          >
=======
          <Typography color="primary" variant="body2" className={classes.typographyChangePic}>
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
            Change Profile Photo
          </Typography>
        </div>
      </div>
<<<<<<< HEAD
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <SectionItem
          name="name"
          inputRef={register({
            required: true,
            minLength: 5,
            maxLength: 20,
          })}
          text="Name"
          formItem={user.name}
        />
        <SectionItem
          name="username"
          error={error}
          inputRef={register({
            required: true,
            minLength: 5,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9_.]*$/,
          })}
          text="Username"
          formItem={user.username}
        />
        <SectionItem
          name="website"
          inputRef={register({
            validate: (input) =>
              Boolean(input)
                ? isURL(input, {
                    protocols: ['http', 'https'],
                    require_protocol: true,
                  })
                : true,
          })}
          text="Website"
          formItem={user.website}
        />
        <div className={classes.sectionItem}>
          <aside>
            <MuiThemeProvider theme={theme}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.bio}
              >
=======
      <form className={classes.form}>
        <SectionItem text="Name" formItem={user.name} />
        <SectionItem  text="Username" formItem={user.username} />
        <SectionItem text="Website" formItem={user.website} />
        <div className={classes.sectionItem}>
          <aside>
            <MuiThemeProvider theme={theme}>
              <Typography variant="h6" color="inherit" className={classes.bio}>
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
                Bio
              </Typography>
            </MuiThemeProvider>
          </aside>
<<<<<<< HEAD
          <TextField
            name="bio"
            inputRef={register({
              maxLength: 120
            })}
            variant="outlined"
            multiline
            rowsMax={3}
            rows={3}
            fullWidth
            defaultValue={user.bio}
          />
        </div>
        <div className={classes.sectionItem}>
          <div />
          <Typography
            color="textSecondary"
            className={classes.justifySelfStart}
          >
            Personal Information
          </Typography>
        </div>
        <SectionItem
          name="email"
          error={error}
          inputRef={register({
            required: true,
            validate: (input) => isEmail(input)
          })}
          text="Email"
          formItem={user.email}
          type="email"
        />
        <SectionItem
          name="phoneNumber"
          inputRef={register({
            required: false,
            validate: input => Boolean(input) ? isMobilePhone(input) : true
          })}
          text="Phone Number"
          formItem={user.phone_number}
        />
        <div className={classes.sectionItem}>
          <div />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.justifySelfStart}
          >
=======
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
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
            Submit
          </Button>
        </div>
      </form>
<<<<<<< HEAD
      <Snackbar 
        open={open}
        autoHideDuration={4000}
        TransitionComponent={Slide}
        message={<span>Profile Updated</span>}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}

function SectionItem({
  type = 'text',
  text,
  formItem,
  inputRef,
  name,
  error
}) {
  const classes = useEditProfilePageStyles();
=======
    </section>
  )
}

function SectionItem({ type = "text", text, formItem }) {
  const classes = useEditProfilePageStyles()
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d

  return (
    <div className={classes.sectionItemWrapper}>
      <aside>
        <Hidden xsDown>
<<<<<<< HEAD
          <Typography className={classes.typography} align="right">
=======
          <Typography className={classes.typography} align="right" >
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
            {text}
          </Typography>
        </Hidden>
        <Hidden smUp>
<<<<<<< HEAD
          <Typography className={classes.typography}>
=======
          <Typography className={classes.typography} >
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
            {text}
          </Typography>
        </Hidden>
      </aside>
<<<<<<< HEAD
      <TextField
        name={name}
        inputRef={inputRef}
        helperText={error?.type === name && error.message}
        variant="outlined"
        className={classes.textField}
        fullWidth
        defaultValue={formItem}
        type={type}
        inputProps={{
          className: classes.textFieldInput,
        }}
      />
    </div>
  );
=======
      <TextField variant="outlined" className={classes.textField} fullWidth value={formItem} type={type} inputProps={{
        className: classes.textFieldInput
      }} />
    </div>
  )
>>>>>>> 3fae9556566e198a8e7fd3902221d9b98931eb6d
}

export default EditProfilePage
