import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Home.css"
// import ProfileCard from '../components/ProfileCard/ProfileCard'

function Home() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tokens, setTokens] = useState(10)
  const [date, setDate] = useState(0)
  const [username, setUsername] = useState("")

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  const handleChange = (e) => {
		// console.log(e.target.value)
	};

  const handleSubmit = (e) => {
    e.preventDefault()
    setTokens(e.target.token.value)
    setDate(0)
  }

  useEffect( (handleLogout) => {
    const getData = async () => {
      if (loading) {
          const url = "http://localhost:8000/api/list";
          const res = await axios.get(url);
          setData(res.data.data)

          const url1 = "http://localhost:8000/api/verifyTokenExpiration";
          let token = localStorage.getItem("token")
          console.log(token)
          const data = {
            token
          }
          const res1 = await axios.post(url1, data);
          console.log(res1.data)
          setDate(Math.floor(parseInt(res1.data.date)))
          setUsername(res1.data.username)
      }
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    getData()

  }, [loading])

  useEffect( (handleLogout) => {
    if (tokens <= 1 ) {
      localStorage.removeItem('token')
      window.location.reload()
    }
    if (date > 1) {
      setTimeout(() => {
        setTokens(tokens => date - Math.floor(Date.now() / 1000))
      }, 1000)
    }
    if (0 >= date ) {
      setTimeout(() => {
        setTokens(tokens => tokens - 1)
      }, 1000)
    }
  }, [tokens, loading, date])

   if (loading) return (
    <div className="text-center mt-5" >
    <div className="spinner-border" role="status">
      {/* <span className="sr-only">...</span> */}
    </div>
  </div>
   )
   else
   return (
   <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid d-flex p-3">
            <div className="navbar-brand">JOVO BOOK</div>
            <div>Bienvenue {username}</div>
            <div className="d-flex">
              <button className='btn btn-light text-dark' onClick={handleLogout}>Log out</button>
            </div>
        </div>
      </nav>
      <div className="text-center container token p-4">
        <div>La durée restante de vie de votre token (en seconde) est: <strong>{tokens}</strong></div>
        <form  onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} name='token'/>&nbsp;
            <button className="btn btn-dark" type='submit'>
              change token duration
            </button>
        </form>
      </div>
      <div className="text-center p-2 container">
        <h2>La liste de tous les étudiants dans la base de données: </h2>
        <table className="table table-responsive table-dark table-striped">
            <thead>
                <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Classe</th>
                    <th>Role</th>
                    <th>verified</th>
                </tr>
            </thead>
            <tbody>
              {data.map(user => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.classe}</td>
                  <td>{user.role}</td>
                  <td>{String(user.verified)}</td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>


    {/* <ProfileCard /> */}

    </div>
  )
}

export default Home
