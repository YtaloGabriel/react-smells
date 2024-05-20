import { useState, useEffect } from 'react'
import { UserList } from './Users'
import { API_BASEURL } from './config'

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      let resp = await fetch(`${API_BASEURL}/users`)
      let data = await resp.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])


  function NewUser() {
    const [name, setName] = useState('');

    function handleSubmit(e: any) {
      e.preventDefault()
      fetch(`${API_BASEURL}/users`, {
        method: 'POST',
        body: JSON.stringify({ name })
      }).then(response => response.json()).then(data => {
          setUsers([...users, data]);
          setName('')
        });
    }

    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
    )
  }

  return (
    <div>
      <h1>Manage Users</h1>
      <NewUser />
      <ul><UserList users={users} /></ul>
    </div>
  )
}

export default App

