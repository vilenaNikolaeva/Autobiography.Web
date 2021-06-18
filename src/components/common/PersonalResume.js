import React ,{Component} from 'react';
import DisplayUser from '../forms/display/DisplayUser';
import { USER_ID } from '../../infrastructure/constants';

export default class PersonalResume extends Component{
    displayUserCV = () => {
        if (this.props.isUserLoggedIn) {
            return <DisplayUser userId={sessionStorage.getItem(USER_ID)} />
        }
    }
    render = () => {
        return (    
            <div className="home-container">
                <h1 className="home-container-welcome">YOUR RESUME</h1>
                {this.displayUserCV()}
            </div>
        )
    }
}