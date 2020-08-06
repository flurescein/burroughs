import { NextPage } from 'next'
import { useEffect } from 'react'

import { fetchTextsFx } from '../stores/texts'

import MainLayout from '../components/MainLayout'
import Header from '../components/Header'
import Logo from '../components/Logo'

interface MultitextProps {}

const Multitext: NextPage = () => {
  useEffect(() => {
    fetchTextsFx()
  }, [])

  return (
    <MainLayout>
      <Header>
        <Logo />
      </Header>
    </MainLayout>
  )
}

export default Multitext
