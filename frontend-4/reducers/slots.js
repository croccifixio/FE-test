import {
  PRIZE_CALCULATE,
  POINTS_DECREASE,
  POINTS_INCREASE,
  SPIN,
  WINNING_PAYLINE_RESET,
} from '../constants/actionTypes'

import { all, any, aperture, equals, propEq } from 'ramda'

const hasNMatches = (n) => (count, slots, symbol) => count === n && any(
  all(equals(symbol)),
  aperture(n, slots)
)

const hasThreeMatches = hasNMatches(3)
const hasTwoMatches = hasNMatches(2)

export const initialState = {
  paylines: [
    { count: 3, prize: 50, symbol: "cherry" },
    { count: 2, prize: 40, symbol: "cherry" },
    { count: 3, prize: 20, symbol: "apple" },
    { count: 2, prize: 10, symbol: "apple" },
    { count: 3, prize: 15, symbol: "banana" },
    { count: 2, prize: 5, symbol: "banana" },
    { count: 3, prize: 3, symbol: "lemon" },
  ],
  points: 20,
  reels: [
    ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"],
    ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"],
    ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"],
  ],
  slots: Array(3),
  winningPayline: null,
}

export default (state = initialState, action) => {
  const { amount, type } = action

  switch (type) {
    case PRIZE_CALCULATE: {
      const potentialWinnings = state.paylines.map(({ count, prize, symbol }) =>
        hasThreeMatches(count, state.slots, symbol) || hasTwoMatches(count, state.slots, symbol)
          ? prize
          : 0
      )
      const maxPotentialWinnigs = Math.max(...potentialWinnings)
      const winningPayline = state.paylines.find(propEq('prize', maxPotentialWinnigs))

      return {
        ...state,
        winningPayline,
      }
    }

    case POINTS_DECREASE: {
      return {
        ...state,
        points: state.points - amount,
      }
    }

    case POINTS_INCREASE: {
      return {
        ...state,
        points: state.points + amount,
      }
    }

    case SPIN: {
      const slots = state.reels.map((reel) => {
        const randomReelIndex = Math.ceil(Math.random() * reel.length - 1)

        return reel[randomReelIndex]
      })

      return {
        ...state,
        slots,
      }
    }

    case WINNING_PAYLINE_RESET: {
      return {
        ...state,
        winningPayline: null,
      }
    }

    default: {
      return state
    }
  }
}
