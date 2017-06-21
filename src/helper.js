const changeDateFormat = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}년 ${dateObj.getMonth()+1}월 ${dateObj.getDate()}일`
};

export default changeDateFormat

