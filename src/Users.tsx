import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

interface User {
  username: string;
}

const Users: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();
  const loc = useLocation();
  
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const getUsers = async () => {
      try {
        const resp = await axiosPrivate.get<User[]>('/users', {
          signal: controller.signal
        });
        if (isMounted) {
          setUsers(resp.data);
        }
      } catch (err) {
        console.error(err);
        nav('/login', { state: { from: loc }, replace: true });
      }
    }

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [axiosPrivate, nav, loc]);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length
        ? (
          <ul>
            {users?.map((user, i) => <li key={i}>{user?.username}</li>)}
          </ul>
        ) : <p>No users to display</p>
      }
    </article>
  );
};

export default Users;