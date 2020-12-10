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
import { createCause } from '../actions/CauseActions'
import {
  validateEmail,
  validateIFSC,
  validateName,
  validatePhoneNumber,
  validateUPI,
  validatePositiveNumber
} from '../utils/validations'
import getBankList from '../constants/bank'

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
  hiddentextfield: {
    width: '100%',
    fontSize: 'small',
    display: 'none'
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
  uploadErrorContainer: {
    fontSize: '0.75rem',
    marginTop: '0.2rem',
    color: '#f44336'
  },
  selectCategory: {}
}))

function getSteps () {
  return ['Fill Details', 'Upload Docs', 'Publish']
}

export default function AddComplaint () {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = React.useState(0)
  const [personName, setPersonName] = React.useState([])
  const all_tags = useSelector(state => state.extras.Tags)
  const initCause = {
    tags: [],
    description: '',
    needy_name: '',
    needy_number: '',
    needy_email: '',
    needy_address: '',
    bank_name: '',
    account_no: '',
    ifsc_code: '',
    upi_id: '',
    goal: null,
    deadline: null,
    cover_photo: '',
    needy_photo: '',
    media: {
      benchmark_data: [],
      additional_files: []
    }
  }

  const [name_error, set_name_error] = React.useState(null)
  const [phone_number_error, set_phone_number_error] = React.useState(null)
  const [email_error, set_email_error] = React.useState(null)
  const [description_error, set_description_error] = React.useState(null)
  const [tag_error, set_tag_error] = React.useState(null)
  const [goal_error, set_goal_error] = React.useState(null)
  const [deadline_error, set_deadline_error] = React.useState(null)
  const [address_error, set_address_error] = React.useState(null)
  const [bank_name_error, set_bank_name_error] = React.useState(null)
  const [bank_ifsc_error, set_bank_ifsc_error] = React.useState(null)
  const [
    bank_account_number_error,
    set_bank_account_number_error
  ] = React.useState(null)
  const [bank_upi_error, set_bank_upi_error] = React.useState(null)
  const [payment_error, set_payment_error] = React.useState(false)
  const [needy_photo_error, set_needy_photo_error] = React.useState(null)
  const [cover_photo_error, set_cover_photo_error] = React.useState(null)
  const [benchmark_data_error, set_benchmark_data_error] = React.useState(null)

  const [cause, setCause] = React.useState({ ...initCause })
  const [bank, setBank] = React.useState(false)
  const [upi, setUpi] = React.useState(false)
  const steps = getSteps()

  const handleChange = event => {
    setCause({ ...cause, [event.target.name]: event.target.value })
  }

  const handleSingleImageChange = e => {
    setCause({ ...cause, [e.target.name]: [...e.target.files] })
  }

  const handleMediaImageChange = e => {
    setCause({
      ...cause,
      media: {
        ...cause.media,
        [e.target.name]: [...cause.media[e.target.name], ...e.target.files]
      }
    })
  }

  const removeImage = name => {
    setCause({ ...cause, [name]: [] })
  }

  const removeMediaImage = (opt, name) => {
    var array = [...cause.media[name]] // make a separate copy of the array
    var index = array.indexOf(opt)
    array.splice(index, 1)
    setCause({ ...cause, media: { ...cause.media, [name]: array } })
  }

  const validateForm = () => {
    var err = false

    let name_err = validateName(cause.needy_name)
    if (name_err.status === false) {
      set_name_error(name_err.error)
      err = true
    } else {
      set_name_error(null)
    }

    let phone_number_err = validatePhoneNumber(cause.needy_number)
    if (phone_number_err.status === false) {
      set_phone_number_error(phone_number_err.error)
      err = true
    } else {
      set_phone_number_error(null)
    }

    let email_err = validateEmail(cause.needy_email, true)
    if (email_err.status === false) {
      set_email_error(email_err.error)
      err = true
    } else {
      set_email_error(null)
    }

    if (bank) {
      let bank_account_number_err = validatePositiveNumber(cause.account_no)
      if (bank_account_number_err.status === false) {
        set_bank_account_number_error(bank_account_number_err.error)
        err = true
      } else {
        set_bank_account_number_error(null)
      }

      let bank_ifsc_code_err = validateIFSC(cause.ifsc_code)
      if (bank_ifsc_code_err.status === false) {
        set_bank_ifsc_error(bank_ifsc_code_err.error)
        err = true
      } else {
        set_bank_ifsc_error(null)
      }
      if (!cause.bank_name) {
        set_bank_name_error('Please select a bank')
        err = true
      }else{
        set_bank_name_error(null)
      }
    }

    if (upi) {
      let bank_upi_err = validateUPI(cause.upi_id)
      if (bank_upi_err.status === false) {
        set_bank_upi_error(bank_upi_err.error)
        err = true
      } else {
        set_bank_upi_error(null)
      }
    }

    let goal_err = validatePositiveNumber(cause.goal)
    if (goal_err.status === false) {
      set_goal_error(goal_err.error)
      err = true
    } else {
      set_goal_error(null)
    }

    if (!cause.description) {
      set_description_error('Please add a brief description of the cause')
      err = true
    }
    else{
      set_description_error(null)
    }

    if (!cause.needy_address) {
      set_address_error('Please add address of the needy person')
      err = true
    }else{
      set_address_error(null)
    }

    if (!cause.deadline) {
      set_deadline_error('Please add a deadline')
      err = true
    } else {
      let today = new Date()
      let deadline_date = new Date(cause.deadline)
      if (deadline_date < today) {
        set_deadline_error('Deadline cannot be in past')
        err = true
      }
      else{
        set_deadline_error(null)
      }
    }

    if (!bank && !upi) {
      set_payment_error(true)
      err = true
    } else {
      set_payment_error(false)
    }

    return !err
  }

  const validateUpload = () => {
    let err = false
    if (!cause.needy_photo || cause.needy_photo.length === 0) {
      set_needy_photo_error("Please upload needy person's photograph")
      err = true
    } else {
      set_needy_photo_error(null)
    }
    console.log(cause.media.benchmark_data)
    if (
      !cause.media.benchmark_data ||
      cause.media.benchmark_data.length === 0
    ) {
      set_benchmark_data_error('Please upload benchmark data files')
      err = true
    } else {
      set_benchmark_data_error(null)
    }
    if (!cause.cover_photo || cause.cover_photo.length === 0) {
      set_cover_photo_error('Please upload a cover photo for the cause')
      err = true
    } else {
      set_cover_photo_error(null)
    }
    return !err
  }

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        let isValid = validateForm()
        if (isValid) {
          setActiveStep(prevActiveStep => prevActiveStep + 1)
        }
        break
      case 1:
        let isValidUpload = validateUpload()
        if (isValidUpload) {
          setActiveStep(prevActiveStep => prevActiveStep + 1)
        }
        break
      default:
        return null
    }
    // setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleSubmit = () => {
    let formdata = new FormData()
    for (let i = 0; i < cause.tags.length; i++) {
      formdata.append('tag', cause.tags[i].toString())
    }
    for (let i = 0; i < cause.media.additional_files.length; i++) {
      formdata.append('media_files', cause.media.additional_files[i])
    }
    for (let i = 0; i < cause.media.benchmark_data.length; i++) {
      formdata.append('benchmark_media', cause.media.benchmark_data[i])
    }
    let deadline = cause.deadline
      .split('/')
      .reverse()
      .join('/')
    formdata.append('cover_photo', cause.cover_photo[0])
    formdata.append('description', cause.description)
    formdata.append('goal', cause.goal)
    formdata.append('deadline', deadline)
    formdata.append('needy_name', cause.needy_name)
    formdata.append('needy_phone_number', `+91${cause.needy_number}`)
    formdata.append('needy_email', cause.needy_email)
    formdata.append('needy_address', cause.needy_address)
    formdata.append('needy_photo', cause.needy_photo[0])
    if (bank) {
      formdata.append('bank_name', cause.bank_name)
      formdata.append('bank_ifsc_code', cause.ifsc_code)
      formdata.append('bank_account_no', cause.account_no)
    }
    if (upi) {
      formdata.append('bank_upi_id', cause.upi_id)
    }

    dispatch(createCause(formdata, handleSuccess))
  }

  const handleSuccess = () => {
    handleNext()
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

  const bankList = getBankList()

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
      default:
        return null
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
          <div onClick={handleSubmit} className={classes.bottomButtonPublish}>
            Publish Complaint
          </div>
        )
      default:
        return null
    }
  }

  const getStepContent = step => {
    const additional_files_names = cause.media.additional_files.map(
      additional_file => {
        return (
          <div
            onClick={() =>
              removeMediaImage(additional_file, 'additional_files')
            }
          >
            {additional_file.name}
          </div>
        )
      }
    )

    const benchmark_data_names = cause.media.benchmark_data.map(data => {
      return (
        <div onClick={() => removeMediaImage(data, 'benchmark_data')}>
          {data.name}
        </div>
      )
    })
    switch (step) {
      case 0:
        return (
          <Card className={classes.Card}>
            <div className={classes.formInput}>
              <FormLabel required className={classes.formLabel}>
                Category
              </FormLabel>
              <FormControl className={classes.textfield}>
                <InputLabel id='demo-mutiple-checkbox-label'>Tag</InputLabel>
                <Select
                  className={classes.selectCategory}
                  labelId='demo-mutiple-checkbox-label'
                  id='demo-mutiple-checkbox'
                  multiple
                  value={cause.tags ? cause.tags : ''}
                  name='tags'
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {all_tags &&
                    all_tags.map(tag => (
                      <MenuItem key={tag.id} value={tag.id}>
                        <Checkbox checked={cause.tags.indexOf(tag.id) > -1} />
                        <ListItemText primary={tag.tag_name} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel} required>
                Description
              </FormLabel>
              <TextField
                className={classes.textfield}
                onChange={handleChange}
                value={cause.description ? cause.description : ''}
                name='description'
                label='Give brief details of your complaint'
                error={description_error ? true : false}
                helperText={description_error ? description_error : ''}
              />
            </div>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel}>
                Personal Details
              </FormLabel>
              <TextField
                className={classes.textfield}
                onChange={handleChange}
                value={cause.needy_name ? cause.needy_name : ''}
                name='needy_name'
                label='Enter name of the neeedy'
                required
                error={name_error ? true : false}
                helperText={name_error ? name_error : ''}
              />
              <TextField
                className={classes.textfield}
                onChange={handleChange}
                value={cause.needy_number ? cause.needy_number : ''}
                name='needy_number'
                label='Enter contact number'
                required
                error={phone_number_error ? true : false}
                helperText={phone_number_error ? phone_number_error : ''}
              />
              <TextField
                className={classes.textfield}
                onChange={handleChange}
                name='needy_email'
                value={cause.needy_email ? cause.needy_email : ''}
                label='Enter email address(optional)'
                error={email_error ? true : false}
                helperText={email_error ? email_error : ''}
              />
              <TextField
                className={classes.textfield}
                onChange={handleChange}
                value={cause.needy_address ? cause.needy_address : ''}
                name='needy_address'
                label='Address'
                required
                error={address_error ? true : false}
                helperText={address_error ? address_error : ''}
              />
            </div>
            <div className={classes.formInput}>
              <FormLabel
                className={classes.formLabel}
                required
                error={payment_error}
              >
                Payment Details
              </FormLabel>
              <FormControlLabel
                className={classes.checkbox}
                control={
                  <Checkbox
                    onChange={() => setBank(!bank)}
                    name='bank'
                    value={bank}
                  />
                }
                label='Bank'
              />
              <TextField
                className={bank ? classes.textfield : classes.hiddentextfield}
                onChange={handleChange}
                value={cause.bank_name ? cause.bank_name : ''}
                select
                name='bank_name'
                label='Bank Name'
                error={bank_name_error ? true : false}
                helperText={bank_name_error ? bank_name_error : ''}
              >
                {bankList.map(bank => (
                  <MenuItem key={bank.value} value={bank.value}>
                    {bank.displayName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                className={bank ? classes.textfield : classes.hiddentextfield}
                onChange={handleChange}
                value={cause.account_no ? cause.account_no : ''}
                name='account_no'
                label='Account Number'
                error={bank_account_number_error ? true : false}
                helperText={
                  bank_account_number_error ? bank_account_number_error : ''
                }
              />
              <TextField
                className={bank ? classes.textfield : classes.hiddentextfield}
                onChange={handleChange}
                value={cause.ifsc_code ? cause.ifsc_code : ''}
                name='ifsc_code'
                label='IFSC Code'
                error={bank_ifsc_error ? true : false}
                helperText={bank_ifsc_error ? bank_ifsc_error : ''}
              />
            </div>
            <div className={classes.formInput}>
              <FormControlLabel
                className={classes.checkbox}
                control={
                  <Checkbox
                    onChange={() => setUpi(!upi)}
                    name='upi'
                    value={upi}
                  />
                }
                label='UPI ID'
              />
              <TextField
                className={upi ? classes.textfield : classes.hiddentextfield}
                onChange={handleChange}
                value={cause.upi_id ? cause.upi_id : ''}
                name='upi_id'
                label='UPI ID'
                error={bank_upi_error ? true : false}
                helperText={bank_upi_error ? bank_upi_error : ''}
              />
            </div>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel} required>
                Estimated Donation Goal
              </FormLabel>
              <TextField
                className={classes.textfield}
                onChange={handleChange}
                value={cause.goal ? cause.goal : ''}
                name='goal'
                label='Enter the amount in Rs'
                error={goal_error ? true : false}
                helperText={goal_error ? goal_error : ''}
              />
            </div>
            <div className={classes.formInput}>
              <FormLabel className={classes.formLabel} required>
                Deadline
              </FormLabel>
              <TextField
                className={classes.textfield}
                onChange={handleChange}
                name='deadline'
                type='date'
                defaultValue={cause.deadline ? cause.deadline : ''}
                error={deadline_error ? true : false}
                helperText={deadline_error ? deadline_error : ''}
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
              <div onClick={() => removeImage('needy_photo')}>
                {cause.needy_photo[0] ? cause.needy_photo[0].name : ''}
              </div>
              <input
                accept='image/*'
                onChange={handleSingleImageChange}
                name='needy_photo'
                className={classes.input}
                id='contained-button-file-needy_photo'
                type='file'
              />
              <label htmlFor='contained-button-file-needy_photo'>
                <Button variant='contained' color='primary' component='span'>
                  {cause.needy_photo[0] ? 'Update' : 'Upload'}
                </Button>
              </label>
              <div className={classes.uploadErrorContainer}>
                {needy_photo_error}
              </div>
            </Card>
            <Card className={classes.inputCard}>
              <FormLabel className={classes.formLabel}>
                BenchMark Data
              </FormLabel>
              {cause.media.benchmark_data[0] ? benchmark_data_names : ''}
              <input
                accept='image/*'
                className={classes.input}
                onChange={handleMediaImageChange}
                name='benchmark_data'
                id='contained-button-file-benchmark_data'
                multiple
                type='file'
              />
              <label htmlFor='contained-button-file-benchmark_data'>
                <Button variant='contained' color='primary' component='span'>
                  {cause.media.benchmark_data[0] ? 'Upload More' : 'Upload'}
                </Button>
              </label>
              <div className={classes.uploadErrorContainer}>
                {benchmark_data_error}
              </div>
            </Card>
            <Card className={classes.inputCard}>
              <FormLabel className={classes.formLabel}>Cover Photo</FormLabel>
              <div onClick={() => removeImage('cover_photo')}>
                {cause.cover_photo[0] ? cause.cover_photo[0].name : ''}
              </div>
              <input
                accept='image/*'
                onChange={handleSingleImageChange}
                name='cover_photo'
                className={classes.input}
                id='contained-button-file-cover_photo'
                type='file'
              />
              <label htmlFor='contained-button-file-cover_photo'>
                <Button variant='contained' color='primary' component='span'>
                  {cause.cover_photo[0] ? 'Update' : 'Upload'}
                </Button>
              </label>
              <div className={classes.uploadErrorContainer}>
                {cover_photo_error}
              </div>
            </Card>
            <Card className={classes.inputCard}>
              <FormLabel className={classes.formLabel}>
                Additional Files
              </FormLabel>
              {cause.media.additional_files[0] ? additional_files_names : ''}
              <input
                accept='image/*'
                className={classes.input}
                onChange={handleMediaImageChange}
                name='additional_files'
                id='contained-button-file-additional_files'
                multiple
                type='file'
              />
              <label htmlFor='contained-button-file-additional_files'>
                <Button variant='contained' color='primary' component='span'>
                  {cause.media.additional_files[0] ? 'Upload More' : 'Upload'}
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
              <PostCard cause={cause} />
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
