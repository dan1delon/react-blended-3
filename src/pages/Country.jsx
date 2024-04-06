import {
  Container,
  CountryInfo,
  GoBackBtn,
  Heading,
  Loader,
  Section,
} from 'components';
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import { fetchCountry } from 'service/countryApi';

export const Country = () => {
  const { countryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [country, setCountry] = useState(null);
  const location = useLocation();
  const goBack = useRef(location.state?.from || '/');

  useEffect(() => {
    setIsLoading(true);
    fetchCountry(countryId)
      .then(country => setCountry(country))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [countryId]);

  return (
    <Section>
      {isLoading && <Loader />}
      {error && <Heading title={error} />}
      <GoBackBtn to={goBack.current} />
      <Container>{country && <CountryInfo {...country} />}</Container>
    </Section>
  );
};
