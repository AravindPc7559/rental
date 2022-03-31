import { Paper } from '@material-ui/core'
import { Button, Container, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


function Filter() {
  return (
    <div>
        <Container>
            <Box>
                <Grid container spacing={4} >
                    <Grid item sm={12} xs={12} md={6} lg={4} xl={4} >
                            <Paper elevation={0} style={{backgroundColor:'transparent'}}  >
                            <TextField id="outlined-basic" label="Search Cars" variant="outlined" />
                            <Button variant='contained' sx={{marginTop:1,marginLeft:1}} >Search</Button>
                            </Paper>
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={4} xl={4}>
                    <Paper elevation={3} fullwidth >
                                hlo
                            </Paper>
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={4} xl={4}>
                    <Paper elevation={3} fullwidth >
                                hlo
                            </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </div>
  )
}

export default Filter