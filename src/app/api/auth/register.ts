import { IRegisterUser } from "@/interface";

// /src/lib/api.js
export async function registerUser(user: IRegisterUser) {
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
  
      const json = await response.json();
      console.log(json);
      
  
      if (!response.ok) {
        // If the response is not OK, throw an error to be handled by the caller.
        throw new Error(json.message || 'Registration failed');
      }

      const { data } = json
      console.log(data);
      
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  