const EMAIL_LEN_MAX = 64
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
const EMAIL_REGEX = /^([0-9a-z]([-.\w]*[0-9a-z])*@([0-9a-z][-\w]*[0-9a-z]\.)+[a-z]{2,9})$/
const USERNAME_REGEX = /^[a-zA-Z\s]{3,30}$/
const PHONE_REGEX = /^[6-9]\d{9}$/
const NAME_REGEX = /^[a-zA-Z0-9-_\s]{3,50}$/
const TRENDING_PAGE_ABBREVIATION_REGEX = /^[a-zA-Z0-9-_\s]{3,30}$/
const DESCRIPTION_LEN_MAX = 10000000
const COURSE_PRICE_MIN = 0
const RECORDEDLECTURE_PRICE_MIN = 0
const TRENDING_PAGE_PRICE_MIN = 0
const STANDARD_MIN = 0
const PRIORITY_MIN = 1

module.exports = {
    EMAIL_LEN_MAX,
    PASSWORD_REGEX,
    EMAIL_REGEX,
    USERNAME_REGEX,
    PHONE_REGEX,
    NAME_REGEX,
    DESCRIPTION_LEN_MAX,
    COURSE_PRICE_MIN,
    RECORDEDLECTURE_PRICE_MIN,
    STANDARD_MIN,
    PRIORITY_MIN,
    TRENDING_PAGE_ABBREVIATION_REGEX,
    TRENDING_PAGE_PRICE_MIN,
}
