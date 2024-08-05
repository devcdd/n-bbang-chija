import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import Button from '../components/common/button/Button.tsx'
import Input from '../components/common/input/Input.tsx'

interface FairPayProps {}

const FairPay = (props: FairPayProps) => {
  const moneyInputRef = useRef(null)
  const [money, setMoney] = useState<null | number>(null)
  const [round, setRound] = useState(0)

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      '%cFairPay.tsx:21 - %ce.target.value = ',
      'color:yellow;',
      'color:lightgreen; font-weight:bold',
      e.target.value,
    )
    setMoney(Number(e.target.value))
  }

  return (
    <main className={'h-full flex items-center'}>
      <section
        className={
          'p-4 w-full bg-black text-white flex flex-col justify-center items-center rounded-md bg-opacity-75 gap-2'
        }
      >
        <div>재밌는 자리였나요?</div>
        <div>총 금액을 입력해주세요.</div>
        <Input
          ref={moneyInputRef}
          value={money}
          onChange={handleMoneyChange}
          type={'text'}
        />
        <Button>차수 추가</Button>
        <div>상단의 차수 추가를 누르시면 2, 3차까지 정산하실 수 있습니다.</div>
      </section>
    </main>
  )
}

export default FairPay
