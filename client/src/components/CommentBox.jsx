import React, { useState, useEffect } from 'react'
import { getCommentsForSkill, postComment, deleteComment } from '../api/commentApi'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function CommentBox({ skillId }){
  const { user } = useContext(AuthContext)
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  useEffect(()=>{
    fetch()
  },[skillId])

  const fetch = async () => {
    const res = await getCommentsForSkill(skillId)
    setComments(res.data)
  }

  const submit = async (e) => {
    e.preventDefault()
    if(!text) return
    await postComment(skillId, text)
    setText('')
    fetch()
  }

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this comment?')) return
    await deleteComment(id)
    fetch()
  }

  return (
    <div>
      <h4 className="font-semibold mb-2">Comments</h4>
      {user && (
        <form onSubmit={submit} className="mb-4">
          <textarea className="w-full border rounded p-2" value={text} onChange={(e)=>setText(e.target.value)} />
          <button className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded">Post</button>
        </form>
      )}
      <div className="space-y-3">
        {comments.map(c => (
          <div key={c._id} className="border p-3 rounded">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">{c.userId?.name}</div>
              <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
            </div>
            <div className="mt-1">{c.text}</div>
            {(user && (user.id === c.userId?._id || user.id === c.userId)) && (
              <button onClick={()=>handleDelete(c._id)} className="mt-2 text-red-500 text-sm">Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
