const fs = require('fs')
const bcrypt = require('bcryptjs')
const { format } = require('date-fns')

module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        }catch(msg){
            return
        }
        throw msg
    }

    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    function notEqualsOrError(valueA, valueB, msg) {
        if(valueA === valueB) throw msg
    }

    const constructionTimer = (timestamp) => {
        let t = timestamp.created_at
        timestamp.created_at = format(t, "dd/MM/yyyy HH:mm")
        
        if(timestamp.deleted_at){
            t = timestamp.deleted_at
            timestamp.deleted_at = format(t, "dd/MM/yyyy HH:mm")
        }
        
        return timestamp
    }

    const encryptPass = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const stringGenerator = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let stringGenerate = "";

        for (let i = 0; i < 8; i++) {
          const Ramdom = Math.floor(Math.random() * characters.length);
          stringGenerate += characters.charAt(Ramdom);
        }
    
        return stringGenerate;
    }

    const returnJsonCountry = async () => {
        const data = await fs.promises.readFile('./jsons/countries.json', 'utf8');
        return jsonData = JSON.parse(data);
    }

    const saveImgBase64 = async (base64, id, location, unlink = null) => {
        if(base64.includes("png;base64,")){
            var base64Data = base64.replace(/^data:image\/png;base64,/, "");
        }else if(base64.includes("jpg;base64,")){
            var base64Data = base64.replace(/^data:image\/jpg;base64,/, "");
        }else{
            var base64Data = base64.replace(/^data:image\/jpeg;base64,/, "");
        }

        const date = new Date()
        const name = id + "_" + date.getFullYear() + "_" + date.getDate() + "_" + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds() + ".png"
        
        if(unlink){
            fs.unlinkSync(location + unlink)
        }
        
        fs.writeFileSync(location + name, base64Data, 'base64', function(err) {
            if(!err){
                return res.status(400).send(err)
            }
        });
        return name
    }

    const convertImgBase64 = (location, name) => {
        return imageBase64 = fs.readFileSync(location + name).toString('base64');
    }

    return {existsOrError, notExistsOrError, equalsOrError, notEqualsOrError, constructionTimer, encryptPass, stringGenerator, returnJsonCountry, saveImgBase64, convertImgBase64}
}