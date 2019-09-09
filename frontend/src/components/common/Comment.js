import React from  'react'


const Comment = ({ id, user, content, handleDeleteComment }) => {
  return (
    <section className="section">
      <div className="container">
        <p>{user.username}</p>
        <p>{content}</p>
      </div>
      <div className="container">
        <div key={id} className="buttons">
          <button className="button">Edit</button>
          <button className="button" id={id} onClick={handleDeleteComment}>Delete</button>
        </div>
      </div>
    </section>
  )
}

export default Comment
