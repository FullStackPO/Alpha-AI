import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hook/useChat'

const Dashboard = () => {
  
    const chat = useChat()

    const chatTitle = ["chat-title","chat-title","chat-title","chat-title","chat-title","chat-title"]

    const user = useSelector(state => state.auth.user)
    console.log(user)

    useEffect(() => { 
      chat.initializeSocketConnection()
    }, [])


    return (
        <main className="min-h-screen bg-[#0b0b0b] p-3 sm:p-5 text-white">
        <section
          className="
            flex min-h-[calc(100vh-24px)]
            gap-4
            rounded-3xl
            border border-zinc-700
            bg-[#111111]
            p-3
            shadow-2xl
            sm:min-h-[calc(100vh-40px)]
            sm:p-4
          "
        >
          {/* ================= SIDEBAR ================= */}
          <aside
            className="
              flex w-1/5 min-w-[180px] max-w-[260px]
              flex-col
              gap-6
              rounded-2xl
              border border-zinc-700
              bg-[#151515]
              p-4
              shadow-lg
            "
          >
            {/* Logo */}
            <div className="border-b border-zinc-700 pb-5">
              <h1
                className="
                  text-center
                  text-xl
                  font-semibold
                  tracking-wide
                  text-zinc-100
                "
              >
                Alpha <span className="text-zinc-400">AI</span>
              </h1>
            </div>

            {/* Chat Titles */}
            <div className="flex flex-col gap-3 overflow-y-auto">
              {chatTitle.map((chats, index) => (
                <button
                  key={index}
                  className="
                    group
                    w-full
                    rounded-xl
                    border border-zinc-700
                    bg-[#1b1b1b]
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-zinc-300
                    transition-all
                    duration-200
                    hover:border-zinc-400
                    hover:bg-[#242424]
                    hover:text-white
                    hover:shadow-md
                    active:scale-[0.98]
                  "
                >
                  <span className="block truncate">
                    {chats}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* ================= CHAT AREA ================= */}
          <div
            className="
              mx-auto
              flex
              w-4/5
              flex-col
              rounded-2xl
              border border-zinc-700
              bg-[#111111]
              p-4
              shadow-lg
            "
          >
            {/* Chat Header */}
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-medium text-zinc-200">
                New Chat
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                Ask Alpha AI anything
              </p>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-5">
              
              {/* User Message */}
              <div className="flex justify-end">
                <div
                  className="
                    max-w-[75%]
                    rounded-2xl
                    rounded-br-md
                    border border-zinc-700
                    bg-[#1d1d1d]
                    px-4
                    py-3
                    text-sm
                    text-zinc-200
                  "
                >
                  Hello Alpha AI 👋
                </div>
              </div>

              {/* AI Message */}
              <div className="flex justify-start">
                <div
                  className="
                    max-w-[80%]
                    rounded-2xl
                    rounded-bl-md
                    border border-zinc-800
                    bg-[#171717]
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-zinc-300
                  "
                >
                  Hello! 👋 How can I help you today?
                </div>
              </div>

            </div>

            {/* Input */}
            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border border-zinc-700
                bg-[#151515]
                p-2
                transition
                focus-within:border-zinc-400
              "
            >
              <input
                type="text"
                placeholder="Ask something..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-3
                  py-2
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-zinc-600
                "
              />

              <button
                className="
                  rounded-lg
                  bg-white
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-black
                  transition
                  hover:bg-zinc-200
                  active:scale-95
                "
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>
    )
}

export default Dashboard
