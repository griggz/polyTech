import React, { useState } from "react"
import moment from 'moment'
import axios from 'axios'


export default async function CheckTokens() {
  const now = moment(moment.now())
  if (window.localStorage.getItem('accessToken') && window.localStorage.getItem('refreshToken')) {
    // ACESS TOKEN
    const accessDurationRules = 4 // minutes
    const accessDuration = now.diff(moment(parseInt(window.localStorage.getItem('accessTokenTime'))), 'minutes')
    // REFRESH TOKEN
    const refreshDurationRules = 23 // hours
    const refreshDuration = now.diff(moment(parseInt(window.localStorage.getItem('refreshTokenTime'))), 'hours')
    if (refreshDuration >= refreshDurationRules) {

      location.replace('/login/')
        }
    else if (accessDuration >= accessDurationRules) {
      let token = await axios.post('/api/account/refresh_token/', {
      refresh: window.localStorage.getItem('refreshToken').replace(/['"]+/g, ''),
      }).then(r => r.data).catch(function (error) { console.log(error) })
          window.localStorage.setItem('accessToken', JSON.stringify(token.access));
          window.localStorage.setItem('accessTokenTime', JSON.stringify(moment.now()))

          return true
      }
      else {
        return true
      }
    }
    else {
      location.replace('/login/')
    }
  }