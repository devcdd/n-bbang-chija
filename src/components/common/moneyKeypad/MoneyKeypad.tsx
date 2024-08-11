import React, { useEffect, useMemo, useState } from 'react'
import { SuccessMessage, WarningMessage } from '../../../lib/util/utils.ts'
import Button from '../button/Button.tsx'
import { PaymentStatus } from '../../../constant'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  setPaymentDetail,
  usePaymentListStore,
} from '../../../store/usePaymentListStore.ts'

interface MoneyKeypadProps {}

const MoneyKeypad = (props: MoneyKeypadProps) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const paymentList = usePaymentListStore((state) => state.paymentList)
  const meetingIndex = useMemo<number>(() => {
    return Number(searchParams.get('meeting')) - 1
  }, [searchParams])
  const [money, setMoney] = useState('')

  const handleNumberClick = (num: string) => {
    setMoney((prevMoney) => prevMoney + num)
  }

  const handleDeleteClick = () => {
    setMoney((prevMoney) => prevMoney.slice(0, -1))
  }

  const handleSubmitClick = () => {
    const amount = Number(money)
    if (amount !== 0) {
      navigate(`/fairpay?meeting=${meetingIndex + 2}`)
      return
    }
    WarningMessage('적어도 1원 이상 입력해주세요.')
  }

  const handleAddAmountClick = (amount: number) => {
    const currentAmount = Number(money.replace(/,/g, ''))
    const newAmount = currentAmount + amount
    setMoney(formatMoney(newAmount.toString()))
  }

  const formatMoney = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '')
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  useEffect(() => {
    const newPaymentList = [...paymentList].map((payment) => {
      return {
        ...payment,
        amount: payment.amount,
      }
    })
    setPaymentDetail(
      {
        ...newPaymentList[meetingIndex],
        amount: Number(money.replace(/,/g, '')),
      },
      meetingIndex,
    )
  }, [money])

  return (
    <>
      <div className={'mt-8 flex gap-2'}>
        <div
          className={
            'rounded-xl border-2 border-black text-black font-semibold flex items-center justify-center cursor-pointer py-1 px-2 select-none'
          }
          onClick={() => {
            SuccessMessage('1000원이 추가되었습니다.')
            handleAddAmountClick(1000)
          }}
        >
          + 1000원
        </div>
        <div
          className={
            'rounded-xl border-2 border-black text-black font-semibold flex items-center justify-center cursor-pointer px-2 py-1 select-none'
          }
          onClick={() => {
            SuccessMessage('10000원이 추가되었습니다.')
            handleAddAmountClick(10000)
          }}
        >
          + 10000원
        </div>
      </div>
      <div className={'mt-4 grid grid-cols-3 gap-2 h-[400px] select-none'}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            className={'h-full text-2xl'}
            key={number}
            onClick={() => handleNumberClick(number.toString())}
          >
            {number}
          </Button>
        ))}
        <Button className={'h-full text-2xl'} onClick={handleDeleteClick}>
          {'지우기'}
        </Button>
        <Button
          className={'h-full text-2xl'}
          onClick={() => handleNumberClick('0')}
        >
          0
        </Button>
        <Button className={'h-full text-2xl'} onClick={handleSubmitClick}>
          입력완료
        </Button>
      </div>
    </>
  )
}

export default MoneyKeypad
