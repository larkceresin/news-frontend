import React, {useState} from 'react';
import PopoutWithForm from './PopoutWithForm';
import Input from './Input';

function SignUpPopout(props){
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUserValid, setIsUserValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [formValid, setFormValid] = useState(true);

    function handleEmailChange(e){
        console.log(e)
        setIsEmailValid(true)
        allValid()
    }
    function handlePasswordChange(e){
        setIsPasswordValid(true)
        allValid()
    }
    function handleUserChange(e){
        console.log(e)
        setIsUserValid(true)
        allValid()
    }
    function allValid(){
        if (isEmailValid && isUserValid && isPasswordValid === true){
            setFormValid(true)
        }
        setFormValid(false)
    }
    return(
        <PopoutWithForm isOpen={props.isSignUpOpen} buttonText="Sign up" onClose={props.onClose} title="Sign up" link="Sign in" linkClick={props.linkClick} handleSubmit={props.handleSubmit} valid={formValid}>
            <Input type="email" name="Email" handleChange={handleEmailChange} errorText="Invalid email address" valid={isEmailValid} placeholderText="Enter email"/>
            <Input type="password" name="Password" handleChange={handlePasswordChange} placeholderText="Enter password"/>
            <Input type="string" name="Username" handleChange={handleUserChange} errorText="This username is not available" valid={isUserValid} placeholderText="Enter your username"/>
            </PopoutWithForm>
    )
}
export default SignUpPopout;
