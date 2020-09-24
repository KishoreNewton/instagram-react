import { AppBar, InputBase, Hidden } from "@material-ui/core"
import React, { useState } from "react"
import { useNavbarStyles } from "../../styles"
import { Link, useHistory } from 'react-router-dom'
import logo from '../../images/logo.png'
import { LoadingIcon, AddIcon, LikeIcon, LikeActiveIcon, ExploreIcon, ExploreActiveIcon, HomeIcon, HomeActiveIcon } from '../../icons'

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles()
  const history = useHistory()
  const path = history.location.pathname

  return (
    <AppBar className={classes.appBar}>
      <section className={classes.section}>
        <Logo />
        {!minimalNavbar && <Search />}
        {!minimalNavbar && <Links path={path} />}
        {/* {!minimalNavabar && (
          <>
            <Search />
            <Links />
          </>
        )} */}
      </section>
    </AppBar>
  )
}

function Logo() {
  const classes = useNavbarStyles()

  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Instagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  )
}

function Search() {
  const classes = useNavbarStyles()
  const [query, setQuery] = useState('')
  function handleClearInput() {
    setQuery('')
  }
  let loading = false
  return (
    <>
      <Hidden xsDown>
        <InputBase className={classes.input} onChange={event => setQuery(event.target.value)} startAdornment={<span className={classes.searchIcon}/>} endAdornment={ loading ? (
          <LoadingIcon /> 
        ) : (
          <span onClick={handleClearInput} className={classes.clearIcon} />
        )} placeholder="Search" value={query} />
      </Hidden>
    </>
  )
}

function Links({ path }) {
  const classes = useNavbarStyles()

  return (
    <>
      <div className={classes.linksContainer}>
        <div className={classes.linksWrapper}>
          <Hidden xsDown>
            <AddIcon />
          </Hidden>
          <Link to="/">
            {path === "/" ? <HomeActiveIcon /> : <HomeIcon />}
          </Link>
        </div>
      </div>    
    </>
  )
}

export default Navbar
