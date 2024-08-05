import React from 'react'

import classNames from 'classnames'
import { Button as ShadcnButton } from '../../ui/button'
import { cn } from '../../../lib/utils.ts'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

const Button = (props: ButtonProps) => {
  return (
    <ShadcnButton className={cn('', props.className)} onClick={props.onClick}>
      {props.children}
    </ShadcnButton>
  )
}

export default Button
