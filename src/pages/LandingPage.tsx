import React from 'react'
import Button from '../components/common/button/Button.tsx'
import { useNavigate } from 'react-router-dom'
import MoneyHandIcon from '../assets/icons/components/icon/MoneyHandIcon.tsx'
import { SuccessMessage } from '../lib/util/utils.ts'

interface LandingPageProps {}

const LandingPage = (props: LandingPageProps) => {
  const navigate = useNavigate()

  return (
    <section className={'w-full h-full'}>
      <header className={'font-[1000] select-none'}>
        <div className={'text-8xl'}>N</div>
        <div className={'text-8xl'}>BBANG</div>
        <figure className={'flex gap-1'}>
          <MoneyHandIcon className={'w-20 fill-black rotate-12'} />
          <span className={'text-8xl'}>CHIJA</span>
        </figure>
      </header>

      <article className={'text-right mt-4 text-black font-semibold'}>
        <div>오늘 하루는 어떠셨나요?</div>
        <div>기분 좋고 보람 찬 시간이었기를 빌겠습니다.</div>
      </article>

      <article className={'text-left mt-8 text-black font-semibold'}>
        <div>참 ! 식사, 술자리 이후 정산, 머리 아프시죠?</div>
        <div>다양하고, 기발한 방법으로 기분 좋은 정산을 도와드리겠습니다.</div>
      </article>

      <article
        className={
          'text-left mt-8 text-black font-semibold bg-black bg-opacity-90 rounded-md p-4 h-[200px] flex justify-center items-center hover:scale-105 transition-transform ease-in-out cursor-pointer '
        }
        onClick={() => {
          SuccessMessage('공감해주셔서 감사합니다 ㅠ')
        }}
      >
        <figure className={'text-center text-white'}>
          <div>본 프로그램, "N빵치자"는 언제나 술자리 등에서 항상</div>
          <div>
            강제 총무가 되어 열심히 정산 후, 돈을 받아내는 운명이 되어버린
          </div>
          <div>개발자의 슬픈 사연이 담겨있습니다.</div>
        </figure>
      </article>

      <div className={'mt-4 text-center text-xs'}>Made by CDD</div>

      <div className={'flex justify-center mt-12'}>
        <Button
          className={'w-full'}
          onClick={() => {
            navigate('/main')
          }}
        >
          시작하기
        </Button>
      </div>
    </section>
  )
}

export default LandingPage
