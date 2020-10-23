import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import Loader from "../components/Loader";
import {getUserDetails, adminUpdateUser} from "../actions/user-actions";
import FormContainer from "../components/form-container";
import {ADMIN_SAVE_USER_INFO_RESET} from "../constants/user-constants";

const AdminUserEditScreen = ({match, history}) => {
    const userId = match.params.id
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const adminUpdatedUser = useSelector(state => state.adminUpdatedUser);
    const {loading: adminLoadingUserUpdate, error: adminUserUpdateError, success: successAdminUserUpdate} = adminUpdatedUser;


    useEffect(() => {
        if (successAdminUserUpdate) {
            dispatch({type: ADMIN_SAVE_USER_INFO_RESET})
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) dispatch(getUserDetails(userId))
            else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, userId, user, successAdminUserUpdate, history])

    const updateUser = e => {
        e.preventDefault()
        dispatch(adminUpdateUser({_id: userId, name, email, isAdmin}))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-outline-dark my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {adminLoadingUserUpdate && <Loader/>}
                {adminUserUpdateError && <Message variant='danger'>{adminUserUpdateError}</Message>}
                {loading
                    ? <Loader/>
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={updateUser}>

                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text'
                                                  placeholder='Enter your name'
                                                  value={name}
                                                  onChange={e => setName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email'
                                                  placeholder='Enter your account email'
                                                  value={email}
                                                  onChange={e => setEmail(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='isadmin'>
                                    <Form.Check type='checkbox'
                                                label='Is Admin'
                                                checked={isAdmin}
                                                onChange={e => setIsAdmin(e.target.checked)}>
                                    </Form.Check>
                                </Form.Group>

                                <Button type='submit' variant='outline-primary'>Update</Button>
                            </Form>
                        )}
            </FormContainer>
        </>
    );
};

export default AdminUserEditScreen;
