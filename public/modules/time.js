const getTime = () => {
    return new Date().getTime() / 1000;
}

//Returns in minutes
const compareTime = (newer, older) => {
    if(!newer || !older) return -1;
    return (newer - older) / 60
}

export { getTime, compareTime };