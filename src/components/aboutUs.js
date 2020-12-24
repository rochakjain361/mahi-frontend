import {
  Button,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { theme } from '../theme'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import IconButton from '@material-ui/core/IconButton'
import InstagramIcon from '@material-ui/icons/Instagram'
import Asset1 from '../icons/asset1'
import Asset2 from '../icons/asset2'
import Asset3 from '../icons/asset3'
import MahiIcon from '../icons/mahi'
import Navbar from './Navbar'
import aboutUsPageHeader from '../media/aboutUsPageHeader.png'
import aboutUsHeader from '../media/aboutUsHeader.png'
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    flexGrow: 1,
    alignItems: 'center'
  },
  mainDiv: {
    width: '100%',
    padding: '1rem 1rem 2.5rem 1rem',
    marginBottom: '1rem',
    background: 'white',
    textAlign: 'center'
  },
  title: {
    padding: '0 1.5rem',
    fontSize: '1.5rem',
    fontWeight: 500
  },
  content: {
    fontSize: '14px',
    padding: '0 1.25rem',
    lineHeight: '1.875rem',
    fontWeight: 400,
    maxWidth: '612px',
    margin: 'auto'
  },
  headerContent:{
    fontSize: '20px',
    padding: '0 1.25rem',
    lineHeight: '1.875rem',
    fontWeight: 400,
    maxWidth: '590px',
    margin: 'auto',
    fontFamily: 'Montserrat',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: '1rem',
    paddingTop: '2.5rem',
    paddingBottom: '0.625rem',
    lineHeight: '1rem',
    fontWeight: 500
  },
  subcontent: {
    fontSize: '0.875rem',
    padding: '0 1.25rem',
    paddingBottom: '0.625rem',
    lineHeight: '1.875rem'
  },
  becomeVolunteerButton: {
    backgroundColor: '#6552FF',
    borderRadius: '0.4rem',
    marginTop: '0.7rem',
    textTransform: 'none',
    padding: '11px 22px',
    color: 'white',
    '&:active': {
      backgroundColor: '#0062cc',
      borderColor: '#005cbf'
    }
  },
  socialIcons: {
    color: '#6552FF'
  },
  icons: {
    padding: '0 0.9rem'
  },
  assets: {
    marginBottom: '1.5rem'
  },
  mahIcon: {
    paddingTop: '2.5rem'
  },
  gridContent: {
    maxWidth: '1502px',
    margin: 'auto'
  },
  aboutUsHeaderImage: {
    width: '100%',
  }
}))

export default function AboutUs (props) {
  const classes = useStyles()
  return (
    <div>
      <Navbar />
      {isMobile ? <div style={{background: '#fff'}}>
                  <img src={aboutUsPageHeader} style={{width: '100%'}}/>
                  </div> : ''}
      <Container className={classes.root} maxWidth={false}>
        <ThemeProvider theme={theme}>
          <div className={classes.mainDiv}>
          {isMobile ? (
                ''
              ) : (
                <Grid container lg={12} className={classes.gridContent} style={{marginBottom: '5rem'}}>
                  <Grid item lg={6} sm={6} xs={12}>
                    <div style={{ margin: '0.5rem' }}>
                      <img
                        src={aboutUsHeader}
                        className={classes.aboutUsHeaderImage}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} sm={6} xs={12} className={classes.headerContent}>
                    I cannot do all the good that the world needs. But the world
                    needs all the good that I can do. <br />
                    <div style={{ textAlign: 'right', marginTop: '1rem', fontStyle: 'normal' }}> - Jana Stanfield</div>
                  </Grid>
                </Grid>
              )}
            <h3 className={classes.title}>About Us.</h3>
            <Typography className={classes.content}>
              Mahi literally means “The Union of Heaven and Earth”. The vision
              is to make this a reality, starting with India.
            </Typography>
          </div>
          <div className={classes.mainDiv}>
            <h3 className={classes.title}>What we do?</h3>
            <Typography className={classes.content}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices
              et pulvinar in mauris ut risus, libero magna duis. Rhoncus eu nunc
              nisl id et. Commodo nisi, scelerisque facilisis sed adipiscing
              egestas placerat magna. Urna dignissim dignissim duis aliquam
              netus enim elementum.
            </Typography>
          </div>
          <div className={classes.mainDiv}>
            <h3 className={classes.title}>How we work?</h3>
            <Grid container lg={12} className={classes.gridContent}>
              <Grid lg={4} xs={12} item>
                <div className={classes.subtitle}>
                  <div className={classes.assets}>
                    <Asset1 />
                  </div>
                  Add Complaint
                </div>
                <Typography className={classes.subcontent}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Ultrices et pulvinar in mauris ut risus.
                </Typography>
              </Grid>
              <Grid lg={4} xs={12} item>
                <div className={classes.subtitle}>
                  <div className={classes.assets}>
                    <Asset2 />
                  </div>
                  Volunteer reaches out
                </div>
                <Typography className={classes.subcontent}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Ultrices et pulvinar in mauris ut risus.
                </Typography>
              </Grid>
              <Grid lg={4} xs={12} item>
                <div className={classes.subtitle}>
                  <div className={classes.assets}>
                    <Asset3 />
                  </div>
                  Resolved Problem
                </div>
                <Typography className={classes.subcontent}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Ultrices et pulvinar in mauris ut risus.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.mainDiv}>
            <h3 className={classes.title}>Want to Become a volunteer</h3>
            <Typography className={classes.content}>
              Best gift that you can give is your time
            </Typography>
            <Button className={classes.becomeVolunteerButton}>
              Become a Volunteer
            </Button>
          </div>
          <div className={classes.mainDiv}>
            <Grid container lg={12} className={classes.gridContent}>
              <Grid item lg={2} sm={4} xs={12}>
                <MahiIcon className={classes.mahIcon} />
              </Grid>
              <Grid item lg={2} sm={4} xs={12}>
                <div className={classes.subtitle}>Resources</div>
                <Typography className={classes.subcontent}>
                  Home <br />
                  Complaints <br />
                  Volunteer <br />
                </Typography>
              </Grid>
              <Grid item lg={2} sm={4} xs={12}>
                <div className={classes.subtitle}>Add Complaint</div>
                <Typography className={classes.subcontent}>
                  Hunger <br />
                  Health <br />
                  Homeless <br />
                  JEE/NEET <br />
                  Others <br />
                </Typography>
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.subtitle}>More</div>
                <Typography className={classes.subcontent}>
                  Become a Volunteer
                  <br />
                  Help Needy <br />
                  Success Stories <br />
                  Common Question <br />
                </Typography>
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.subtitle}>Contact Us</div>
                <div className={classes.subcontent}>
                  Mob: +91 9077339077
                  <br />
                  Email: mahi.care123@gmail.com
                  <br />
                </div>
              </Grid>
            </Grid>
            <IconButton className={classes.socialIcons}>
              <FacebookIcon className={classes.icons} />
            </IconButton>
            <IconButton className={classes.socialIcons}>
              <LinkedInIcon className={classes.icons} />
            </IconButton>
            <IconButton className={classes.socialIcons}>
              <TwitterIcon className={classes.icons} />
            </IconButton>
            <IconButton className={classes.socialIcons}>
              <InstagramIcon className={classes.icons} />
            </IconButton>
            <div className={classes.subcontent}>
              mahi.care © 2020 Copyright, All Rights Reserved
            </div>
          </div>
        </ThemeProvider>
      </Container>
    </div>
  )
}
