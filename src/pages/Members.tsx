import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../assets/icons/components/header/Header.tsx'
import Input from '../components/common/input/Input.tsx'
import Button from '../components/common/button/Button.tsx'
import { useLocalStorage } from 'usehooks-ts'
import {
  setMemberList,
  useMemberListStore,
} from '../store/useMemberListStore.ts'
import { Member } from '../types'
import { message } from 'antd'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog.tsx'

interface MembersProps {}

const Members = (props: MembersProps) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [memberInput, setMemberInput] = useState(null)
  const memberInputRef = useRef(null)
  const memberList = useMemberListStore((state) => state.memberList)

  const [submitDialog, setSubmitDialog] = useState(false)

  const [localStoragePersonList, setLocalStoragePersonList] = useLocalStorage(
    'personList',
    [],
  )

  const handleMemberInputChange = () => {}

  const handleAddMember = () => {
    if (!memberInput) {
      message.info({
        content: `이름을 입력하지 않아 '유저${memberList.length + 1}'로 추가됩니다.`,
      })
      setMemberList([
        ...memberList,
        { name: `유저${memberList.length + 1}`, money: 0 },
      ])
      memberInputRef.current?.focus()
      return
    }

    if (memberList.find((member) => member.name === memberInput)) {
      message.error({
        content: `"${memberInput}" 님은 이미 추가되어 있습니다, 다른 이름을 입력해주세요.`,
      })
      return
    }

    setMemberList([
      ...memberList,
      {
        name: memberInput,
        money: 0,
      },
    ])
    setMemberInput('')
    memberInputRef.current?.focus()

    message.info({
      content: `"${memberInput}" 님이 추가되었습니다.`,
    })
  }

  const handleResetMember = () => {
    setMemberList([])
  }

  const handleDeleteMember = (deleteMember: Member) => {
    setMemberList(memberList.filter((member) => member !== deleteMember))
    message.success({
      content: `"${deleteMember.name}" 님이 삭제되었습니다.`,
    })
  }

  useEffect(() => {
    console.log(
      '%cMembers.tsx:81 - %cmemberList = ',
      'color:yellow;',
      'color:lightgreen; font-weight:bold',
      memberList,
    )
  }, [memberList])

  return (
    <main>
      <Header />
      <section className={'text-center'}>
        <div className={'text-4xl font-semibold'}>
          <div>멤버들의 이름을</div>
          <div>작성해주세요 !</div>
        </div>
        <div className={'text-sm mt-2'}>
          귀찮으시면 그냥 추가하기 버튼을 누르셔도 돼요
        </div>
      </section>
      <div
        className={
          'bg-black bg-opacity-90 p-4 rounded-md mt-4 text-white text-center'
        }
      >
        <div>이름을 작성하시고, 추가하기 버튼을 누르면 이름이 추가됩니다.</div>
        <div>이름을 입력하지 않고 추가하기 버튼을 누르면,</div>
        <div>임의의 이름(유저1, 유저2)이 입력됩니다.</div>
        <div className={'text-yellow-400 font-semibold'}>
          오늘 자리에 참석한 모든 인원을 반영해주세요.
        </div>
        <figure className={'flex gap-4 items-center mt-4'}>
          <div>친구 이름</div>
          <Input
            ref={memberInputRef}
            className={'flex-1 bg-white text-black'}
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            placeholder={'이름을 입력해주세요'}
            onEnterPress={() =>
              handleAddMember({
                name: memberInput,
                money: 0,
              })
            }
          />
        </figure>
        <div className={'flex justify-end gap-2'}>
          <div className={'flex gap-2'}>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  className={
                    'mt-4 ml-auto bg-white text-black hover:text-white'
                  }
                  onClick={handleResetMember}
                >
                  초기화
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    멤버 목록을 초기화 하시겠습니까?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    초기화 하시면 등록된 모든 멤버가 삭제됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetMember}>
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              className={'mt-4 ml-auto bg-white text-black hover:text-white'}
              onClick={handleAddMember}
            >
              추가하기
            </Button>
          </div>
        </div>
      </div>
      <section className={'mt-4 select-none'}>
        <div className={'font-bold'}>등록된 멤버들 이름</div>
        <div className={'text-sm'}>
          잘못 입력하셨다면 입력한 이름을 터치(클릭)하세요 !
        </div>
        <article className={'flex flex-wrap gap-4 mt-4'}>
          {memberList.length === 0 && (
            <div className={'text-sm text-red-500 font-semibold'}>
              멤버를 추가해주세요 !
            </div>
          )}
          {memberList?.map((member, index) => {
            return (
              <div
                key={index}
                className={
                  'border-2 border-black text-black bg-opacity-90 px-4 py-1 rounded-xl text-center cursor-pointer font-semibold'
                }
                onClick={() => handleDeleteMember(member)}
              >
                {member.name}
              </div>
            )
          })}
        </article>
      </section>

      <Button
        className={'mt-4 ml-auto w-full'}
        onClick={() => {
          if (memberList.length < 1) {
            message.error({
              content: '멤버를 추가해주세요.',
            })
            return
          }
          setSubmitDialog(true)
        }}
      >
        다음으로 넘어갈래요 !
      </Button>

      <AlertDialog
        open={submitDialog}
        onOpenChange={(open) => setSubmitDialog(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              참여한 멤버들을 모두 작성하셨나요?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div>
                {memberList.map((member, index) => {
                  return (
                    <span key={index} className={'font-bold'}>
                      {member.name}
                      {index !== memberList.length - 1 && ','}
                    </span>
                  )
                })}
                님이 모임에 참여하셨습니다.
              </div>
              <div>다음으로 넘어가고 싶다면 계속을 눌러주세요.</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                navigate(`/${searchParams.get('type')}`)
              }}
            >
              계속
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}

export default Members
