import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import map from '../../assets/images/Map.jpg'


const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext()

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [location, setLocation] = useState(user?.location)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location) {
      displayAlert()
      return
    }
    updateUser({ name, email, lastName, location })
  }

  return (
    <Wrapper>
      <img src={map} alt='map' />
    </Wrapper>
  )
}

export default Profile
