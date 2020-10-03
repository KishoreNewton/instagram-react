import React, { useContext, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { Avatar, Paper, Toolbar, Typography, Dialog, Button, AppBar, TextField, InputAdornment } from '@material-ui/core'
import { ArrowBackIos, PinDrop } from '@material-ui/icons'
import { useAddPostDialogStyles } from '../../styles'
import { UserContext } from '../../App'



const initialValue = [{
    type: "paragraph",
    children: [{ text: "" }]
}]

function AddPostDialog({ media, handleClose }) {  
    const classes = useAddPostDialogStyles()
    const editor = useMemo(() => withReact(createEditor()), [])
    const [value, setValue] = useState(initialValue)
    const { me } = useContext(UserContext)
    const [location, setLocation] = useState('')
    
    return (
        <Dialog fullScreen open onClose={handleClose}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <ArrowBackIos onClick={handleClose} />
                    <Typography align="center" variant="body1" className={classes.title} >
                        New Post
                    </Typography>
                    <Button color="primary" className={classes.share}>
                        Share
                    </Button>
                </Toolbar>
            </AppBar>
            <Paper className={classes.paper}>
                <Avatar src={me.profile_image} />  
                <Slate editor={editor} value={value} onChange={value => setValue(value)}>
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
                fullWidth
                placeholder="Location"
                InputProps={{
                    classes: {
                        root: classes.root,
                        input: classes.input,
                        underline: classes.underline
                    },
                    startAdornment: (
                        <InputAdornment>
                            <PinDrop />
                        </InputAdornment>
                    )
                    
                }}
                onChange={event => SecurityPolicyViolationEvent(event.target.value)}
            />
        </Dialog>
    )
}

export default AddPostDialog