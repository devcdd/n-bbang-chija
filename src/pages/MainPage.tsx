import React, { useMemo } from 'react'
import OptionBox from '../components/main-page/OptionBox.tsx'
import { useNavigate } from 'react-router-dom'
import { Option } from '../types'
import { PaymentMethod } from '../constant'
import Header from '../assets/icons/components/header/Header.tsx'
import MoneyHandIcon from '../assets/icons/components/icon/MoneyHandIcon.tsx'
import MoneyCirculationIcon from '../assets/icons/components/icon/MoneyCirculationIcon.tsx'
import WalletIcon from '../assets/icons/components/icon/WalletIcon.tsx'

interface MainPageProps {}

const MainPage = (props: MainPageProps) => {
  const navigate = useNavigate()

  const handleCalculate = (option: PaymentMethod) => {
    switch (option) {
      case PaymentMethod.FAIR_PAYMENT:
        navigate('/members?type=fair-pay')
        break
      case PaymentMethod.ONE_BASKET_PAYMENT:
        navigate('/members?type=one-basket-pay')
        break
      case PaymentMethod.RANDOM_PAYMENT:
        navigate('/members?type=random-pay')
        break
    }
  }

  const OptionList = useMemo<Option[]>(
    () => [
      {
        title: '공정한 N빵',
        description:
          '흔히 알고 계시는 N빵입니다, 중간에 누가 빠진 것도 잘 감안해서 계산을 도와드립니다.',
        icon: MoneyHandIcon,
        onClick: () => handleCalculate(PaymentMethod.FAIR_PAYMENT),
      },
      {
        title: '몰빵',
        description:
          '청구 할 (1~N)명에게 몰빵을 치는 방법입니다. 다소 위험도가 있으니 꼭 유의해서 사용하십시오.',
        icon: WalletIcon,
        onClick: () => handleCalculate(PaymentMethod.ONE_BASKET_PAYMENT),
      },
      {
        title: '랜덤 N빵',
        description:
          '완전한 랜덤입니다. 개개인이 내야 할 금액이 랜덤하게 정해집니다. 높은 금액이 걸렸다고 해도 쿨하게 넘어가는 멋진 사람이 됩시다.',
        icon: MoneyCirculationIcon,
        onClick: () => handleCalculate(PaymentMethod.RANDOM_PAYMENT),
      },
    ],
    [],
  )

  return (
    <>
      <Header />
      <section className={'h-full flex items-center flex-col gap-4'}>
        <article className={'w-full'}>
          <figure className={'text-3xl font-black text-left'}>
            <div>어떤 방식으로</div>
            <div>N빵 치실 건가요?</div>
          </figure>

          <figure className={'text-base mt-4 text-right font-semibold'}>
            <div>
              다양한 방법으로 <span className={'font-bold'}>N빵</span>을 치실 수
              있습니다.
            </div>
            <div className={'mt-[-4px]'}>
              계산 이후에 카카오톡으로 친구들에게 공유해보세요!
            </div>
          </figure>
        </article>
        <article className={'grid grid-cols-2 md:grid-cols-3 gap-4'}>
          {OptionList.map((option, index) => (
            <OptionBox
              title={option.title}
              description={option.description}
              icon={option.icon}
              onClick={option.onClick}
            />
          ))}
        </article>
      </section>
    </>
  )
}

export default MainPage
