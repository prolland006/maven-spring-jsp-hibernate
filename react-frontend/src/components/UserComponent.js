import React from 'react';

class UserComponent extends React.Component {

    componentDidMount(){
        this.props.getUsers();
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Users List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>

                            <td> User Id</td>
                            <td> User First Name</td>
                            <td> User Last Name</td>
                            <td> User Email Id</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.props.users ? this.props.users.map(
                                user => 
                                <tr key = {user.id}>
                                     <td> {user.id}</td>   
                                     <td> {user.firstname}</td>   
                                     <td> {user.lastname}</td>   
                                     <td> {user.email}</td>   
                                </tr>
                            ) : ''
                        }

                    </tbody>
                </table>

            </div>

        )
    }
}

export default UserComponent