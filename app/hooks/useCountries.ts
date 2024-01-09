import countries from "world-countries";


const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    latlng: country.latlng,
    region: country.region
}))


const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value)
    }

    return {
        getByValue,
        getAll
    }
}

export default useCountries