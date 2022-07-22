import '../styles/login-form.scss'
import '../styles/buttons.scss'

const LoginForm = () => {
    return ( 
        <form className="login-form">
            <div>
                <span>Log In</span>
            </div>
            <input type="email" name="login-email" placeholder="Email"/>
            <input type="password" name="login-password" placeholder="Password"/>
            <input className='submit-button' type="submit" value="Log In" />

        </form>
     );
}
 
export default LoginForm;