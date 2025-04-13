const Profile = () => {
  const name = "Guest";
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
      <p className="text-gray-600 mb-6">Welcome to your profile, {name}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Logout</button>
    </div>
  );
};
export default Profile;
