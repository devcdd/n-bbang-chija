export interface Option {
  title: string
  description: string
  icon: string
  onClick?: () => void
}

export interface Member {
  name: string
  money: number
}

export type Payment = {
  title: string
  description: string
  memberListToPay: string[]
  memberListToNotPay: string[]
  payer: string
  amount: number
}
