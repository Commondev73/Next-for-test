import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import styles from './Loading.module.scss'

const Loading = (props) => {
  if (props.show) {
    return (
      <>
        <div className={styles.loading}>
          <SyncLoader color="white" loading={true} size={15} />
        </div>
      </>
    )
  }
  return null
}

export default Loading
