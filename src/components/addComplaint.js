import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, useActions } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  ThemeProvider
} from '@material-ui/core'
import { SvgIcon } from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'
import { theme } from '../theme'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import PostCard from './postCard'
import PostDetailCard from './postDetailCard'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
  },
  input: {
    display: 'none'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  mainDiv: {
    padding: '1rem'
  },
  instructionDiv: {
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '0.75rem'
  },
  toolBar: {
    padding: '1.25rem 1.25rem 0 1.25rem'
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 500
  },
  textfield: {
    width: '100%',
    fontSize: 'small'
  },
  formInput: {
    marginBottom: '2rem'
  },
  checkbox: {
    width: '100%',
    fontSize: 'small'
  },
  Card: {
    padding: '1.5rem',
    borderRadius: '0.75rem',
    marginBottom: '1rem'
  },
  inputCard: {
    padding: '1.5rem',
    borderRadius: '0.75rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    textAlign: '-webkit-center',
    justifyContent: 'space-between',
    minHeight: '5rem'
  },
  formLabel: {
    display: 'flex',
    color: '#000000'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  previewCard: {
    marginTop: '0.8rem',
    padding: '0.2rem'
  },
  bottomButton: {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: '1.2rem'
  },
  bottomButtonPublish: {
    backgroundColor: '#6552FF',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    padding: '1.2rem'
  },
  selectCategory: {}
}))

function getSteps () {
  return ['Fill Details', 'Upload Docs', 'Publish']
}

export default function AddComplaint () {
  const classes = useStyles()
  const history = useHistory()
  const [activeStep, setActiveStep] = React.useState(0)
  const [personName, setPersonName] = React.useState([])
  const initCause = {
      
  }
  const [cause, setCause] = React.useState({...initCause})
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleChange = event => {
    setPersonName(event.target.value)
  }

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
        // bottom: '0rem'
      }
    }
  }

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ]

  const getNavbarIcon = step => {
    switch (step) {
      case 0:
      case 3:
        return (
          <IconButton
            onClick={() => history.push('/')}
            edge='start'
            color='inherit'
            aria-label='menu'
          >
            <CloseIcon />
          </IconButton>
        )
      case 1:
      case 2:
        return (
          <IconButton
            onClick={handleBack}
            edge='start'
            color='inherit'
            aria-label='menu'
          >
            <ArrowBackIosIcon />
          </IconButton>
        )
    }
  }

  const getStepButton = step => {
    switch (step) {
      case 0:
      case 1:
        return (
          <div onClick={handleNext} className={classes.bottomButton}>
            Continue
          </div>
        )
      case 2:
        return (
          <div onClick={handleNext} className={classes.bottomButtonPublish}>
            Publish Complaint
          </div>
        )
    }
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Card className={classes.Card}>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel}>Category</FormLabel>
              <FormControl className={classes.textfield}>
                <InputLabel id='demo-mutiple-checkbox-label'>Tag</InputLabel>
                <Select
                  className={classes.selectCategory}
                  labelId='demo-mutiple-checkbox-label'
                  id='demo-mutiple-checkbox'
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel}>Description</FormLabel>
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='Give brief details of your complaint'
              />
            </div>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel}>
                Personal Details
              </FormLabel>
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='Enter name of the neeedy'
              />
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='Enter contact number'
              />
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='Enter email address(optional)'
              />
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='Address'
              />
            </div>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel}>
                Payment Details
              </FormLabel>
              <FormControlLabel
                className={classes.checkbox}
                control={<Checkbox name='checkedC' />}
                label='Bank'
              />
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='Account Name'
              />
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='Account Number'
              />
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='IFSC Code'
              />
            </div>
            <div className={classes.formInput}>
              <FormControlLabel
                className={classes.checkbox}
                control={<Checkbox name='checkedC' />}
                label='UPI ID'
              />
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='UPI ID'
              />
            </div>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel}>
                Estimated Donation Goal
              </FormLabel>
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='Enter the amount in Rs'
              />
            </div>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel}>Deadline</FormLabel>
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='dd/mm/yyyy'
              />
            </div>
          </Card>
        )
      case 1:
        return (
          <div>
            <Card className={classes.inputCard}>
              <FormLabel className={classes.formLabel}>
                Needy photograph
              </FormLabel>
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                multiple
                type='file'
              />
              <label htmlFor='contained-button-file'>
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>
              </label>
            </Card>
            <Card className={classes.inputCard}>
              <FormLabel className={classes.formLabel}>
                BenchMark Data
              </FormLabel>
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                multiple
                type='file'
              />
              <label htmlFor='contained-button-file'>
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>
              </label>
            </Card>
            <Card className={classes.inputCard}>
              <FormLabel className={classes.formLabel}>Cover Photo</FormLabel>
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                multiple
                type='file'
              />
              <label htmlFor='contained-button-file'>
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>
              </label>
            </Card>
            <Card className={classes.inputCard}>
              <FormLabel className={classes.formLabel}>
                Additional Files
              </FormLabel>
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                multiple
                type='file'
              />
              <label htmlFor='contained-button-file'>
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>
              </label>
            </Card>
          </div>
        )
      case 2:
        return (
          <div>
            <FormLabel className={classes.formLabel}>
              Complaint Preview
            </FormLabel>
            <div className={classes.previewCard}>
              <PostDetailCard />
            </div>
          </div>
        )
      default:
        return 'Unknown step'
    }
  }
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position='static' elevation={0}>
          <Toolbar className={classes.toolBar}>
            {getNavbarIcon(activeStep)}

            <Typography variant='h6' className={classes.title}>
              Add a complaint
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <div className={classes.root}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel style={{ color: '#6552FF' }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.mainDiv}>
          <Card className={classes.instructionDiv}>
            This information will be shared to public and third party companies
            for getting responses
          </Card>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                Complaint Registered! We will contact you via mail or phone.
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                More complaints ?
              </Button>
            </div>
          ) : (
            <div className={classes.formDiv}>
              <div>{getStepContent(activeStep)}</div>
            </div>
          )}
        </div>
        <div>{getStepButton(activeStep)}</div>
      </div>
    </div>
  )
}
