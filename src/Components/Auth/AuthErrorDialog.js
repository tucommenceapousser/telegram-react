import React from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TdLibController from '../../Controllers/TdLibController';

class AuthErrorDialog extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
            error: null
        };

        this.handleAuthError = this.handleAuthError.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount(){
        TdLibController.on('tdlib_auth_error', this.handleAuthError);
    }

    componentWillUnmount(){
        TdLibController.removeListener('tdlib_auth_error', this.handleAuthError);
    }

    handleAuthError(error){
        this.setState({
            open: true,
            error: error
        });
    }

    handleClose(){
        this.setState({
            open: false
        });
    }

    handleKeyDown(e){
        if (e.key === 'Enter'){
            e.preventDefault();
            this.handleClose();
        }
    }

    render() {
        let errorString = null;
        if (this.state.error
            && this.state.error['@type'] === 'error'
            && this.state.error.message){
            errorString = this.state.error.message;
        }
        else{
            errorString = JSON.stringify(this.state.error);
        }

        return (
            <Dialog
                open={this.state.open}
                onKeyDown={this.handleKeyDown}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorString}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AuthErrorDialog;