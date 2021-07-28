import React, { Component } from "react";
import { Card, Container, Figure, Button } from 'react-bootstrap';
import '../../../Styles/stepByStep.css'
import RegisterFormImg from '../../../images/registerForm_img.png';
import UserAddForm from '../../../images/add_form1.png';
import ShareFormCLick from '../../../images/shared_user_link.png';

export default class StepByStep extends Component {
    render = () => {
        return (
            <div className="steps-container">
                <div className="steps-title">Follow The Steps</div>
                <div className="wrap-steps">
                    <div className="clip">
                        <div className="clip-text-body">
                            <div className="clip-text">
                                <h2 className="clip-title" >FIRST</h2>
                                <p className="clip-paragraph">Create your account</p>
                                <Button  className="step-button" href="/register" variant="warning" >Step 1</Button>
                            </div>
                        </div>
                        <div className="clip-each-step clip--step-solid">
                            <div className="clip-caption">
                                <Figure.Image className="step-image" width={500} height={500} src={RegisterFormImg}></Figure.Image>
                            </div>
                        </div>
                    </div>
                    <div className="clip">
                        <div className="clip-text-body">
                            <div className="clip-text">
                                <h2 className="clip-title">SECOND</h2>
                                <p className="clip-paragraph">Each form contains a pencil in the lower right corner with which you can
                                    fill all blanks with your personal information.</p>
                            </div>
                        </div>
                        <div className="clip-each-step clip--step-solid">
                            <div className="clip-caption">
                                <Figure.Image className="step-image" width={500} height={500} src={UserAddForm}></Figure.Image>
                            </div>
                        </div>
                    </div>
                    <div className="clip">
                        <div className="clip-text-body">
                            <div className="clip-text">
                                <h2 className="clip-title">THIRD</h2>
                                <p className="clip-paragraph"> Make your CV public and use the share link to introduce yourself with it.
                                    If you feel ready with your resume and want others to have access to it,  you can use the
                                    first edit form to change it and make it public.</p>
                            </div>
                        </div>
                        <div className="clip-each-step clip--step-solid">
                            <div className="clip-caption">
                                <Figure.Image className="step-image" width={500} height={500} src={ShareFormCLick}></Figure.Image>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="step-text-container">
                        <div className="clip-text-body">
                            <div className="clip-text">
                                <h2 className="clip-title" >FIRST</h2>
                                <p>Create your account</p>
                                <Button href="/register" variant="warning" >Step 1</Button>
                            </div>
                        </div>
                        <div className="clip-text-body">
                            <div className="clip-text">
                                <h2 className="clip-title">SECOND</h2>
                                <p>Each form contains a pencil in the lower right corner with which you can
                                    fill all blanks with your personal information.</p>
                            </div>
                        </div>
                        <div className="clip-text-body">
                            <div className="clip-text">
                                <h2 className="clip-title">THIRD</h2>
                                <p> Make your CV public and use the share link to introduce yourself with it.
                                    If you feel ready with your resume and want others to have access to it,  you can use the
                                    first edit form to change it and make it public.</p>
                            </div>
                        </div>
                    </div> */}
            </div>
        )
    }
}