import {
  setPaymentList,
  usePaymentListStore,
} from '../store/usePaymentListStore.ts'
import { useMemberListStore } from '../store/useMemberListStore.ts'
import { useEffect } from 'react'

export const usePayment = (meetingIndex: number) => {
  const paymentList = usePaymentListStore((state) => state.paymentList)
  const memberList = useMemberListStore((state) => state.memberList)

  const addPayment = () => {
    setPaymentList([
      ...paymentList,
      {
        title: '',
        description: '',
        memberListToPay: memberList.map((member) => member.name),
        memberListToNotPay: [],
        payer: '',
        amount: 0,
      },
    ])
  }

  useEffect(() => {
    if (meetingIndex + 1 > paymentList.length) {
      addPayment()
      return
    }
  }, [meetingIndex])

  return { addPayment }
}
