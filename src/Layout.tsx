import React from 'react'
import MoneyManagementImage from '/Money-Management.png'
import { mobileWebView, viewContainer } from './styles/layout.css.ts'
import { backgroundImage } from './styles/component.css.ts'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <section className={'w-screen h-screen flex justify-center p-4'}>
      <section className={'w-[767px] relative'}>{props.children}</section>
    </section>
  )
}

export default Layout
