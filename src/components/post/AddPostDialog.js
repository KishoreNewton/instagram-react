import React, { useContext, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import {
  Avatar,
  Paper,
  Toolbar,
  Typography,
  Dialog,
  Button,
  AppBar,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { ArrowBackIos, PinDrop } from '@material-ui/icons';
import { useAddPostDialogStyles } from '../../styles';
import { UserContext } from '../../App';
import serialize from '../../utils/serialize';
import handleImageUpload from '../../utils/handleImageUpload';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST } from '../../graphql/mutations';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

function AddPostDialog({ media, handleClose }) {
  const classes = useAddPostDialogStyles();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);
  const { me, currentUserId } = useContext(UserContext);
  const [location, setLocation] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [createPost] = useMutation(CREATE_POST);

  async function handleSharePost() {
    setSubmitting(true);
    const url = await handleImageUpload(media);
    const variables = {
      userId: currentUserId,
      location,
      caption: serialize({ children: value }),
      media: url,
    };
    await createPost({ variables });
    setSubmitting(false);
    window.location.reload();
  }

  return (
    <Dialog fullScreen open onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <ArrowBackIos onClick={handleClose} />
          <Typography
            align="center"
            variant="body1"
            className={classes.title}
          >
            New Post
          </Typography>
          <Button
            color="primary"
            className={classes.share}
            disabled={isSubmitting}
            onClick={handleSharePost}
          >
            Share
          </Button>
        </Toolbar>
      </AppBar>
      <Paper className={classes.paper} style={{ top: '52px', position: 'relative' }}>
        <Avatar src={me.profile_image} />
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Editable
            className={classes.editor}
            placeholder="Write your caption..."
          />
        </Slate>
        <Avatar
          src={URL.createObjectURL(media)}
          className={classes.avatarLarge}
          variant="square"
        />
      </Paper>
      <TextField
        style={{
          position: 'relative',
          top: '42px'
        }}
        fullWidth
        placeholder="Location"
        InputProps={{
          classes: {
            root: classes.root,
            input: classes.input,
            underline: classes.underline,
          },
          startAdornment: (
            <InputAdornment>
              <PinDrop />
            </InputAdornment>
          ),
        }}
        onChange={(event) => setLocation(event.target.value)}
      />
    </Dialog>
  );
}

export default AddPostDialog;
