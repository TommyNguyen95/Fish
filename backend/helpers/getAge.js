function getAge(dateString) {
    if (!dateString) {
        return false
    }
    let year = dateString.slice(0, 4)
    let month = dateString.slice(4, 6)
    let day = dateString.slice(6, 8)

    let today = new Date();
    let birthDate = new Date(year, month, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

module.exports = getAge