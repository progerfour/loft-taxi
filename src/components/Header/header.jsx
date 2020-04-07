import React, { Component } from "react";
import classNames from "classnames";
import { Grid, Paper, Button, Toolbar } from "@material-ui/core/";
import { Logo } from "loft-taxi-mui-theme";

import "./header.scss";
import { pagesMap } from "../../utils";
const mainClass = "header";

class Header extends Component {
  pages = [pagesMap.map, pagesMap.profile, pagesMap.exit];

  handleBtnClick = (event) => {
    event.preventDefault();

    const { onChangePage } = this.props;
    const { currentTarget } = event;
    typeof onChangePage == "function" && onChangePage(currentTarget.id)

  };

  render() {
    const { className } = this.props;
    const { pages } = this;
    const classes = classNames(className, mainClass);
    return (
      <Paper elevation={4} square={true}>
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
                      onClick={this.handleBtnClick}
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
  }
}

export default Header;
