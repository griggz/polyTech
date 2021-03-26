import React from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand'
import TextInfoContent from '@mui-treasury/components/content/textInfo'
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03'
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 343,
    borderRadius: 20
  },
  content: {
    padding: 24
  }
}))

const ReportCard = ({ content, heading, overline }) => {
  const styles = useN03TextInfoContentStyles()
  const shadowStyles = useLightTopShadowStyles()
  const cardStyles = useStyles()
  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <BrandCardHeader
        image='https://pngimage.net/wp-content/uploads/2018/06/react-icon-png-7.png'
        extra='7 minutes'
      />
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={styles}
          overline={overline}
          heading={heading}
          body={content}
        />
      </CardContent>
    </Card>
  )
}

export default ReportCard
