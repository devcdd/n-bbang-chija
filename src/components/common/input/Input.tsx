import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { Input as ShadcnInput } from '../../ui/input.tsx'

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  className?: string
  type?: 'text' | 'number'
  placeholder?: string
  onEnterPress?: () => void // 새로운 prop 추가
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && props.onEnterPress) {
      e.preventDefault()

      if (e.nativeEvent.isComposing) return

      props.onEnterPress()
    }
  }

  return (
    <ShadcnInput
      ref={ref}
      placeholder={props.placeholder}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      onKeyDown={handleKeyDown}
      className={classNames(
        'focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-400',
        props.className,
      )}
    />
  )
})

Input.displayName = 'Input' // forwardRef를 사용할 때 displayName 설정
export default Input
