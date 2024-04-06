import {
  Container,
  CountryList,
  Heading,
  Loader,
  SearchForm,
  Section,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';

export const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const region = searchParams.get('region');
    if (!region) return;

    setIsLoading(true);
    fetchByRegion(region)
      .then(countries => setCountries(countries))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const searchCountry = region => {
    setSearchParams({ region });
  };

  return (
    <Section>
      <Container>
        <SearchForm searchCountry={searchCountry} />
        <CountryList countries={countries} />
        {isLoading && <Loader />}
        {error && <Heading title={error} />}
      </Container>
    </Section>
  );
};
