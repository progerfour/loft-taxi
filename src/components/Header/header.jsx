import React, { useContext } from "react";
import classNames from "classnames";
import { Grid, Paper, Button, Toolbar } from "@material-ui/core/";
import { Logo } from "loft-taxi-mui-theme";
import PropTypes from "prop-types";

import "./header.scss";
import { pagesMap } from "../../utils";
import { AuthContext } from "../../context/authContext";
const mainClass = "header";

const Header = ({ className, onChangePage }) => {
  const { logout } = useContext(AuthContext);
  const classes = classNames(className, mainClass);

  const pages = [pagesMap.map, pagesMap.profile, pagesMap.exit];

  const handleBtnClick = (event) => {
    event.preventDefault();
    const { currentTarget } = event;

    if (currentTarget.id === pagesMap.exit.id) logout();
    else typeof onChangePage == "function" && onChangePage(currentTarget.id);
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
  onChangePage: PropTypes.func.isRequired,
};

export default Header;
