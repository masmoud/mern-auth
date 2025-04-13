import env from "~/config/env";
import useAuthStore from "~/stores/use-auth-store";

const loginUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { login } = useAuthStore.getState();

  try {
    const res = await fetch(`${env.apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    console.log(data);

    login(data.user);

    return data;
  } catch (error) {
    // If an error occurs, log it and throw it to be handled by the calling function
    console.error("Login Request Error:", error);
    throw error; // Throw error so it can be handled in the calling code
  }
};

export default loginUser;
