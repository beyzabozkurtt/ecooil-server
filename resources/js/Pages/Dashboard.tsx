import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useEffect, useState} from "react";
import {User, Address, Appointment, Transaction} from "@/types";

export default function Dashboard() {
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [allAddresses, setAllAddresses] = useState<Address[]>([])
    const [allAppointments, setAllAppointments] = useState<Appointment[]>([])
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([])


    // Add User Panel
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [role, setRole] = useState("");
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

    const [selectedUser, setSelectedUser] = useState<User>();

    // Edit User Panel
    const [editUsername, setEditUsername] = useState("");
    const [editName, setEditName] = useState("");
    const [editSurname, setEditSurname] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editTelephone, setEditTelephone] = useState("");
    const [editRole, setEditRole] = useState("");
    const [editProfilePhotoUrl, setEditProfilePhotoUrl] = useState("");

    useEffect(() => {
        if (selectedUser) {
            setEditUsername(selectedUser.username);
            setEditName(selectedUser.name);
            setEditSurname(selectedUser.surname);
            setEditEmail(selectedUser.email);
            setEditPassword(selectedUser.password);
            setEditTelephone(selectedUser.phone);
            setEditRole(selectedUser.role);
            setEditProfilePhotoUrl(selectedUser.profile_photo_url);
        }
    }, [selectedUser]);

    const handleEditUser = () => {
        if (!selectedUser) {
            return;
        }

        const formData = {
            username: editUsername,
            name: editName,
            surname: editSurname,
            email: editEmail,
            password: editPassword,
            phone: editTelephone,
            role: editRole,
            profile_photo_url: editProfilePhotoUrl,
        };

        fetch('/api/users/' + selectedUser.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(JSON.stringify(errorData));
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setAllUsers(allUsers.map(user => user.id === selectedUser.id ? data : user))
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    const handleAddUser = () => {
        const formData = {
            username,
            name,
            surname,
            email,
            password,
            phone: telephone,
            role,
            profile_photo_url: profilePhotoUrl,
        };

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(JSON.stringify(errorData));
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setAllUsers([...allUsers, data]);
                    setUsername("");
                    setName("");
                    setSurname("");
                    setEmail("");
                    setPassword("");
                    setTelephone("");
                    setRole("");
                    setProfilePhotoUrl("");
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setAllUsers(data))

        fetch('/api/addresses')
            .then(response => response.json())
            .then(data => setAllAddresses(data))

        fetch('/api/appointments')
            .then(response => response.json())
            .then(data => setAllAppointments(data))

        fetch('/api/transactions')
            .then(response => response.json())
            .then(data => setAllTransactions(data))
    }, [allUsers]);

    const DeleteUserHandler = (id: number) => {
        fetch('/api/users/' + id, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setAllUsers(allUsers.filter(user => user.id !== id))
                }
            })
    }

    const DeleteAddressHandler = (id: number) => {
        fetch('/api/addresses/' + id, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setAllAddresses(allAddresses.filter(address => address.id !== id))
                }
            })
    }

    const DeleteAppointmentsHandler = (id: number) => {
        fetch('/api/appointments/' + id, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setAllAppointments(allAppointments.filter(address => address.id !== id))
                }
            })
    }

    const DeleteTransactionsHandler = (id: number) => {
        fetch('/api/transactions/' + id, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setAllTransactions(allTransactions.filter(address => address.id !== id))
                }
            })
    }

    return (
        <div>
            <AuthenticatedLayout
                header={
                    <div className={"flex justify-between items-center"}>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Control Panel
                        </h2>

                        {/*<div className={"flex gap-2"}>*/}
                        {/*    <div*/}
                        {/*        className={"p-2 bg-green-500 text-white font-bold rounded cursor-pointer"}*/}
                        {/*        onClick={openModal}*/}
                        {/*    >*/}
                        {/*        Kullanıcı Ekle*/}
                        {/*    </div>*/}

                        {/*    <div className={"p-2 bg-green-500 text-white font-bold rounded cursor-pointer"}>*/}
                        {/*        Adres Ekle*/}
                        {/*    </div>*/}

                        {/*    <div className={"p-2 bg-green-500 text-white font-bold rounded cursor-pointer"}>*/}
                        {/*        Randevu Ekle*/}
                        {/*    </div>*/}

                        {/*    <div className={"p-2 bg-green-500 text-white font-bold rounded cursor-pointer"}>*/}
                        {/*        İşlem Ekle*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                }
            >
                <div className="w-min mx-12 mt-6 p-4 flex gap-12">
                    <div className={"bg-green-100 p-6 rounded-xl"}>
                        <div className={"text-xl mb-2"}>Kullanıcı Ekle</div>
                        <div className={"flex gap-2"}>
                            <div className={"gap-2 flex flex-col"}>
                                <input
                                    type="text"
                                    placeholder="Kullanıcı Adı"
                                    className={"border p-2 rounded-md"}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="İsim"
                                    className={"border p-2 rounded-md"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Soyisim"
                                    className={"border p-2 rounded-md"}
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={"border p-2 rounded-md"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={"gap-2 flex flex-col"}>
                                <input
                                    type="password"
                                    placeholder="Parola"
                                    className={"border p-2 rounded-md"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="tel"
                                    maxLength={10}
                                    placeholder="Telefon"
                                    className={"border p-2 rounded-md"}
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Rol"
                                    className={"border p-2 rounded-md"}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <input
                                    type="url"
                                    placeholder="Profil Fotoğrafı URL"
                                    className={"border p-2 rounded-md"}
                                    value={profilePhotoUrl}
                                    onChange={(e) => setProfilePhotoUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <div
                            className={"w-full flex items-center justify-center bg-green-500 mt-2 py-2 text-xl rounded cursor-pointer hover:ring transition duration-300 ring-green-400 ring-1"}
                            onClick={handleAddUser}
                        >
                            Kaydet
                        </div>
                    </div>

                    <div className={"bg-orange-100 p-6 rounded-xl"}>
                        <div className={"text-xl mb-2"}>Kullanıcı Düzenle</div>
                        <div className={"flex gap-2"}>
                            <div className={"gap-2 flex flex-col"}>
                                <input
                                    type="text"
                                    placeholder="Kullanıcı Adı"
                                    className={"border p-2 rounded-md"}
                                    value={editUsername}
                                    onChange={(e) => setEditUsername(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="İsim"
                                    className={"border p-2 rounded-md"}
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Soyisim"
                                    className={"border p-2 rounded-md"}
                                    value={editSurname}
                                    onChange={(e) => setEditSurname(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={"border p-2 rounded-md"}
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                />
                            </div>
                            <div className={"gap-2 flex flex-col"}>
                                <input
                                    type="password"
                                    placeholder="Parola"
                                    className={"border p-2 rounded-md"}
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                />
                                <input
                                    type="tel"
                                    maxLength={10}
                                    placeholder="Telefon"
                                    className={"border p-2 rounded-md"}
                                    value={editTelephone}
                                    onChange={(e) => setEditTelephone(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Rol"
                                    className={"border p-2 rounded-md"}
                                    value={editRole}
                                    onChange={(e) => setEditRole(e.target.value)}
                                />
                                <input
                                    type="url"
                                    placeholder="Profil Fotoğrafı URL"
                                    className={"border p-2 rounded-md"}
                                    value={editProfilePhotoUrl}
                                    onChange={(e) => setEditProfilePhotoUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <div
                            className={"w-full flex items-center justify-center bg-orange-500 mt-2 py-2 text-xl rounded cursor-pointer hover:ring transition duration-300 ring-orange-400 ring-1"}
                            onClick={handleEditUser}
                        >
                            Kaydet
                        </div>
                    </div>
                </div>

                <Head title="Dashboard"/>

                <div className="py-6 px-16">
                    <div className={"bg-white p-4 rounded-t-md border-b-[1px]"}>
                        <div className={"text-xl"}>Kullanıcılar</div>
                    </div>
                    <div className={"bg-white p-4 rounded-b-md mb-12"}>
                        <table className={"w-full"}>
                            <thead>
                            <tr>
                                <th className={"text-left border-b-[1px] p-2"}>ID</th>
                                <th className={"text-left border-b-[1px] p-2"}>Username</th>
                                <th className={"text-left border-b-[1px] p-2"}>Name</th>
                                <th className={"text-left border-b-[1px] p-2"}>Surname</th>
                                <th className={"text-left border-b-[1px] p-2"}>Email</th>
                                <th className={"text-left border-b-[1px] p-2"}>Phone</th>
                                <th className={"text-left border-b-[1px] p-2"}>Profile Photo</th>
                                <th className={"text-left border-b-[1px] p-2"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {allUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className={`border-b-[1px] cursor-pointer ${selectedUser?.id === user.id ? 'bg-gray-100' : ''}`}
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <td className={"p-2 border-r-[1px]"}>{user.id}</td>
                                    <td className={"p-2 border-r-[1px]"}>{user.username}</td>
                                    <td className={"p-2 border-r-[1px]"}>{user.name}</td>
                                    <td className={"p-2 border-r-[1px]"}>{user.surname}</td>
                                    <td className={"p-2 border-r-[1px]"}>{user.email}</td>
                                    <td className={"p-2 border-r-[1px]"}>{user.phone}</td>
                                    <td className={"p-2 border-r-[1px]"}>{user.profile_photo_url}</td>
                                    <td className={"p-2"}>
                                        <button onClick={() => DeleteUserHandler(user.id)}
                                                className={"bg-red-500 text-white p-2 rounded-md"}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={"bg-white p-4 rounded-t-md border-b-[1px]"}>
                        <div className={"text-xl"}>Adresler</div>
                    </div>
                    <div className={"bg-white p-4 rounded-b-md mb-12"}>
                        <table className={"w-full"}>
                            <thead>
                            <tr>
                                <th className={"text-left border-b-[1px] p-2"}>ID</th>
                                <th className={"text-left border-b-[1px] p-2"}>Address Name</th>
                                <th className={"text-left border-b-[1px] p-2"}>Address Line 1</th>
                                <th className={"text-left border-b-[1px] p-2"}>User ID</th>
                                <th className={"text-left border-b-[1px] p-2"}>Latitude</th>
                                <th className={"text-left border-b-[1px] p-2"}>Longitude</th>
                                <th className={"text-left border-b-[1px] p-2"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {allAddresses.map((address) => (
                                <tr key={address.id} className={"border-b-[1px]"}>
                                    <td className={"p-2 border-r-[1px]"}>{address.id}</td>
                                    <td className={"p-2 border-r-[1px]"}>{address.address_name}</td>
                                    <td className={"p-2 border-r-[1px]"}>{address.address_line_1}</td>
                                    <td className={"p-2 border-r-[1px]"}>{address.user_id}</td>
                                    <td className={"p-2 border-r-[1px]"}>{address.latitude}</td>
                                    <td className={"p-2 border-r-[1px]"}>{address.longitude}</td>
                                    <td className={"p-2"}>
                                        <button onClick={() => DeleteAddressHandler(address.id)}
                                                className={"bg-red-500 text-white p-2 rounded-md"}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={"bg-white p-4 rounded-t-md border-b-[1px]"}>
                        <div className={"text-xl"}>Randevular</div>
                    </div>
                    <div className={"bg-white p-4 rounded-b-md mb-12"}>
                        <table className={"w-full"}>
                            <thead>
                            <tr>
                                <th className={"text-left border-b-[1px] p-2"}>ID</th>
                                <th className={"text-left border-b-[1px] p-2"}>User ID</th>
                                <th className={"text-left border-b-[1px] p-2"}>Address</th>
                                <th className={"text-left border-b-[1px] p-2"}>Date</th>
                                <th className={"text-left border-b-[1px] p-2"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {allAppointments.map((appointment) => (
                                <tr key={appointment.id} className={"border-b-[1px]"}>
                                    <td className={"p-2 border-r-[1px]"}>{appointment.id}</td>
                                    <td className={"p-2 border-r-[1px]"}>{appointment.user_id}</td>
                                    <td className={"p-2 border-r-[1px]"}>{appointment.address}</td>
                                    <td className={"p-2 border-r-[1px]"}>{appointment.date}</td>
                                    <td className={"p-2"}>
                                        <button onClick={() => DeleteAppointmentsHandler(appointment.id)}
                                                className={"bg-red-500 text-white p-2 rounded-md"}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={"bg-white p-4 rounded-t-md border-b-[1px]"}>
                        <div className={"text-xl"}>İşlemler</div>
                    </div>
                    <div className={"bg-white p-4 rounded-b-md mb-12"}>
                        <table className={"w-full"}>
                            <thead>
                            <tr>
                                <th className={"text-left border-b-[1px] p-2"}>ID</th>
                                <th className={"text-left border-b-[1px] p-2"}>Amount</th>
                                <th className={"text-left border-b-[1px] p-2"}>User ID</th>
                                <th className={"text-left border-b-[1px] p-2"}>Address ID</th>
                                <th className={"text-left border-b-[1px] p-2"}>Appointment ID</th>
                                <th className={"text-left border-b-[1px] p-2"}>Points</th>
                                <th className={"text-left border-b-[1px] p-2"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {allTransactions.map((transaction) => (
                                <tr key={transaction.id} className={"border-b-[1px]"}>
                                    <td className={"p-2 border-r-[1px]"}>{transaction.id}</td>
                                    <td className={"p-2 border-r-[1px]"}>{transaction.amount}</td>
                                    <td className={"p-2 border-r-[1px]"}>{transaction.user_id}</td>
                                    <td className={"p-2 border-r-[1px]"}>{transaction.address_id}</td>
                                    <td className={"p-2 border-r-[1px]"}>{transaction.appointment_id}</td>
                                    <td className={"p-2 border-r-[1px]"}>{transaction.points}</td>
                                    <td className={"p-2"}>
                                        <button onClick={() => DeleteTransactionsHandler(transaction.id)}
                                                className={"bg-red-500 text-white p-2 rounded-md"}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
