import moment from 'moment'

const ACCESSDURATIONRULES = 4 //minutes
const REFRESHDURATIONRULES = 23 // hours

const checkSession = async ({accessTokenTime, refreshTokenTime}) => {
  const accessDuration = now.diff(moment(parseint(accessTokenTime)), 'minutes')
  const refreshDuration = now.diff(moment(parseint(refreshTokenTime)), 'hours')
    if (accessDuration >= ACCESSDURATIONRULES && refreshDuration < REFRESHDURATIONRULES) {
      return 'refresh'
    } else if (refreshDuration >= REFRESHDURATIONRULES) {
        return false
      }
    }


export default async function checktokens({accessTokenTime, refreshTokenTime}) {

  if (ACCESSTOKEN && REFRESHTOKEN) {
    // acess token
    const isValid = checkSession({accessTokenTime: accessTokenTime, refreshTokenTime: refreshTokenTime})
    if (isValid === true || 'refresh') {
      return isValid
    } else {
      location.replace('/login/')
      }
    }
  }