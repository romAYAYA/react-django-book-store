import { Box, Container, Grid, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={ {
        width: '100%',
        height: 'auto',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        marginTop: '1rem',
        boxShadow: '0px -1px 2px 0px rgba(0,0,0,0.75)'
      } }
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={ 12 }>
            <Typography color="black" variant="h5">
              Share Book | BookClub
            </Typography>
          </Grid>
          <Grid item xs={ 12 }>
            <Typography color="textSecondary" variant="subtitle1">Read&Share</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer