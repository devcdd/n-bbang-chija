import { create } from 'zustand'
import { Member } from '../types'
import { immer } from 'zustand/middleware/immer'

interface UsePersonListStoreType {
  memberList: Member[]
}

export const useMemberListStore = create<UsePersonListStoreType>()(
  immer((set) => ({
    memberList: [],
  })),
)

export const setMemberList = (memberList: Member[]) => {
  useMemberListStore.setState((state) => {
    state.memberList = memberList
    return state
  })
}
