import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
const App = () => {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const getPerson = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]
    console.log(person);
    const {
      email, 
      gender, 
      cell,
      dob:{age},
      location: {
        city, postcode, state, country, 
        street: {name, number}
      },
      login:{password},
      name: {first, last},

      picture: {large}
    } = person

    const newPerson = {
      email,
      gender, 
      phone: cell,
      age,
      password,
      address: `${number}, ${name} ${city} ${state} ${country} ${postcode}`,
      name: `${first} ${last}`,
      image: large
    }
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.fullName)
  }

  const handleValue =  (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setValue(person[newValue])
      setTitle(newValue)
    }
  }

  useEffect(() => {
    getPerson()
  }, [])

  return(
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={(person && person.image) || defaultImage} alt='random person' className="user-img" />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{person && value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={handleValue}>
              <FaUser/>
            </button>
            <button className="icon" data-label="email" onMouseOver={handleValue}>
              <FaEnvelopeOpen/>
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes/>
            </button>
            <button className="icon" data-label="address" onMouseOver={handleValue}>
              <FaMap/>
            </button>
            <button className="icon" data-label="phone" onMouseOver={handleValue}>
              <FaPhone/>
            </button>
            <button className="icon" data-label="password" onMouseOver={handleValue}>
              <FaLock/>
            </button>
          </div>
          <button className="btn" type="button" onClick={getPerson}>{loading ? 'loading...':'random user'}</button>
        </div>
      </div>
    </main>
  )
}

export default App
