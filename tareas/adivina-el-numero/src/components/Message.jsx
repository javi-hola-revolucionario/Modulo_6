import React from 'react'

function Message({ message, won }) {
  return (
    <div className={won ? 'message won' : 'message'}>
      {message}
    </div>
  )
}

export default Message
