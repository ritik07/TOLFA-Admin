import React from 'react'
import TolfaLocation from './components/tolfa-location'
import { Divider } from 'antd'

const TolfaRescueLocation = ({ rowData, refetchAdmissionList, setShowModal }) => {
  return (
    <div>
      <TolfaLocation
        tolfaLocationProps={rowData}
        refetchAdmissionList={refetchAdmissionList}
        setShowModal={setShowModal} />
    </div>
  )
}

export default TolfaRescueLocation