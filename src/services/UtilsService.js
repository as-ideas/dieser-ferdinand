class UtilsService {
    formatDate(date) {
        date = new Date(date);

        let dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        let dayName = dayNames[date.getDay()];

        let day = date.getDate();
        if (day < 10) day = '0' + day;
        let month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;
        let year = date.getFullYear().toString().substr(-2);

        return `${dayName}, ${day}.${month}.${year}`;
    }

    formatBalance(balance) {
        return (balance / 100).toFixed(2) + '¢'
    }

}

export default new UtilsService();
