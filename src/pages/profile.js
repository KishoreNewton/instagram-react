import React, { useCallback, useContext, useState } from 'react';
import Layout from '../components/shared/Layout';
import { useProfilePageStyles } from '../styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Divider,
  Hidden,
  Typography,
  Zoom,
} from '@material-ui/core';
import ProfilePicture from '../components/shared/ProfilePicture';
import { Link, useHistory, useParams } from 'react-router-dom';
import { GearIcon } from '../icons';
import ProfileTabs from '../components/profile/ProfileTabs';
import { AuthContext } from '../auth';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { GET_USER_PROFILE } from '../graphql/queries';
import LoadingScreen from '../components/shared/LoadingScreen';
import { UserContext } from '../App';
import { useMutation } from '@apollo/react-hooks';
import { FOLLOW_USER, UNFOLLOW_USER } from '../graphql/mutations';

function ProfilePage() {
  const { username } = useParams();
  const { currentUserId } = useContext(UserContext);
  const [showOptionsMenu, setOptionsMenu] = useState(false);
  const classes = useProfilePageStyles();
  const variables = { username };
  const { data, loading } = useQuery(GET_USER_PROFILE, {
    variables,
    fetchPolicy: "no-cache"
  });

  if (loading) return <LoadingScreen />;
  const [user] = data.users;
  const isOwner = user.id === currentUserId;

  function handleOptionsMenuClick() {
    setOptionsMenu(true);
  }

  function handleCloseMenu() {
    setOptionsMenu(false);
  }

  return (
    <Layout title={`${user.name} (@${user.username})`}>
      <div className={classes.container}>
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture
              isOwner={isOwner}
              image={user.profile_image}
            />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection
                user={user}
                isOwner={isOwner}
                handleOptionsMenuClick={handleOptionsMenuClick}
              />
              <PostCountSection user={user} />
              <NameBioSection user={user} />
            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card className={classes.cardSmall}>
            <CardContent>
              <section className={classes.sectionSmall}>
                <ProfilePicture
                  isOwner={isOwner}
                  image={user.profile_image}
                  size={77}
                />
                <ProfileNameSection
                  user={user}
                  handleOptionsMenuClick={handleOptionsMenuClick}
                  isOwner={isOwner}
                />
              </section>
              <NameBioSection user={user} />
            </CardContent>
            <PostCountSection user={user} />
          </Card>
        </Hidden>
        {showOptionsMenu && (
          <OptionsMenu handleCloseMenu={handleCloseMenu} />
        )}
        <ProfileTabs user={user} isOwner={isOwner} />
      </div>
    </Layout>
  );
}

function ProfileNameSection({
  user,
  isOwner,
  handleOptionsMenuClick,
}) {
  const classes = useProfilePageStyles();
  const { currentUserId, followingIds } = useContext(
    UserContext,
  );
  const [showUnfollowDialog, setUnfollowDialog] = useState(false);
  const isAlreadyFollowing = followingIds.some(
    (id) => id === user.id,
  );
  const [isFollowing, setFollowing] = useState(isAlreadyFollowing);
  const isFollower =
    !isFollowing && followingIds.some((id) => id === user.id);
  const variables = {
    userIdToFollow: user.id,
    currentUserId,
  };
  const [followUser] = useMutation(FOLLOW_USER);

  function handleFollowUser() {
    setFollowing(true);
    followUser({ variables });
  }

  const onUnfollowUser = useCallback(() => {
    setUnfollowDialog(false);
    setFollowing(false);
  });

  let followButton;
  if (isFollowing) {
    followButton = (
      <Button
        onClick={() => setUnfollowDialog(true)}
        variant="outlined"
        className={classes.button}
      >
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button
        onClick={handleFollowUser}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button
        onClick={handleFollowUser}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Follow
      </Button>
    );
  }
  return (
    <>
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>
            {user.username}
          </Typography>
          {isOwner ? (
            <>
              <Link to="/accounts/edit">
                <Button variant="outlined">Edit Profile</Button>
              </Link>
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            </>
          ) : (
            <>{followButton}</>
          )}
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.usernameDivSmall}>
            <Typography className={classes.username}>
              {user.username}
            </Typography>
            {isOwner && (
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            )}
          </div>
          {isOwner ? (
            <Link to="/accounts/edit">
              <Button variant="outlined" style={{ width: '100%' }}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
      {showUnfollowDialog && (
        <UnfollowDialog
          onUnfollowUser={onUnfollowUser}
          user={user}
          onClose={() => setUnfollowDialog(false)}
        />
      )}
    </>
  );
}

function UnfollowDialog({ user, onClose, onUnfollowUser }) {
  const classes = useProfilePageStyles();
  const { currentUserId } = useContext(UserContext);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  function handleUnfollowUser() {
    const variables = {
      currentUserId,
      userIdToFollow: user.id,
    };
    unfollowUser({ variables });
    onUnfollowUser();
  }

  return (
    <Dialog
      open
      classes={{ scrollPaper: classes.unfollowDialogScrollPaper }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <div className={classes.wrapper}>
        <Avatar
          src={user.profile_image}
          alt={`${user.username}'s avatar`}
          className={classes.avatar}
        />
      </div>
      <Typography
        align="center"
        variant="body2"
        className={classes.unfollowDialogText}
      >
        Unfollow @{user.username}?
      </Typography>
      <Divider />
      <Button
        onClick={handleUnfollowUser}
        className={classes.unfollowButton}
      >
        Unfollow
      </Button>
      <Divider />
      <Button onClick={onClose} className={classes.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  );
}

function PostCountSection({ user }) {
  const classes = useProfilePageStyles();
  const options = ['posts', 'followers', 'following'];

  return (
    <>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <section className={classes.followingSection}>
        {options.map((option) => (
          <div key={option} className={classes.followingText}>
            <Typography className={classes.followingCount}>
              {user[`${option}_aggregate`].aggregate.count}
            </Typography>
            <Hidden xsDown>
              <Typography>{option}</Typography>
            </Hidden>
            <Hidden smUp>
              <Typography color="textSecondary">{option}</Typography>
            </Hidden>
          </div>
        ))}
      </section>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </>
  );
}

function NameBioSection({ user }) {
  const classes = useProfilePageStyles();
  const { name, bio, website } = user;
  return (
    <section className={classes.section}>
      <Typography className={classes.typography}>{name}</Typography>
      <Typography>{bio}</Typography>
      <a href={website} target="_blank" rel="noopener noreferrer">
        <Typography color="secondary" className={classes.typography}>
          {user.website}
        </Typography>
      </a>
    </section>
  );
}

function OptionsMenu({ handleCloseMenu }) {
  const { signOut } = useContext(AuthContext);
  const classes = useProfilePageStyles();
  const [showLogOutMessage, setLogOutMessage] = useState(false);
  const history = useHistory();
  const client = useApolloClient();

  async function handleLogOutClick() {
    setLogOutMessage(true);
    setTimeout(async () => {
      await client.clearStore();
      signOut();
      history.push('/account/login');
    }, 1500);
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper,
      }}
      TransitionComponent={Zoom}
    >
      {showLogOutMessage ? (
        <DialogTitle className={classes.dialogTitle}>
          Logging Out
          <Typography color="textSecondary">
            You need to log back in to continure using Instagram.
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Change Password" />
          <OptionsItem text="Nametag" />
          <OptionsItem text="Authorized Apps" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem text="Log out" onClick={handleLogOutClick} />
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
        </>
      )}
    </Dialog>
  );
}

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{ padding: '12px 8px' }} onClick={onClick}>
        {text}
      </Button>
      <Divider />
    </>
  );
}

export default ProfilePage;
