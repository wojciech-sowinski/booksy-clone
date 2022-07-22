import '../styles/registration-form.scss'
import '../styles/buttons.scss'

const RegistrationForm = () => {
    return ( 
        <form className="registration-form">
            <div>
                <span>Create New Account</span>
            </div>
            <input type="email" name="registration-email" placeholder="Email"/>
            <input type="password" name="registration-password" placeholder="Password"/>
            <input type="password" name="registration-password-confirm" placeholder="Confirm Password"/>
            <input className='submit-button' type="submit" value="Create Account" />

        </form>
     );
}
 
export default RegistrationForm;