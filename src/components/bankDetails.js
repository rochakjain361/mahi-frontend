import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { IconButton, Snackbar } from '@material-ui/core'

import CopyIcon from '../icons/copyIcon'

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem'
  },
  account_info: {
    marginTop: '1rem',
    display: 'flex',
    '& > *': {
      width: '50%'
    }
  },
  header: {
    fontSize: '1.25em',
    marginTop: '0.75em',
    fontWeight: 500
  },
  title: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  info: {
    fontSize: '0.875rem',
    fontWeight: 500
  },
  divider: {
    marginTop: '1em',
    display: 'flex',
    alignItems: 'center'
  },
  separator: {
    width: '100%',
    height: 0,
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  dividerContent: {
    padding: '0.5rem',
    fontSize: '0.875rem'
  },
  upi: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center'
  }
})

export default function BankDetails () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    setOpen(true)
    document.body.removeChild(el)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <React.Fragment>
      <Typography className={classes.header}>
        Bank Details
      </Typography>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color='textSecondary'>
            Account name
          </Typography>
          <Typography variant='body2' className={classes.info} component='p'>
            Venkatesh Prabhu - Milaap
          </Typography>
          <div className={classes.account_info}>
            <div>
              <Typography className={classes.title} color='textSecondary'>
                IFSC code:
              </Typography>
              <Typography
                variant='body2'
                className={classes.info}
                component='p'
              >
                RATN0VAAPIS
              </Typography>
            </div>
            <div>
              <Typography className={classes.title} color='textSecondary'>
                Account number
              </Typography>
              <Typography
                variant='body2'
                className={classes.info}
                component='p'
              >
                2222333300008888
              </Typography>
            </div>
          </div>
          <div className={classes.divider}>
            <div className={classes.separator} />
            <span className={classes.dividerContent}>or</span>
            <div className={classes.separator} />
          </div>
          <div className={classes.upi}>
            <div>
              <Typography className={classes.title} color='textSecondary'>
                UPI ID:
              </Typography>
              <Typography
                id='upi_id'
                variant='body2'
                className={classes.info}
                component='p'
              >
                givetomlp.venkateshprabhu1@icici
              </Typography>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <IconButton
                onClick={() =>
                  copyToClipboard('givetomlp.venkateshprabhu1@icici')
                }
              >
                <CopyIcon />
              </IconButton>
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              open={open}
              autoHideDuration={1500}
              onClose={handleClose}
              message='UPI id copied to clipboard'
            />
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
