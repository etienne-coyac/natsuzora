const configDal = require('../dal/config.dal');

async function getConfig(name, default_value = false){
    let result = await configDal.getConfig(name);
    if(result===-1) return default_value;
    return result;
}

module.exports = { getConfig }