//Format Date 
import moment from 'moment';


const parseDate = (value) => {
    return moment(value).format('YYYY-MM-DD')
}

export default parseDate;