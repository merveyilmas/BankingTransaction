import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import UserService from '../services/UserService';
import { Toast } from 'primereact/toast';

export default function EditUser() {

    const toast = useRef(null);

    const userService = new UserService()
    const dt = useRef(null);

    let emptyUser = {
        id: null,
        username: null,
        email: null,
        password: '',
        roles: [{
            id: null,
            name: null
        }

        ],

    };

    const [users, setUsers] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [globalFilter, setGlobalFilter] = useState(null);


    useEffect(() => {

        userService.getAllUsers().then(result => {    


            if (result.data.success === true) {

                setUsers(result.data.data)

            } 
        }).catch(error => {

            toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
            console.error(error);
        })
    }, [userDialog,deleteUserDialog]);



    const openNew = () => {
        setUser(emptyUser);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
        role: false,
    });

    const validateField = (e, name) => {
        if (!e.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            username: !user.username,
            email: !user.email,
            password: !user.password,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };


    const saveUser = () => {


        if (!validateForm()) {
            return;
        }

        if (user.id) { // listelenenler arasında seçilmiş guncellenecek

            console.log("user")
            console.log(user)
            console.log(user.roles[0].name)

            userService.updateUser(user.id, user.username, user.email, user.password, user.roles[0].name).then(result => {

                if (result.data.success === true) {

                    toast.current.show({ severity: 'success', summary: 'Success', detail: "User updated successfully.", life: 3000 });

                } 
            }).catch(error => {

                toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
                console.error(error);
            })


        } else { // kaydı yok kaydet

            userService.addUser(user.username, user.email, user.password, user.roles[0].name).then(result => {

                if (result.data.success === true) {

                    toast.current.show({ severity: 'success', summary: 'Success', detail: "User saved successfully.", life: 3000 });


                }
            }).catch(error => {

                toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
                console.error(error);
            })

        }
        setUserDialog(false);
        setUser(emptyUser);

    }


    const editUser = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {

        userService.deleteUser(user.id).then(result => {

            console.log("delete user result :")
            console.log(result)

            if (result.status === 200) {

                toast.current.show({ severity: 'success', summary: 'Success', detail: "User deleted successfully.", life: 3000 });

            }
        }).catch(error => {

            toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
            console.error(error);
        })


        setDeleteUserDialog(false);
        setUser(emptyUser);
    };



    const onRoleChange = (e) => {

        // Yeni role nesnesi oluştur
        const newRole = {
            id: e.target.id,
            name: e.target.value
        };

        // user nesnesini klonlayın
        let _user = { ...user };

        _user['roles'] = [newRole];

        setUser(_user);
    };

    const onInputUsernameChange = (e, username) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };

        _user[`${username}`] = val;

        setUser(_user);
    };

    const onInputEmailChange = (e, email) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };

        _user[`${email}`] = val;

        setUser(_user);
    };

    const onInputPasswordChange = (e, password) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };

        _user[`${password}`] = val;

        setUser(_user);
    };



    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">

                <Button label="Add User" icon="pi pi-user-plus" rounded severity="success"
                    onClick={openNew} />
            </div>
        );
    };


    const rightToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">

                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />

                </IconField>
            </div>
        );


    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pen-to-square" rounded outlined severity="warning" className="mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} style={{ marginLeft: "15px" }} />
            </React.Fragment>
        );
    };


    const userDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" severity="danger" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" severity="success" onClick={saveUser} />
        </React.Fragment>
    );
    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined severity="primary" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteUser} />
        </React.Fragment>
    );

    const RoleTemplate = (rowData) => {
        return (
            <>
                {rowData.roles.map((role, index) => (
                    <span key={index} className="role-tag">
                        {role.name === "ROLE_ADMIN" ? "Admin" : "User"}
                    </span>
                ))}
            </>
        );
    };


    return (
        <div>
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-2" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={users}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    //scrollable scrollHeight="550px"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" globalFilter={globalFilter} >
                    <Column field="id" header="ID" sortable style={{ minWidth: '4rem' }}></Column>
                    <Column field="username" header="Username" sortable style={{ minWidth: '9rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '11rem' }}></Column>
                    <Column field="password" header="Password" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={RoleTemplate} field="role" header="Role" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={userDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="username" className="font-bold">
                        Username
                    </label>
                    <InputText
                        id="username"
                        value={user.username}
                        onChange={(e) => onInputUsernameChange(e, 'username')}
                        onBlur={(e) => validateField(e, 'username')}
                        required autoFocus
                        className={classNames({ 'p-invalid': errors.username })}
                    />
                    {errors.username && <small className="p-error">Username is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <InputText
                        id="email"
                        value={user.email}
                        onChange={(e) => onInputEmailChange(e, 'email')}
                        onBlur={(e) => validateField(e, 'email')}
                        required
                        className={classNames({ 'p-invalid': errors.email })}
                    />
                    {errors.email && <small className="p-error">Email is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="password" className="font-bold">
                        Password
                    </label>
                    <InputText
                        id="password"
                        value={user.password}
                        onChange={(e) => onInputPasswordChange(e, 'password')}
                        onBlur={(e) => validateField(e, 'password')}
                        required
                        className={classNames({ 'p-invalid': errors.password })}
                    />
                    {errors.password && <small className="p-error">Password is required.</small>}
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">User Role</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton id="1" name="rol" value="ROLE_ADMIN" onChange={onRoleChange} checked={user.roles[0].name === 'ROLE_ADMIN'} />
                            <label htmlFor="admin">Admin</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton id="2" name="rol" value="ROLE_USER" onChange={onRoleChange} checked={user.roles[0].name === 'ROLE_USER'} />
                            <label htmlFor="user">User</label>
                        </div>
                    </div>
                    {errors.role && <small className="p-error">Role is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            Are you sure you want to delete <b>{user.username}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

        </div>
    );
}
