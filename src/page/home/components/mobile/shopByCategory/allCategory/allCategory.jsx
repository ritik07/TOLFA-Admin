import React from 'react'
import ViewAll from '../../viewAll/viewAll'
import { useEffect } from 'react'
import { useState } from 'react'
import { BASE_URL } from '../../../../../../constant'
import axios from 'axios'
import Spinner from '../../loader/spinner'

const AllCategory = () => {
  const [allCategory, setAllCategory] = useState(false)
  useEffect(() => {
    getAllBrands()
  }, [])

  const getAllBrands = async () => {
    try {
      let response = await axios.get(BASE_URL + `/categories?active=${true}`);
      setAllCategory(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    allCategory ?
      <div className='cs-mrl-10 cs-tm-20'>
        <ViewAll data={allCategory} type={2} />
      </div>
      : <Spinner />
  )
}

export default AllCategory