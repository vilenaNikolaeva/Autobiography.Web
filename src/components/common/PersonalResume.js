import React ,{Component} from 'react';
import DisplayUser from '../forms/display/DisplayUser';

export default class PersonalResume extends Component{
    displayUserCV = () => {
        if (this.props.isUserLoggedIn) {
            let userId = sessionStorage.getItem('user-id');
            return <DisplayUser userId={userId} />
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