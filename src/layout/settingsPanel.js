import React from 'react';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

export const Settings = (props) => {
  return (
    <div className="settings-drawer">
        <React.Fragment>
            <Button>Left</Button>
            <SwipeableDrawer
                anchor={"Right"}
                open={true}
                onClose={false}
                onOpen={false}
            >
            "Left"
            </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}