import React from 'react'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    textAlign:'center',
    fontSize:30,
    fontFamily:'revert'
  }));

function Accordian() {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
         <Div>{"frequently asked questions.."}</Div>
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>What do I need to rent a car?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        Each person who intends to drive must bring a valid driver's license to drive in kerala, passport, and a valid means of payment (generally via credit card). All of these items must be submitted on the day the car will be picked up. Kindly pay with an affiliated credit card. If you wish to pay in cash, you must also submit an item of identification (copies are acceptable) in addition to your driver's license.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <Typography>Can I cancel my reservation?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        Yes, reservations can be cancelled. Please contact us as soon as possible if you wish to cancel your reservation. The reservation number issued when you made the reservation and the email address you registered at the time of reservation are required to cancel or make changes to your reservation.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>What should I do if I damage the car?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        In the event that the customer causes an accident or defacement to the vehicle during the rental period, the user shall be required to pay the non-operation charge (NOC) as partial compensation for the loss of earnings incurred for repairs or cleaning, regardless of the degree of damage or the length of time required for repairs/cleaning.
The non-operation charge (NOC) is different from the deductible (paid by the user) in the insurance and compensation system, which is applied in the event of accidents. Please note that this sum is to be paid even if you are subscribed to the Safety Package.
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <Typography>Can my pet ride in the car?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        Yes. Apply by telephone if you intend to travel with a pet. Please make sure to mention that you will be traveling with a pet when making a reservation (vehicle models that can carry pets differ among rental stations, so online applications will not be accepted). We may refuse to rent out a vehicle even if you have a reservation, so please mention this in advance.
        </Typography>
      </AccordionDetails>
    </Accordion>
  </div>
  )
}

export default Accordian