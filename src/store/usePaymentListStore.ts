import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Payment } from '../types'

interface UsePaymentListStoreType {
  paymentList: Payment[]
}

export const usePaymentListStore = create<UsePaymentListStoreType>()(
  immer((set) => ({
    paymentList: [],
  })),
)

export const setPaymentList = (paymentList: Payment[]) => {
  usePaymentListStore.setState((state) => {
    state.paymentList = paymentList
    return state
  })
}

export const setPaymentDetail = (payment: Payment, index: number) => {
  usePaymentListStore.setState((state) => {
    state.paymentList[index] = payment
    return state
  })
}
