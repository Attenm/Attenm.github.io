let personParams = {
    weight: +localStorage.getItem('user-weight'),
    bmr: +localStorage.getItem('user-bmr'),
    bmi: +localStorage.getItem('user-bmi'),
    height: +localStorage.getItem('user-height'),
    age: +localStorage.getItem('user-age')
};

export default personParams;
