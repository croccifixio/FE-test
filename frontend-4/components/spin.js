import { useEffect, useState } from 'react'
import { compose } from 'recompose'

const Spin = ({ play, points }) => (
  <button className="spin" onClick={play} disabled={points <= 0}>
    <span>Spin</span>
  </button>
)

export default compose()(Spin)
