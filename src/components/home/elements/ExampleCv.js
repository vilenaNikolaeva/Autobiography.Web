import React, { Component } from 'react';
import { Card, Figure, ProgressBar, Container } from 'react-bootstrap';
import Moment from 'moment';
import '../../../Styles/exampleCv.css'
import defaultImage from '../../../images/blank-profile-picture.png'

export default class ExampleCv extends Component {
    render = () => {
        return (
            <Container className="main-exe-cv-container">
                <Card.Title as="h5" className="message-question">Not sure how to start?! </Card.Title>
                <div as="div" className="message-container">
                    <Card.Title as="h4" className="message-title">Help yourself with the example below.</Card.Title>
                </div>
                <div as="div" className="exe-cv-container">
                    <div className="exe-cv">
                        <div className="exe-cv-container1">
                            <Figure.Image className="avatar_image" width={171} height={180} alt="Avatar" src={defaultImage}  />
                            <br />
                            <Card.Text><i className="fas fa-user" style={{ color: '#279081' }} /><span className="userName">Serena Johnson</span></Card.Text>
                            <Card.Text><i className="fas fa-map-marker-alt" style={{ color: '#279081', marginRight: '3px' }} />London, Richmond</Card.Text>
                            <Card.Text><i className="fas fa-envelope-square" style={{ color: '#279081', marginRight: '3px' }} />serenaJohnson@gmail.com</Card.Text>
                            <Card.Link href="#"><i className="fas fa-link" /> https://wwww.linkedin.com/EXAMPLESerenaJohnson</Card.Link>
                            <br />
                            <br />
                            <Card.Text className="exampleDescription"><i className="fas fa-info" style={{ color: '#279081', marginRight: '3px' }} />
                                Hi, I`m Serena, and I am passionate about helping businesses
                                get discovers and gain recognition through the latest virial,
                                gorilla, and digital marketing tactics. As an organized and highly creative individual,
                                I love to champion brilliant marketing ideas that deliver first-class results and the challenges of working within a dynamic
                                and fast working environment.</Card.Text>
                            <br />
                            <hr />
                            <Card.Title><i className="fas fa-cog" style={{ color: '#279081' }} ></i>Skills</Card.Title>
                            <Card.Text>PHOTOSHOP</Card.Text>
                            <ProgressBar className="scale" now="80" label={`80%`}  ></ProgressBar>
                            <Card.Text>GOOGLEANALYTICS</Card.Text>
                            <ProgressBar className="scale" now="100" label={`100%`}  ></ProgressBar>
                            <Card.Text>HTML/CSS </Card.Text>
                            <ProgressBar className="scale" now="70" label={`70%`}  ></ProgressBar>
                            <Card.Text>WORDPRESS CMS </Card.Text>
                            <ProgressBar className="scale" now="50" label={`50%`}  ></ProgressBar>
                            <br />
                            <hr />
                            <Card.Title><i className="fas fa-globe" style={{ color: '#279081' }} ></i>Languages</Card.Title>
                            <Card.Text>English</Card.Text>
                            <ProgressBar className="scale" now="100" label={`100%`}></ProgressBar>
                            <Card.Text>Spanish</Card.Text>
                            <ProgressBar className="scale" now="70" label={`70%`}></ProgressBar>
                            <Card.Text>	Arabic</Card.Text>
                            <ProgressBar className="scale" now="30" label={`30%`}></ProgressBar>
                            <hr />
                        </div>
                    </div>
                    <div className="exe-cv2">
                        <div className="exe-cv-container2">
                            <Card.Title><i className="fas fa-briefcase fa-3x" style={{ color: '#279081' }}></i> Experiences</Card.Title>
                            <br />
                            <Card.Text className="exampleTitle">Experience as: <b>DIGITAL MARKETING ASSISTANT</b> at: <b>AMAZON</b></Card.Text>
                            <i className="fas fa-calendar-alt fa-fw w3-margin-righ" style={{ color: '#279081' }} />
                            <Card.Text className="exampleCalendar">{Moment('2010-05-17').format('MMM DD YYYY')}</Card.Text>
                            <b>To</b>
                            <Card.Text className="exampleCalendar">{Moment('2015-12-03').format('MMM DD YYYY')}</Card.Text>
                            <Card.Text className="exampleDescription" >Supporting an established Digital Marketing team of 20 my responsibiolit8ies included the setup
                                and management of digital marketing campaigns, generating reports and insight for the wider marketing team, brainstorming new marketing concepts,
                                and mentoring junior members of the team.
                                My key focus was centered on SEO, PPC, Google Analytics, and the UI Design of Landing Zones.</Card.Text>
                            <hr className="dividing-line" />
                            <Card.Text className="exampleTitle">Experience as: <b>DIGITAL MARKETING MANEGER</b> at: <b>GOOGLE</b></Card.Text>
                            <i className="fas fa-calendar-alt fa-fw w3-margin-righ" style={{ color: '#279081' }} />
                            <Card.Text className="exampleCalendar">{Moment('2016-10-10').format('MMM DD YYYY')}</Card.Text>
                            <b>To</b>
                            <Card.Text className="exampleCalendar">{Moment('20120-01-08').format('MMM DD YYYY')}</Card.Text>
                            <Card.Text className="companyDescription" >Liaising closely with internal design and development teams. I was responsible for brainstorming
                                managing and implementing SEO and PPC campaigns within the R&D/ Inspiration team Working at the forefront of the marketing team.
                                I have been instrumental in driving recognition for breakthrough projects.
                                Through insight and analysis of Google Analytics I have increased ROI by 12% and CTR by 18% .</Card.Text>
                            <hr className="dividing-line" />
                        </div>
                        <div className="exe-cv-container3">
                            <Card.Title><i className="fas fa-graduation-cap fa-3x" style={{ color: '#279081' }}></i>Educations</Card.Title>
                            <br />
                            <Card.Text className="title">University of British</Card.Text>
                            <i className="fas fa-calendar-alt fa-fw w3-margin-right" style={{ color: '#279081' }} />
                            <Card.Text className="exampleCalendar">{Moment('1998-08-01').format('MMM DD YYYY')}</Card.Text>
                            <b>To</b>
                            <Card.Text className="exampleCalendar">{Moment('2003-05-10').format('MMM DD YYYY')}</Card.Text>
                            <Card.Text>Educational qualification : <b>Marketing</b></Card.Text>
                            <Card.Text className="exampleDescription">Master Degree</Card.Text>
                            <hr className="dividing-line" />
                            <Card.Text className="title">Gloucestershire College</Card.Text>
                            <i className="fas fa-calendar-alt fa-fw w3-margin-right" style={{ color: '#279081' }} />
                            <Card.Text className="exampleCalendar">{Moment('2004-03-02').format('MMM DD YYYY')}</Card.Text>
                            <b>To</b>
                            <Card.Text className="exampleCalendar">{Moment('2006-05-09').format('MMM DD YYYY')}</Card.Text>
                            <Card.Text>Educational qualification : <b>Busness Low and Marketing</b></Card.Text>
                            <Card.Text className="exampleDescription">(A)- Levels :Marketing,Business and Low</Card.Text>
                            <hr className="dividing-line" />
                        </div>
                    </div>
                </div>
            </Container>

        );

    }
}