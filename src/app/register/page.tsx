import { LoginForm } from "@/ui/forms/LoginForm";
import { RegisterForm } from "@/ui/forms/RegisterForm";


export default async function Register() {
    
 

    return (
        <main>
            <div>
                <h1>
                    Welcome to Holidaze. Register form!
                </h1>
                <RegisterForm />
            </div>
            <div>
                <LoginForm />
            </div>

            <button onClick={logout}>Log out</button>
        </main>
    )
}


  
  


