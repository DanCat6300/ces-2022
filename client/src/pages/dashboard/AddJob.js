import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FaRoad } from 'react-icons/fa'

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    from,
    to,
    sender,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!from || !to || !sender) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createJob()
  }
  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit trip' : 'create trip'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='from'
            value={from}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='to'
            value={to}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            // labelText='job location'
            name='sender'
            value={sender}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            labelText='type'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            // type='number'
            labelText='size'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
