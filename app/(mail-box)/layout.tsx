import AuthContext from '@/components/auth-context'
import Feature from '@/components/feature'
import Header from '@/components/header'
import LeftSideBar from '@/components/left-side-bar'
import React from 'react'

interface MailBoxGroupLayoutProps {
    children: React.ReactNode
}
const MailBoxGroupLayout = ({ children }: MailBoxGroupLayoutProps) => {
    return (
        <AuthContext>
            <div className="flex flex-col gap-1 overflow-x-hidden min-h-screen">
                <Header></Header>
                <div className="flex bg-white  flex-1 mb-2">
                    <div className="flex flex-col  items-center w-14 p-2 gap-y-4 bg-white shadow-md">
                        <LeftSideBar></LeftSideBar>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 px-2 min-h-[570px]">
                        <div className="h-11 rounded-md p-1 flex gap-2">
                            {/* Tool */}
                        </div>
                        <div className="flex items-center bg-slate-300 shadow-md rounded-md px-2 py-4 h-12 ">
                            <Feature></Feature>
                        </div>
                        <div className="flex flex-1 ">
                            <div className="w-2/12 hidden lg:block p-2 rounded-md">
                                {/* Sidebar custom */}
                            </div>
                            <div className="w-10/12 bg-white">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthContext>
    )
}

export default MailBoxGroupLayout
