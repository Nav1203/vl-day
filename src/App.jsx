import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaHeart, FaArrowDown } from 'react-icons/fa'
import './App.css'

function App() {
  const [page, setPage] = useState('question') // 'question', 'valentine', 'main'
  const [hearts, setHearts] = useState([])
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [noButtonMoved, setNoButtonMoved] = useState(false)
  const [showCupid, setShowCupid] = useState(false)

  // Reset no button state when switching to valentine page
  useEffect(() => {
    if (page === 'valentine') {
      setNoButtonMoved(false)
      // Don't set position initially - button stays in normal flow
      setNoButtonPosition({ x: 0, y: 0 })
      setShowCupid(false)
    }
    if (page === 'main') {
      setShowCupid(false)
    }
  }, [page])

  useEffect(() => {
    if (page === 'main') {
      const interval = setInterval(() => {
        setHearts((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            delay: Math.random() * 2,
          },
        ])
      }, 300)

      return () => clearInterval(interval)
    }
  }, [page])

  const moveNoButton = (e) => {
    e.preventDefault()
    setNoButtonMoved(true)
    
    const buttonWidth = 200
    const buttonHeight = 60
    const padding = 20
    
    // Calculate bounds within the viewport
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Calculate maximum positions to keep button on screen
    const maxX = viewportWidth - buttonWidth - padding
    const maxY = viewportHeight - buttonHeight - padding
    const minX = padding
    const minY = padding
    
    // Generate random position within bounds
    const newX = Math.random() * (maxX - minX) + minX
    const newY = Math.random() * (maxY - minY) + minY
    
    setNoButtonPosition({
      x: newX,
      y: newY,
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const pageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 }
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {page === 'question' && (
          <motion.div
            key="question"
            className="question-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="question-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h1
                className="question-text"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Hey, I have something to ask to you...
              </motion.h1>
              <motion.button
                className="ask-button"
                onClick={() => setPage('valentine')}
                whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(255, 20, 147, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 5px 15px rgba(255, 20, 147, 0.3)',
                    '0 10px 30px rgba(255, 20, 147, 0.5)',
                    '0 5px 15px rgba(255, 20, 147, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Ask!
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {page === 'valentine' && (
          <motion.div
            key="valentine"
            className="valentine-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="valentine-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h1
                className="valentine-question"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Will you be my valentine Nayandhika?
              </motion.h1>
              <div className="valentine-buttons">
                <motion.button
                  className="yes-button"
                  onClick={() => {
                    setShowCupid(true)
                    setTimeout(() => {
                      setPage('main')
                    }, 3000) // Show animation for 3 seconds
                  }}
                  whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(76, 175, 80, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes
                </motion.button>
                <motion.button
                  className="yes-button yes-of-course"
                  onClick={() => {
                    setShowCupid(true)
                    setTimeout(() => {
                      setPage('main')
                    }, 3000) // Show animation for 3 seconds
                  }}
                  whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(76, 175, 80, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes of course
                </motion.button>
                <motion.button
                  className={`no-button ${noButtonMoved ? 'no-button-moved' : ''}`}
                  onClick={moveNoButton}
                  initial={false}
                  animate={
                    noButtonMoved
                      ? {
                          x: noButtonPosition.x,
                          y: noButtonPosition.y,
                        }
                      : {}
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Cupid Animation Overlay */}
        {showCupid && (
          <motion.div
            className="cupid-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowCupid(false)
              setPage('main')
            }}
          >
            <motion.div
              className="cupid-container"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [0, 10, -10, 0],
                y: [0, -20, 0]
              }}
              transition={{
                scale: { duration: 0.6, ease: "easeOut" },
                rotate: { duration: 0.8, ease: "easeInOut" },
                y: { 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <div className="cupid">💘</div>
              <motion.h2
                className="love-you-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Love you Nayans! 💕 The No button was anyways disabled!
              </motion.h2>
            </motion.div>
          </motion.div>
        )}

        {page === 'main' && (
          <motion.div
            key="main"
            className="main-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {/* Floating Hearts Background */}
            <div className="hearts-container">
              {hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="floating-heart"
                  initial={{ 
                    x: `${heart.x}%`, 
                    y: '100%', 
                    opacity: 0.7,
                    scale: 0.5 
                  }}
                  animate={{ 
                    y: '-20%', 
                    opacity: 0,
                    scale: 1.5,
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4,
                    delay: heart.delay,
                    ease: 'easeOut'
                  }}
                >
                  <FaHeart />
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <motion.div
              className="container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
        <motion.div variants={itemVariants} className="title-section">
          <motion.h1
            className="main-title"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Happy Valentine's Day Kyutie!
          </motion.h1>
          <motion.div
            className="heart-icon"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <FaHeart />
          </motion.div>
        </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
