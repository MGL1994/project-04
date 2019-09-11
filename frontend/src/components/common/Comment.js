import React from  'react'
import Auth from '../../lib/Auth'


const Comment = ({ id, user, content, handleDeleteComment }) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{user.username}</strong>
            <br />
            {content}
          </p>
        </div>
      </div>
      {Auth.currentUser() === user.id && <div key={id} className="media-right">
        <button className="delete" id={id} onClick={handleDeleteComment}></button>
      </div>}
    </article>
  )
}


export default Comment
