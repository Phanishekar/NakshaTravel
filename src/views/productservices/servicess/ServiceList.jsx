import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import BreadCrumbs from "components/@custom/breadCrumbs/BreadCrumb";
import { CardBody, Col, Row } from "reactstrap"
import { NavLink, Link } from 'react-router-dom';
import { Box } from 'react-feather';
export default function MediaCard() {
  return (

    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle="Product & Service"
        breadCrumbParent="Services"
        breadCrumbActive="Services List"
      />
      <br />
   
      <Row>
    

        <Col lg="4"  >
          <Link to="/productandservice/service/hotel">

            <Card sx={{ maxWidth: 200, marginLeft: 12, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://cdn4.vectorstock.com/i/thumb-large/63/13/hotel-with-five-stars-line-vector-16716313.jpg"
                alt="photo"
              />

              <CardContent>

                Hotel

              </CardContent>

            </Card>
            </Link>
        </Col>


        <Col lg="3" >
          <Link to="/productservices/servicess/flight">
            <Card sx={{ maxWidth: 200, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://cdn.dribbble.com/users/330915/screenshots/6170423/1_travel_anim_still_2x.gif?compress=1&resize=400x300"
                alt="photo"
              />

              <CardContent>

                Flights

              </CardContent>

            </Card></Link>

        </Col>
        <Col lg="3" >
          <Link to="/productservices/servicess/TourPackage">
            <Card sx={{ maxWidth: 200, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://us.123rf.com/450wm/dreamcreation01/dreamcreation011810/dreamcreation01181000233/110073072-stock-vector-vector-illustration-of-explore-the-world-with-famous-architectural-landmarks.jpg"
                alt="photo"
              />
              <CardContent>

                Tour Package

              </CardContent>

            </Card></Link>

        </Col>
      </Row><br /><br /><br />
      <Row>
        <Col lg="4" >
          <Link to="/productservices/servicess/visa">
            <Card sx={{ maxWidth: 200, marginLeft: 12, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://i.pinimg.com/originals/2a/63/d8/2a63d8df769af07ef8446dd4c25b2a23.jpg"
                alt="photo"
              />
              <CardContent>

                Visa

              </CardContent>

            </Card></Link>

        </Col>
        <Col lg="3" >
          <Link to="/productservices/servicess/carhire">
            <Card sx={{ maxWidth: 200, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://i.pinimg.com/originals/d1/2a/6e/d12a6e88e902ffabd87c63791522cfd8.gif"
                alt="photo"
              />
              <CardContent>

                Car Hire

              </CardContent>

            </Card></Link>

        </Col>
        <Col lg="3" >
          <Link to="/productservices/servicess/assist">
            <Card sx={{ maxWidth: 200, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://cdn.dribbble.com/users/4842274/screenshots/11759690/media/4481cff463cba924783ef875aca6932d.gif"
                alt="photo"
              />
              <CardContent>

                Assist

              </CardContent>

            </Card></Link>

        </Col>
      </Row><br /><br /><br />

      <Row>
        <Col lg="4" >
          <Link to="/productservices/servicess/insurance">
            <Card sx={{ maxWidth: 200, marginLeft: 12, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://ak.picdn.net/shutterstock/videos/1055847107/thumb/10.jpg"
                alt="photo"
              />
              <CardContent>

                Insurance

              </CardContent>
            </Card></Link>

        </Col>
  


      </Row>



    </React.Fragment>
  );
}