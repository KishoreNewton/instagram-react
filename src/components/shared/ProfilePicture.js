import React from "react"
import { useProfilePictureStyles } from "../../styles"
import { Person } from '@material-ui/icons'

function ProfilePicture({ size, image = "https://cdn.pixabay.com/photo/2020/03/01/10/24/power-4892237_960_720.jpg", isOwner }) {
  const classes = useProfilePictureStyles({ size, isOwner })

  return (
    <section className={classes.section}>
      {image ? (
        <div className={classes.wrapper}>
          <img src={image} alt="user profile" className={classes.image} />
        </div>
      ) : (
        <div className={classes.wrapper}>
          <Person className={classes.person} />
        </div>
      )}
    </section>
  )
}

export default ProfilePicture
