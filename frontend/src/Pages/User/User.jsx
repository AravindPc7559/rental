import React, { useState } from 'react'
import CarouselComponent from '../../Components/Carousel/CarouselComponent'
import DistrictSwiper from '../../Components/PartnerShipSwiper/DistrictSwiper'
import Footer from '../../Components/Footer/Footer'
import InfoCard from '../../Components/InfoCard/InfoCard'
import AppBarHeader from '../../Components/AppBar/AppBar'
import Cards from '../../Components/Cards/Cards'
import Accordian from '../../Components/Accordian/Accordian'
import ChatBot from 'react-simple-chatbot';




function User() {

const loc = localStorage.getItem('userInfo')
const loc1 =JSON.parse(loc)
var steps = null

 {
   loc 
   ?
    steps = [
    {
      id: '1',
      message: `Hai ${loc1.name} Iam Abella . your Personal Chat Assistant.`,
      trigger: '4',
    },
    {
     id: '4',
     message: 'What is your problem?',
     trigger: '5',
   },{
     id: '5',
     options: [
       { value: 1, label: 'I Have A Personal Complaint', trigger: '6' },
       { value: 2, label: 'How Can I Check My Booking History', trigger: '9' },
       { value: 3, label: 'How Can I Book A Car', trigger: '7' },
     ],
   },{
     id:'6',
     message:"If You Have A Personal Complaint or You Want To Say Anything To Us Just Mail us in roadsterofficialpvt@gmail.com",
     trigger:'11'
   },{
     id:'7',
     message:"First login to your Account If You Have One , Next Select Your car , Click Book Now Then You Will Redirect To the Cars Page,There You Can Schedule The Date , After Scheduling Press Book Now Then You Will Redirect to Payment Page There You Can Pay Your Amount After That YOu will Get A Mail",
     trigger:'8'
   },{
     id:'8',
     options: [
       { value: 1, label: 'I Have A Personal Complaint', trigger: '6' },
       { value: 2, label: 'How Can I Check My Booking History', trigger: '9' }
     ],
   },{
     id:'9',
     message:'When You Completed Your Booking You Can Go Back To Your HomePage There You Can See A Three Dots On The Right Side Click. After That Click On The Booking History Option There You Can See Current Booking Booking History Etc..Thank You',
     trigger:'10'
   },{
     id: '10',
     options: [
       { value: 1, label: 'I Have A Personal Complaint', trigger: '6' },
       { value: 3, label: 'How Can I Book A Car', trigger: '7' },
     ],
   },{
     id: '11',
     options: [
       { value: 2, label: 'How Can I Check My Booking History', trigger: '9' },
       { value: 3, label: 'How Can I Book A Car', trigger: '7' },
     ],
   }
  ]
    :
   steps = [
      {
        id: '1',
        message: 'Hai Iam Abella . Roadsters Personal Chat Assistant.Whats Your Name',
        trigger: '2',
      },
      {
        id: '2',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!',
        trigger: 4,
      },{
       id: '4',
       message: 'What is your problem?',
       trigger: '5',
     },{
       id: '5',
       options: [
         { value: 1, label: 'I Have A Personal Complaint', trigger: '6' },
         { value: 2, label: 'How Can I Check My Booking History', trigger: '9' },
         { value: 3, label: 'How Can I Book A Car', trigger: '7' },
       ],
     },{
       id:'6',
       message:"If You Have A Personal Complaint or You Want To Say Anything To Us Just Mail us in roadsterofficialpvt@gmail.com",
       trigger:'11'
     },{
       id:'7',
       message:"First login to your Account If You Have One , Next Select Your car , Click Book Now Then You Will Redirect To the Cars Page,There You Can Schedule The Date , After Scheduling Press Book Now Then You Will Redirect to Payment Page There You Can Pay Your Amount After That YOu will Get A Mail",
       trigger:'8'
     },{
       id:'8',
       options: [
         { value: 1, label: 'I Have A Personal Complaint', trigger: '6' },
         { value: 2, label: 'How Can I Check My Booking History', trigger: '9' }
       ],
     },{
       id:'9',
       message:'When You Completed Your Booking You Can Go Back To Your HomePage There You Can See A Three Dots On The Right Side Click. After That Click On The Booking History Option There You Can See Current Booking Booking History Etc..Thank You',
       trigger:'10'
     },{
       id: '10',
       options: [
         { value: 1, label: 'I Have A Personal Complaint', trigger: '6' },
         { value: 3, label: 'How Can I Book A Car', trigger: '7' },
       ],
     },{
       id: '11',
       options: [
         { value: 2, label: 'How Can I Check My Booking History', trigger: '9' },
         { value: 3, label: 'How Can I Book A Car', trigger: '7' },
       ],
     }
    ]
 }

  const [user,setUser] = useState(true)
  return (
    <div>
          <ChatBot
       floating={true}
      //  speechSynthesis={{ enable: true, lang: 'en' }} 
      botAvatar='https://play-lh.googleusercontent.com/Eiw6jFcu20BsiEWbVo3ifOk5fOPz_li43u31H5Py0ymZbIq1knZkPva40B8g1gwAKBM=s192-rw'
       recognitionEnable={true}
       steps={steps} 
 />
  
      <AppBarHeader/>
      <CarouselComponent/>
      <br/>
      <InfoCard/>
      <br/>
      <DistrictSwiper/>
      <br/>
      <Cards/>
      <br/>
      <Accordian/>
      <br/>
      <Footer/>
    </div>
  )
}

export default User