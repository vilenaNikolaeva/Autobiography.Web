import React, { Component } from 'react';
import { Card, Container, Figure } from 'react-bootstrap';
import '../../../Styles/articles.css';
import Logo from '../../../images/Logo.png';

export default class Articles extends Component {
    render = () => {
        return (
            // <Container>
            //         <Container>
            //         <Container className="hexagon">
            //             {/* <Card.Text className="article" >
            //                 <b>Writing a CV</b> in itself is very time-consuming only while selecting, correcting,
            //                 or supplementing information. <b>Let</b> me introduce you to the light and fast "SFmaker"
            //                 platform with which you can present yourself in the best light as only you can.
            //             </Card.Text>
            //             <Card.Text className="article" >
            //             A resume is decisive in the application process and is one of the key factors to new,
            //             interesting, and challenging steps in life to find the right job for you.
            //             There are some tips I would like to share with you down below.
            //         </Card.Text> */}
            //         </Container>
            //     </Container>
            //     <Container>
            //          <Container className="hexagon2">
            //             {/* <Card.Text className="article" >
            //                 <b>Writing a CV</b> in itself is very time-consuming only while selecting, correcting,
            //                 or supplementing information. <b>Let</b> me introduce you to the light and fast "SFmaker"
            //                 platform with which you can present yourself in the best light as only you can.
            //             </Card.Text>
            //             <Card.Text className="article" >
            //             A resume is decisive in the application process and is one of the key factors to new,
            //             interesting, and challenging steps in life to find the right job for you.
            //             There are some tips I would like to share with you down below.
            //         </Card.Text> */}
            //         </Container>
            //     </Container>
            // </Container>
            <div class="wrap">
                <div class="clip-block">
                    <div class="clip-each clip-solid">
                        <div class="clip-caption"><Card.Text className="article" >
                            <b>Writing a CV</b> in itself is very time-consuming only while selecting, correcting,
                            or supplementing information. <b>Let</b> me introduce you to the light and fast "SF"
                            platform with which you can present yourself in the best light as only you can.
                        </Card.Text></div>
                    </div>
                </div>
                <div class="clip-block1">
                    <div class="clip-each clip-gradient">
                        <div class="clip-caption">
                            <Card.Text className="article-top-right" >
                                A resume is decisive in the application process and is one of the key factors to new,
                                interesting, and challenging steps in life to find the right job for you.
                                There are some tips I would like to share with you down below.
                            </Card.Text></div>
                    </div>
                    <div class="clip-each clip-border">
                        <div class="clip-caption">
                            <Figure.Image  className="clip-caption-image" width={400} height={400}  src={Logo}></Figure.Image>
                        </div>
                    </div>
                </div>
                <svg class="clip-svg">
                    <defs>
                        <clipPath id="hexagon-clip" clipPathUnits="objectBoundingBox">
                            <polygon points="0.25 0.05, 0.75 0.05, 1 0.5, 0.75 0.95, 0.25 0.95, 0 0.5" />
                        </clipPath>
                    </defs>
                </svg>

                <svg class="clip-svg">
                    <defs>
                        <clipPath id="triangle-clip" clipPathUnits="objectBoundingBox">
                            <polygon points="1 0.03, 0.17 1, 1 1" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        )
    }
}