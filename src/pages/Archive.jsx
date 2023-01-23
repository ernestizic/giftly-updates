import Button from 'components/global/Button'
import { setAlert } from 'features/alert/alertSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

const Archive = () => {
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setAlert({
            type: 'error',
            message: 'Alert Message that should take up about two (2) lines'
        }))
    }
  return (
    <div>
        <Button text="Click me" onClick={handleClick}/>
    </div>
  )
}

export default Archive