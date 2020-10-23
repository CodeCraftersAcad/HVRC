import React, {useEffect} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/message";
import Loader from "../components/Loader";
import {adminListUsers, adminDeleteUser} from "../actions/user-actions";

const AdminUserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const adminUserList = useSelector(state => state.adminUserList)
    const {loading, error, users} = adminUserList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const deleteUser = useSelector(state => state.deleteUser)
    const {success: successDeleteUser} = deleteUser

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) dispatch(adminListUsers())
        else history.push('/login')

    }, [dispatch, history, userInfo, successDeleteUser])

    const deleteUserById = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(adminDeleteUser(id))
        }
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isAdmin
                                ? (<i className='fas fa-check' style={{color: 'green'}}></i>)
                                : (<i className='fas fa-times' style={{color: 'red'}}></i>)}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                    <Button variant="outline-dark" className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => {
                                    deleteUserById(user._id)
                                }}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default AdminUserListScreen;