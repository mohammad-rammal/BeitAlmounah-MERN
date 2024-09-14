import './Auth.css'
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from 'firebase/auth';
// import workshopImage from './workshop.jpg'; // Import the image
import Cookies from 'universal-cookie';
import ChatComponent from './ChatComponent';
const cookies = new Cookies();

function Auth(props) {
    const { setIsAuth, isAuth } = props;


    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (

        <div className="auth">

            {isAuth ? (
                <ChatComponent setIsAuth={setIsAuth} />
            ) : (
                <div className="auth">
                    <div className="content-wrapper">
                        <div className='left'></div>
                        <div className='mid'> Welcome To Workshop Chat </div>
                        <div className='right'></div>
                    </div>
                    <div className='signn'><button  onClick={signInWithGoogle}> Join</button></div>
                </div>
            )}

        </div>
    );
}

export default Auth;
