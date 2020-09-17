import React from "react"
import Layout from '../components/shared/Layout'
import { Typography } from "@material-ui/core"
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return <Layout title="Page Not Found" marginTop={120}>
    <Typography varient="h5" align="center" paragraph>
      Sorry, this page isn't avaliable
    </Typography>
    <Typography align="center">
      The link you followed may be broken, or the page may have been removed. 
      <Link to="/">
        <Typography color="primary" component="span">
          {" "}Go back to Instagram f
        </Typography>
      </Link>
    </Typography>
  </Layout>;
}

export default NotFoundPage;
