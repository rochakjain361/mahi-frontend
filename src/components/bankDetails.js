import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { IconButton, Snackbar } from '@material-ui/core'

import CopyIcon from '../icons/copyIcon'
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem'
  },
  rootDesktop: {
    width: '100%',
    marginTop: '0',
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
  hiddenDiv: {
    display: 'none'
  },
  header: {
    fontSize: '1.25em',
    marginTop: '0.75em',
    fontWeight: 500,
    textAlign: 'center'
  },
  title: {
    fontSize: '0.875rem',
    fontWeight: 500
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
  },
  detContainer: {
    width: '100%'
  }
})

export default function BankDetails (cause) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const activeCause = useSelector(state => state.causes.activeCause)
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
      {isMobile ? (
        <div className={classes.detContainer}>
          <Typography className={classes.header}>Bank Details</Typography>
      <Card className={classes.root}>
        <CardContent>
          <div
            className={
              activeCause && activeCause.id && activeCause.bank_name
                ? ''
                : classes.hiddenDiv
            }
          >
            <Typography className={classes.title} color='textSecondary'>
              Account name
            </Typography>
            <Typography variant='body2' className={classes.info} component='p'>
              {activeCause && activeCause.id ? activeCause.bank_name : ''}
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
                  {activeCause && activeCause.id
                    ? activeCause.bank_ifsc_code
                    : ''}
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
                  {activeCause && activeCause.id
                    ? activeCause.bank_account_no
                    : ''}
                </Typography>
              </div>
            </div>
          </div>
          <div
            className={
              activeCause &&
              activeCause.id &&
              activeCause.bank_name &&
              activeCause.bank_upi_id
                ? ''
                : classes.hiddenDiv
            }
          >
            <div className={classes.divider}>
              <div className={classes.separator} />
              <span className={classes.dividerContent}>or</span>
              <div className={classes.separator} />
            </div>
          </div>
          <div
            className={
              activeCause && activeCause.id && activeCause.bank_upi_id
                ? ''
                : classes.hiddenDiv
            }
          >
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
                  {activeCause && activeCause.id ? activeCause.bank_upi_id : ''}
                </Typography>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <IconButton
                  onClick={() =>
                    copyToClipboard(activeCause && activeCause.id ? activeCause.bank_upi_id : '')
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
          </div>
        </CardContent>
      </Card>
    
        </div>
      ) : (<Card className={classes.rootDesktop}>
        <Typography className={classes.header}>Bank Details</Typography>
          <CardContent>
            <div
              className={
                activeCause && activeCause.id && activeCause.bank_name
                  ? ''
                  : classes.hiddenDiv
              }
            >
              <Typography className={classes.title} color='textSecondary'>
                Account name
              </Typography>
              <Typography variant='body2' className={classes.info} component='p'>
                {activeCause && activeCause.id ? activeCause.bank_name : ''}
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
                    {activeCause && activeCause.id
                      ? activeCause.bank_ifsc_code
                      : ''}
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
                    {activeCause && activeCause.id
                      ? activeCause.bank_account_no
                      : ''}
                  </Typography>
                </div>
              </div>
            </div>
            <div
              className={
                activeCause &&
                activeCause.id &&
                activeCause.bank_name &&
                activeCause.bank_upi_id
                  ? ''
                  : classes.hiddenDiv
              }
            >
              <div className={classes.divider}>
                <div className={classes.separator} />
                <span className={classes.dividerContent}>or</span>
                <div className={classes.separator} />
              </div>
            </div>
            <div
              className={
                activeCause && activeCause.id && activeCause.bank_upi_id
                  ? ''
                  : classes.hiddenDiv
              }
            >
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
                    {activeCause && activeCause.id ? activeCause.bank_upi_id : ''}
                  </Typography>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <IconButton
                    onClick={() =>
                      copyToClipboard(activeCause && activeCause.id ? activeCause.bank_upi_id : '')
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
            </div>
          </CardContent>
        </Card>
      )}
      </React.Fragment>
  )
}
