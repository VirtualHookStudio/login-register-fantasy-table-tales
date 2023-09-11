module.exports = app => {
    const {returnJsonCountry} = app.api.tool
    const getCountries = async (req, res) => {
        const jsonData = await returnJsonCountry()

        const countries = jsonData.countries.map(object => {
            const { states, ...variables } = object;
            return variables;
        });
      
        res.json(countries);
    }

    return {getCountries}
}