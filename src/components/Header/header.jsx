import React from "react";
import classNames from "classnames";
import { Grid, Paper, Button, Toolbar } from "@material-ui/core/";
import { Logo } from "loft-taxi-mui-theme";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./header.scss";
import { pagesMap } from "../../utils";
const mainClass = "header";

const Header = ({ className, history }) => {
  const classes = classNames(className, mainClass);

  const pages = [pagesMap.map, pagesMap.profile, pagesMap.exit];

  const handleBtnClick = (event) => {
    event.preventDefault();
    const { currentTarget } = event;

    if (currentTarget.id === pagesMap.exit.id) 
      history.push('/login');
    else 
      history.push(`/${currentTarget.id}`);
  };

  return (
    <Paper elevation={4} square={true} className={classes}>
      <Toolbar>
        <Grid container>
          <Grid item xs={6} className={`${mainClass}__logo`}>
            <Logo />
          </Grid>
          <Grid item xs={6} align="right">
            {pages &&
              pages.length &&
              pages.map((page) => {
                return (
                  <Button
                    id={page.id}
                    href={page.href}
                    key={page.id}
                    className={`${mainClass}__link`}
                    onClick={handleBtnClick}
                  >
                    {page.caption}
                  </Button>
                );
              })}
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default withRouter(Header);
