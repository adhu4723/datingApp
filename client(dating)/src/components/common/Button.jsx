import React from 'react'

function Button({label}) {
  return (
    <button
          type="submit"
          className=" w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition px-4 "
        >
          {label}
        </button>
  )
}

export default Button
