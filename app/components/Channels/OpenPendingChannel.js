import { shell } from 'electron'
import React from 'react'
import PropTypes from 'prop-types'
import { btc } from 'utils'
import styles from './OpenPendingChannel.scss'

const OpenPendingChannel = ({ ticker, channel, currentTicker, explorerLinkBase }) => (
  <li className={styles.channel} onClick={() => shell.openExternal(`${explorerLinkBase}/tx/${channel.channel.channel_point.split(':')[0]}`)}>
    <div className={styles.pending}>
      <h1>Opening Channel...</h1>
      <span>Blocks till open: {channel.blocks_till_open}</span>
    </div>
    <div className={styles.left}>
      <section className={styles.remotePubkey}>
        <span>Remote Pubkey</span>
        <h4>{channel.channel.remote_node_pub}</h4>
      </section>
      <section className={styles.channelPoint}>
        <span>Channel Point</span>
        <h4>{channel.channel.channel_point}</h4>
      </section>
    </div>
    <div className={styles.right}>
      <section className={styles.capacity}>
        <span>Capacity</span>
        <h2>
          {
            ticker.currency === 'btc' ?
              btc.satoshisToBtc(channel.channel.capacity)
              :
              btc.satoshisToUsd(channel.channel.capacity, currentTicker.price_usd)
          }
        </h2>
      </section>
      <div className={styles.balances}>
        <section>
          <h4>
            {
              ticker.currency === 'btc' ?
                btc.satoshisToBtc(channel.channel.local_balance)
                :
                btc.satoshisToUsd(channel.channel.local_balance, currentTicker.price_usd)
            }
          </h4>
          <span>Local</span>
        </section>
        <section>
          <h4>
            {
              ticker.currency === 'btc' ?
                btc.satoshisToBtc(channel.channel.remote_balance)
                :
                btc.satoshisToUsd(channel.channel.remote_balance, currentTicker.price_usd)
            }
          </h4>
          <span>Remote</span>
        </section>
      </div>
    </div>
  </li>
)

OpenPendingChannel.propTypes = {
  ticker: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  currentTicker: PropTypes.object.isRequired,
  explorerLinkBase: PropTypes.string.isRequired
}

export default OpenPendingChannel
