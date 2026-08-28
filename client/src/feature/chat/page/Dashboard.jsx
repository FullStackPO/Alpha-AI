
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hook/useChat'
import remarkGfm from 'remark-gfm'

const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = async (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    setIsLoading(true)

    await chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId
    })

    setChatInput('')
    setIsLoading(false)
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
  }

  console.log("currentChatId:", currentChatId)
  console.log("chats:", chats)
  console.log("current chat:", chats[currentChatId])
  console.log("messages:", chats[currentChatId]?.messages)

  return (
    <main className='min-h-screen w-full bg-[#05070c] p-3 text-white md:p-5'>

      <section className='mx-auto flex h-[calc(100vh-1.5rem)] w-full max-w-[1500px] gap-4 overflow-hidden rounded-[28px] border border-white/10 bg-[#080b12] p-2 shadow-2xl shadow-black/40 md:h-[calc(100vh-2.5rem)] md:gap-5'>

        {/* Sidebar */}
        <aside className='hidden h-full w-72 shrink-0 rounded-[22px] border border-white/[0.07] bg-[#0a0d14] p-4 md:flex md:flex-col'>

          {/* Logo */}
          <div className='mb-7 flex items-center gap-3 px-2'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-black shadow-lg shadow-white/5'>
              A
            </div>

            <div>
              <h1 className='text-xl font-semibold tracking-tight text-white'>
                Alpha AI
              </h1>

              <p className='text-xs text-white/35'>
                AI Assistant
              </p>
            </div>
          </div>

          {/* Chat Heading */}
          <div className='mb-3 flex items-center justify-between px-2'>
            <p className='text-xs font-medium uppercase tracking-wider text-white/30'>
              Recent Chats
            </p>

            <span className='rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/40'>
              {Object.values(chats).length}
            </span>
          </div>

          {/* Chats */}
          <div className='custom-scrollbar flex-1 space-y-1.5 overflow-y-auto pr-1'>

            {Object.values(chats).map((chat, index) => (
              <button
                onClick={() => { openChat(chat.id) }}
                key={index}
                type='button'
                className={`group w-full cursor-pointer rounded-xl px-3 py-3 text-left text-sm transition duration-200 ${
                  currentChatId === chat.id
                    ? 'border border-white/10 bg-white/[0.09] text-white shadow-sm'
                    : 'border border-transparent text-white/50 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-white/80'
                }`}
              >

                <div className='flex items-center gap-3'>

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                      currentChatId === chat.id
                        ? 'bg-white text-black'
                        : 'bg-white/[0.06] text-white/40 group-hover:bg-white/10'
                    }`}
                  >
                    {chat.title?.charAt(0)?.toUpperCase() || 'C'}
                  </div>

                  <span className='truncate font-medium'>
                    {chat.title}
                  </span>

                </div>

              </button>
            ))}

          </div>

        </aside>

        {/* Main Chat */}
        <section className='relative mx-auto flex h-full w-full max-w-4xl min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#070a10]'>

          {/* Header */}
          <header className='flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-5 md:px-7'>

            <div>

              <h2 className='text-sm font-semibold text-white/90 md:text-base'>
                {chats[currentChatId]?.title || 'New Conversation'}
              </h2>

              <div className='mt-0.5 flex items-center gap-1.5'>
                <span className='h-1.5 w-1.5 rounded-full bg-emerald-400'></span>

                <span className='text-[11px] text-white/30'>
                  Online
                </span>
              </div>

            </div>

            <button
              type='button'
              className='flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-white/40 transition hover:bg-white/[0.05] hover:text-white'
            >
              ⋮
            </button>

          </header>

          {/* Messages */}
          <div className='messages custom-scrollbar flex-1 space-y-5 overflow-y-auto px-4 pb-36 pt-6 md:px-8'>

            {chats[currentChatId]?.messages.map((message) => (

              <div
                key={message.id}
                className={`flex w-full ${
                  message.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >

                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 md:max-w-[78%] md:text-[15px] ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-white text-black shadow-lg shadow-black/10'
                      : 'rounded-bl-md bg-transparent text-white/75'
                  }`}
                >

                  {message.role === 'user' ? (

                    <p>
                      {message.content}
                    </p>

                  ) : (

                    <ReactMarkdown
                      components={{

                        p: ({ children }) => (
                          <p className='mb-3 last:mb-0'>
                            {children}
                          </p>
                        ),

                        ul: ({ children }) => (
                          <ul className='mb-3 list-disc space-y-1 pl-5'>
                            {children}
                          </ul>
                        ),

                        ol: ({ children }) => (
                          <ol className='mb-3 list-decimal space-y-1 pl-5'>
                            {children}
                          </ol>
                        ),

                        li: ({ children }) => (
                          <li className='text-white/70'>
                            {children}
                          </li>
                        ),

                        h1: ({ children }) => (
                          <h1 className='mb-3 mt-4 text-xl font-semibold text-white'>
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2 className='mb-3 mt-4 text-lg font-semibold text-white'>
                            {children}
                          </h2>
                        ),

                        h3: ({ children }) => (
                          <h3 className='mb-2 mt-3 font-semibold text-white'>
                            {children}
                          </h3>
                        ),

                        strong: ({ children }) => (
                          <strong className='font-semibold text-white'>
                            {children}
                          </strong>
                        ),

                        code: ({ children }) => (
                          <code className='rounded-md border border-white/10 bg-white/[0.07] px-1.5 py-0.5 font-mono text-[13px] text-white/80'>
                            {children}
                          </code>
                        ),

                        pre: ({ children }) => (
                          <pre className='my-3 overflow-x-auto rounded-xl border border-white/[0.07] bg-black/40 p-4 text-[13px] leading-6'>
                            {children}
                          </pre>
                        ),

                        blockquote: ({ children }) => (
                          <blockquote className='my-3 border-l-2 border-white/20 pl-4 text-white/50'>
                            {children}
                          </blockquote>
                        )

                      }}
                      remarkPlugins={[remarkGfm]}
                    >
                      {message.content}
                    </ReactMarkdown>

                  )}

                </div>

              </div>

            ))}

            {/* Loading Indicator */}
            {isLoading && (

              <div className='flex w-full justify-start'>

                <div className='flex items-center gap-3 rounded-2xl rounded-bl-md px-4 py-3'>

                  <div className='flex items-center gap-1'>

                    <span className='h-2 w-2 animate-bounce rounded-full bg-white/40 [animation-delay:-0.3s]' />

                    <span className='h-2 w-2 animate-bounce rounded-full bg-white/40 [animation-delay:-0.15s]' />

                    <span className='h-2 w-2 animate-bounce rounded-full bg-white/40' />

                  </div>

                  <span className='text-xs text-white/30'>
                    Alpha AI is thinking...
                  </span>

                </div>

              </div>

            )}

          </div>

          {/* Input */}
          <footer className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#070a10] via-[#070a10] to-transparent px-3 pb-3 pt-8 md:px-6 md:pb-5'>

            <form
              onSubmit={handleSubmitMessage}
              className='mx-auto flex w-full max-w-3xl items-end gap-2 rounded-2xl border border-white/[0.10] bg-[#0c1018] p-2 shadow-2xl shadow-black/30 transition focus-within:border-white/20'
            >

              <input
                type='text'
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder='Message Alpha AI...'
                disabled={isLoading}
                className='min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/25 disabled:cursor-not-allowed md:text-[15px]'
              />

              <button
                type='submit'
                disabled={!chatInput.trim() || isLoading}
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black transition duration-200 hover:scale-[1.03] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:scale-100'
              >

                {isLoading ? (

                  <svg
                    className='h-4 w-4 animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />

                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                    />

                  </svg>

                ) : (

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='h-4 w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5 12h14M13 6l6 6-6 6'
                    />
                  </svg>

                )}

              </button>

            </form>

            <p className='mt-2 text-center text-[10px] text-white/20'>
              Alpha AI can make mistakes. Check important information.
            </p>

          </footer>

        </section>

      </section>

      {/* Custom Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>

    </main>
  )
}

export default Dashboard

