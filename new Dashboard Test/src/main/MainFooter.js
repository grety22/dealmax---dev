import React from 'react';
import {Button, Icon, IconButton, Tooltip} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import {FuseAnimateGroup} from '@fuse';
import classNames from 'classnames';

const styles = theme => ({
    root: {}
});

function MainFooter({classes})
{
    return (
        <div className={classNames(classes.root, "flex flex-1 items-center px-16")}>
            <div>

                <FuseAnimateGroup
                    enter={{
                        animation: "transition.expandIn",
                    }}
                    className="hidden sm:flex items-center"
                >
                   
                    <Tooltip title="Tailwind" placement="top">
                        <IconButton className="px-4" component="a" href="https://tailwindcss.com" target="_blank" rel="noreferrer noopener">
                            <h6>DealMax 2018</h6>
                        </IconButton>
                    </Tooltip>
                </FuseAnimateGroup>
            </div>
        </div>
    );
}

export default withStyles(styles, {withTheme: true})(MainFooter);