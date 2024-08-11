import React, { useEffect, useMemo, useState } from 'react'
import Button from '../components/common/button/Button.tsx'
import Header from '../assets/icons/components/header/Header.tsx'
import { SuccessMessage, WarningMessage } from '../lib/util/utils.ts'
import { PaymentStatus } from '../constant'
import Input from '../components/common/input/Input.tsx'
import { useMemberListStore } from '../store/useMemberListStore.ts'
import {
  setPaymentDetail,
  setPaymentList,
  usePaymentListStore,
} from '../store/usePaymentListStore.ts'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePayment } from '../hooks/usePayment.ts'
import MoneyKeypad from '../components/common/moneyKeypad/MoneyKeypad.tsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog.tsx'

interface FairPayProps {}

const FairPay = (props: FairPayProps) => {
  const paymentList = usePaymentListStore((state) => state.paymentList)
  const memberList = useMemberListStore((state) => state.memberList)

  const [searchParams] = useSearchParams()
  const meetingIndex = useMemo<number>(() => {
    return Number(searchParams.get('meeting')) - 1
  }, [searchParams])
  const navigate = useNavigate()

  const { addPayment } = usePayment(meetingIndex)

  const [money, setMoney] = useState('')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    PaymentStatus.MEETING_INFO_INPUT,
  )

  const handleMemberStatus = (memberName: string) => {
    const isMemberToPay =
      paymentList[meetingIndex]?.memberListToPay.includes(memberName)

    if (isMemberToPay) {
      setPaymentDetail(
        {
          ...paymentList[meetingIndex],
          memberListToPay: paymentList[meetingIndex].memberListToPay.filter(
            (member) => member !== memberName,
          ),
          memberListToNotPay: [
            ...paymentList[meetingIndex].memberListToNotPay,
            memberName,
          ],
        },
        meetingIndex,
      )
    }

    if (!isMemberToPay) {
      setPaymentDetail(
        {
          ...paymentList[meetingIndex],
          memberListToNotPay: paymentList[
            meetingIndex
          ].memberListToNotPay.filter((member) => member !== memberName),
          memberListToPay: [
            ...paymentList[meetingIndex].memberListToPay,
            memberName,
          ],
        },
        meetingIndex,
      )
    }
  }

  const formatMoney = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '')
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  useEffect(() => {
    console.log(
      '%cFairPay.tsx:64 - %cpaymentList = ',
      'color:yellow;',
      'color:lightgreen; font-weight:bold',
      paymentList,
    )
  }, [paymentList])

  return (
    <main className={'h-full'}>
      <Header />
      {paymentStatus === PaymentStatus.MEETING_INFO_INPUT && (
        <>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-6">
              어떤 모임이었나요?
            </div>
            <Input
              className="mt-4 h-12 w-3/4 mx-auto rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 삼겹살 집"
              value={paymentList[meetingIndex]?.title}
              onChange={(e) => {
                setPaymentDetail(
                  {
                    ...paymentList[meetingIndex],
                    title: e.target.value,
                  },
                  meetingIndex,
                )
              }}
            />
          </div>

          <div className="text-center mt-10">
            <div className="text-3xl font-semibold text-gray-700 mb-4">
              정산에 제외시킬 멤버를 터치해주세요!
            </div>
            <div>
              <div className="text-lg font-medium text-gray-600 mb-2">
                정산 참여 멤버
              </div>
              <div className="w-full flex flex-wrap gap-4 justify-center">
                {paymentList[meetingIndex]?.memberListToPay.map(
                  (member, index) => (
                    <Button
                      key={index}
                      className="mt-2 px-4 py-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-all"
                      onClick={() => handleMemberStatus(member)}
                    >
                      {member}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <div className="text-3xl font-semibold text-gray-700 mb-4">
              정산에 참여시킬 멤버를 터치해주세요!
            </div>
            <div>
              <div className="text-lg font-medium text-gray-600 mb-2">
                정산 미참여 멤버
              </div>
              <div className="w-full flex flex-wrap gap-4 justify-center">
                {paymentList[meetingIndex]?.memberListToNotPay.map(
                  (member, index) => (
                    <Button
                      key={index}
                      className="mt-2 px-4 py-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-all"
                      onClick={() => handleMemberStatus(member)}
                    >
                      {member}
                    </Button>
                  ),
                )}
              </div>
            </div>

            <Button
              className={'mt-10 w-full'}
              onClick={() => setPaymentStatus(PaymentStatus.AMOUNT_INPUT)}
            >
              정산 금액 입력하러 가기
            </Button>
          </div>
        </>
      )}
      {paymentStatus === PaymentStatus.AMOUNT_INPUT && (
        <>
          <div className={'text-center text-4xl font-semibold'}>
            <div>가격을 입력해주세요 !</div>
          </div>
          <div className={'text-4xl font-black text-center mt-4 select-none'}>
            {paymentList[meetingIndex].amount}원
          </div>
          <MoneyKeypad />
          <Button
            className={'w-full mt-8'}
            onClick={() => setPaymentStatus(PaymentStatus.MEETING_INFO_INPUT)}
          >
            제외시킬 멤버 다시 고르러 가기
          </Button>
          <section className={'flex gap-2 mt-2'}>
            <Button
              className={'w-full'}
              onClick={() => {
                setPaymentStatus(PaymentStatus.MEETING_INFO_INPUT)
                navigate(`/fair-pay?meeting=${meetingIndex + 2}`)
              }}
            >
              정산할 자리가 더 있어요
            </Button>
            <AlertDialog>
              <AlertDialogTrigger className={'w-full'}>
                <Button className={'w-full'}>입력을 완전히 끝냈어요</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>
                  정산 정보 입력이 완전히 끝나셨나요?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div>
                    <div>입력한 정보는 수정이 불가능합니다.</div>
                    <div>정말로 입력을 완료하시겠습니까?</div>
                  </div>
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction>정산 완료</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
        </>
      )}
    </main>
  )
}

export default FairPay
