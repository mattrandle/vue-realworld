import moment from 'moment'

export default dateString => {
    return moment(dateString).format("MMMM Do YYYY, hh:mm")
};