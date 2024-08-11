import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { message } from 'antd'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

message.config({
  duration: 3,
  top: 200,
  maxCount: 1,
  // rtl: false,
})

export const SuccessMessage = (content: string) => {
  message.success(
    {
      content: content,
    },
    3,
  )
}

export const InfoMessage = (content: string) => {
  message.info(
    {
      content: content,
    },
    3,
  )
}

export const WarningMessage = (content: string) => {
  message.warning({
    content: content,
  })
}

export const ErrorMessage = (content: string) => {
  message.error(
    {
      content: content,
    },
    3,
  )
}
