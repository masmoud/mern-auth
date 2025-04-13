const registerUser = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  const res = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, role, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await res.json();
};

export default registerUser;
