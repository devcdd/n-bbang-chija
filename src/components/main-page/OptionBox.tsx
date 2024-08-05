import React from 'react'

interface OptionBoxProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick?: () => void
}

const OptionBox = (props: OptionBoxProps) => {
  return (
    <article
      className={
        'relative bg-black h-[300px] text-white p-4 flex flex-col hover:scale-95 transition-transform ease-in-out cursor-pointer bg-opacity-90 rounded-md select-none gap-8'
      }
      onClick={props.onClick}
    >
      <div className={'text-2xl font-bold'}>{props.title}</div>
      <div className={'mt-2 leading-8'}>{props.description}</div>
      {
        <props.icon
          className={
            'absolute h-8 z-0 select-none fill-white mr-auto right-3 bottom-3'
          }
        />
      }
    </article>
  )
}

export default OptionBox
