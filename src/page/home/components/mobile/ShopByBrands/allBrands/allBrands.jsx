import React from 'react'
import ViewAll from '../../viewAll/viewAll'
import { useEffect } from 'react'
import { useState } from 'react'
import { BASE_URL } from '../../../../../../constant'
import axios from 'axios'
import Spinner from '../../loader/spinner'

const AllBrands = () => {
  const [allBrands, setAllBrands] = useState(false)
  useEffect(() => {
    getAllBrands()
  }, [])

  const getAllBrands = async () => {
    try {
      let response = await axios.get(BASE_URL + `/brands?active=${true}`);
      setAllBrands(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    allBrands ?
      <div className='cs-mrl-10 cs-tm-20'>
        <ViewAll data={allBrands} type={1} />
      </div>
      : <Spinner />
  )
}

export default AllBrands