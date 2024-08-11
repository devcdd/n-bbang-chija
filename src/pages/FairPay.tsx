import React, { useRef, useState } from 'react'
import Button from '../components/common/button/Button.tsx'
import Input from '../components/common/input/Input.tsx'
import Header from '../assets/icons/components/header/Header.tsx'

interface FairPayProps {}

const FairPay = (props: FairPayProps) => {
  const [money, setMoney] = useState('')

  const handleNumberClick = (num: string) => {
    setMoney((prevMoney) => prevMoney + num)
  }

  const handleDeleteClick = () => {
    setMoney((prevMoney) => prevMoney.slice(0, -1))
  }

  const handleSubmitClick = () => {
    const amount = Number(money)
    if (!isNaN(amount)) {
      console.log('Amount submitted:', amount)
      // Handle the submitted amount here
    }
  }

  const handleAddAmountClick = (amount: number) => {
    const currentAmount = Number(money.replace(/,/g, ''))
    const newAmount = currentAmount + amount
    setMoney(formatMoney(newAmount.toString()))
  }

  const formatMoney = (value: string) => {
    // Remove any non-numeric characters
    const cleanedValue = value.replace(/\D/g, '')
    // Format the number with commas
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <main className={'h-full'}>
      <Header />
      <div className={'text-center text-4xl font-semibold'}>
        <div>가격을 입력해주세요 !</div>
      </div>
      <div className={'text-6xl font-black text-center mt-4'}>
        {money === '' ? 0 : formatMoney(money)}원
      </div>
      <div className={'mt-8 flex gap-2'}>
        <div
          className={
            'rounded-xl border-2 border-black text-black font-semibold flex items-center justify-center cursor-pointer py-1 px-2'
          }
          onClick={() => handleAddAmountClick(1000)}
        >
          + 1000원
        </div>
        <div
          className={
            'rounded-xl border-2 border-black text-black font-semibold flex items-center justify-center cursor-pointer px-2 py-1'
          }
          onClick={() => handleAddAmountClick(10000)}
        >
          + 10000원
        </div>
      </div>
      <div className={'mt-4 grid grid-cols-3 gap-2 h-[300px] select-none'}>
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
          {'<='}
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
    </main>
  )
}

export default FairPay
