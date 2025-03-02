const moment = require('moment')

class StringUtil {
    addWild = (txt) => {
        return `%${txt.toLowerCase()}%`
    }
    addWildStart = (txt) => {
        return `%${txt.toLowerCase()}`
    }
    addWildEnd = (txt) => {
        return `${txt.toLowerCase()}%`
    }
    formatDate = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
        if (!date) return ""
        return moment(date).format(format)
    }
    parseStringToDate = (stringDate, format = "DD MMMM YYYY") => {
        if (stringDate) {
            return moment(stringDate, format)
        }
        return null
    }
    addIdentity = (param, date, by, is_add = false) => {
        let dt = this.formatDate(date)
        if (is_add) {
            param.created_by = by
            param.created_dt = dt
        }
        param.updated_by = by
        param.updated_dt = dt
    }
    romanize = (num) => {
        let lookup = { X: 10, IX: 9, V: 5, IV: 4, I: 1}
        let roman = ''
        for(let i in lookup) {
            while(num >= lookup[i]) {
                roman += i
                num -= lookup[i]
            }
        }
        return roman
    }
}

module.exports = new StringUtil()