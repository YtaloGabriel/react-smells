import { useState, useEffect, useMemo } from 'react'
import { API_BASEURL } from './config'

export interface User {
  _id: string;
  name: string;
}

interface UserListProps {
  users: User[];
}


export function UserList({ users }: UserListProps) {
    const [internalUsers, setInternalUsers] = useState(users);

    useEffect(() => {
      fetch(`${API_BASEURL}/users`)
        .then(response => response.json())
        .then(data => setInternalUsers(data));
    });

    return (
      <>
    {internalUsers.map((user) => (
      <li><Item userId={user._id} /></li>
    ))}
      </>
        
    );
};

type UserDetailsProps = {
  userId: string;
}

export const Item: React.FC<UserDetailsProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)

  if (userId) {
    useEffect(() => {
      fetch(`${API_BASEURL}/users/${userId}`).then(response => response.json()).then(data => setUser(data));
    }, []);
  }

  const upperCaseUser = useMemo(() => user?.name.toUpperCase(), [user])

  return <span>User Info: {upperCaseUser}</span>;
};

``
