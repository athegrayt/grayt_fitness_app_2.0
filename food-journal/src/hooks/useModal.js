import {useState, useEffect} from 'react'

const useModal = (status) => {
    const [modalStatus, setModalStatus] = useState(false)

    useEffect(()=>{
        if(status===null){
            setModalStatus(!modalStatus)
        }
        setModalStatus(status)
    }, [status])
    return modalStatus
}

export default useModal