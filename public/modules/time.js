const getTime = () => {
    return new Date().getTime() / 1000;
}

//Returns in minutes
const compareTime = (newer, older) => {
    return (newer - older)
}

export { getTime, compareTime };