import { Message  } from 'element-ui'

export default function msgboxErr(message, code = 'UNKNOWN') {
  Message({
    message: message,
    type: 'error',
  })

}

