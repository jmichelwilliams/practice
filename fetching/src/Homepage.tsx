/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Skeleton, Typography } from '@mui/material';
import { ISSData } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const fetchCoordinates = async (): Promise<ISSData | undefined> => {
  try {
    const response = await fetch('http://api.open-notify.org/iss-now.json');

    if (!response.ok) {
      throw new Error('failed to fetch ISS data');
    }

    const parsedResponse: ISSData = await response.json();

    return parsedResponse;
  } catch (error) {
    console.log('error: ', error);
    return undefined;
  }
};

const Homepage: React.FC = () => {
  const [coordinates, setCoordinates] = useState<ISSData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const fetchedCoordinates = await fetchCoordinates();
    setIsLoading(false);

    if (fetchedCoordinates) {
      setCoordinates(fetchedCoordinates);
    }
  };

  return (
    <Container>
      <h1>ISS Space Station Location</h1>
      <button type="button" onClick={handleClick}>
        Click to get Location
      </button>
      <Typography>
        {isLoading ? (
          <Skeleton animation="wave" width={210} />
        ) : (
          coordinates && `Latitude: ${coordinates?.iss_position.latitude}`
        )}
      </Typography>
      <Typography>
        {isLoading ? (
          <Skeleton animation="wave" width={210} />
        ) : (
          coordinates && `Longitude: ${coordinates.iss_position.longitude}`
        )}
      </Typography>
    </Container>
  );
};

export default Homepage;
