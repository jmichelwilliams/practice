import React, { useState } from 'react'
import styled from 'styled-components'

interface ISSData {
  message: string
  timestamp: number
  iss_position: {
    longitude: number
    latitude: number
  }
}
const fetchCoordinates = async () => {
  try {
    const response = await fetch('http://api.open-notify.org/iss-now.json')
    if (!response.ok) {
      throw new Error('failed to fetch ISS data')
    }

    const parsedResponse: ISSData = await response.json()
    console.log('parsedResponse: ', parsedResponse)
    return parsedResponse
  } catch (error) {
    console.log(error)
  }
}
const Homepage: React.FC = () => {
  const [coordinates, setCoordinates] = useState<ISSData | null>(null)

  const handleClick = async () => {
    const fetchedCoordinates = await fetchCoordinates()

    if (fetchedCoordinates) {
      setCoordinates(fetchedCoordinates)
    }
  }
  console.log('coordinates: ', coordinates)
  return (
    <>
      <Container>
        <h1>ISS Space Station Location</h1>
        <button onClick={handleClick}>Click to get Location</button>
        {coordinates && <p>{coordinates.iss_position.latitude}</p>}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export default Homepage
