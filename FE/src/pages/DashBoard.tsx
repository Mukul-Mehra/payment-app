import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import SendMoneyModal from "./SendMoneyModal";

export function DashBoard() {
    const [users, setUsers] = useState<User[]>([]);
    const [balance, setBalance] = useState<number | null>(null);
    const [filter, setFilter] = useState("");
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [currentUser, setCurrentUser] = useState<{ firstName: string; lastName: string } | null>(null);

    interface User {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
    }

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/users/bulk?filter=" + filter,{
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })
            .then((response) => {
                setUsers(response.data.user);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
            });
    }, [filter]);

    const token = localStorage.getItem("token");
    if (!token) return;

useEffect(()=>{
        axios
        .get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `${token}`, // pass token for auth
            },
        })
        .then((res) => {
            setBalance(res.data.balance);
        })
        .catch((err) => {
            console.error("Error fetching balance:", err);
        });
})
    useEffect(() => {
        // If query params exist, set selectedUser automatically
        const id = searchParams.get("id");
        const firstName = searchParams.get("firstname");
        const lastName = searchParams.get("lastname");

        if (id && firstName && lastName) {
            setSelectedUser({ _id: id, firstName, lastName });
        }
    }, [searchParams]);


    const handleSendMoneyClick = (user: User) => {
        // update query params in URL
        navigate(
            `?id=${user._id}&firstName=${encodeURIComponent(
                user.firstName
            )}&lastName=${encodeURIComponent(user.lastName)}`
        );

        // also set local state so modal opens immediately
        setSelectedUser(user);
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get("http://localhost:3000/api/v1/me", {
                headers: { Authorization: `${token}` },
            })
            .then((res) => setCurrentUser(res.data))
            .catch((err) => console.error("Error fetching user:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Navbar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                <h1 className="text-lg font-bold">Payments App</h1>
                <div className="flex items-center gap-2">
                    <span>
                        Hello, {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Loading..."}
                    </span>

                    <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
                        {currentUser ? `${currentUser.firstName[0].toUpperCase()}` : "U"}
                    </div>
                    <div>
                        <Button
                            label="LogOut"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/signin");
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
                <div className="mb-6">
                    <h2 className="font-semibold">
                        Your Balance <span className="ml-2">{balance !== null ? `₹${balance.toFixed(2)}` : "Loading..."}</span>
                    </h2>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Users</h3>
                    <input
                        onChange={(e) => {
                            setFilter(e.target.value);
                        }}
                        type="text"
                        placeholder="Search users..."
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="space-y-3">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center uppercase">
                                        {user.firstName[0]}
                                    </div>
                                    <span>
                                        {user.firstName} {user.lastName}
                                    </span>
                                </div>

                                <button
                                    onClick={() => handleSendMoneyClick(user)}
                                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Send Money
                                </button>
                            </div>
                        ))}

                        {selectedUser && (
                            <SendMoneyModal
                                user={selectedUser}
                                onClose={() => {
                                    setSelectedUser(null);
                                    navigate(".", { replace: true }); // remove query params on close
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
