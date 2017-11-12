import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
   logout,
   checksession,
    register,
    getDetails,
    edituserdetails
   // delete: _delete
   //listfiles
};

function login(email, password) {
    console.log(password);
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                responseJson => { 
                    if(responseJson.code==200)
                    {
                    //dispatch(success(responseJson.user));
                    history.push('/Mainhome');
                    }
                
                else
                {
                    
                    dispatch(failure(responseJson.message));
                    dispatch(alertActions.error(responseJson.message));
                
                }
           } );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function register(user) {
     console.log(user);
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function checksession()
{
    return dispatch => {
       // dispatch(request(user));

        userService.checksession()
            .then(
                responseJson => { 
                    if(responseJson.status==300)
                    {
                    dispatch(success(responseJson.user));
                    history.push('/UserDetails');
                    }
                
                else
                {
                    
                   history.push('./login');
                
                }
           } );
    };
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
}
function getDetails() {
    return dispatch => {
        userService.getDetails()
            .then(responseJson => {
                if(responseJson)
                {
                    const user= responseJson;
                    dispatch(successuserdetails(user));
                }

                else
                {
                    console.log("hii");
                }
            } );
    };
    function successuserdetails(user){return { type: userConstants.USER_DETAILS,user}}
}
function edituserdetails(user) {
    console.log(user);
    return dispatch => {

        userService.edituserdetails(user)
            .then(
                user => {
                    dispatch(getDetails());
                    history.push('/UserDetails');
                },
                error => {
                    history.push('/login');
                }
            );
    };
}

// prefixed function name with underscore because delete is a reserved word in javascript
/*function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}*/