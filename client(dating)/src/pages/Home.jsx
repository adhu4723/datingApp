import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {

    const [users, setusers] = useState([])

    const fetchusers = async () => {
        try {

            const res = await axios.get('http://localhost:5000/api/auth/users')
            console.log(res);
            setusers(res.data.users)


        } catch (error) {

            console.log(error);


        }
    }

    useEffect(() => {
        fetchusers()
    }, [])
    return (
        <div className=" bg-[url('https://www.pngplay.com/wp-content/uploads/9/Love-Frame-PNG-Clipart-Background.png')] bg-cover bg-center bg-no-repeat">
            {/* Gradient overlay with content */}
            <div className="h-full w-full bg-gradient-to-b from-blue-50 via-white/70 to-blue-50 flex items-center   gap-10   justify-center p-6 flex-wrap">
                {/* <div className="max-w-3xl text-center text-gray-800 bg-white/80 p-6 rounded-lg shadow-lg">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, sequi? Natus, totam officia eum culpa,
                    autem vel eos tempore enim dolorem inventore quas quod laudantium nisi obcaecati atque numquam sed.
                </div> */}

                {users.map(items => (
                    <Link to={`/chat/${items._id}`}> 
                    <ProfileCard
                        name={items.name}
                        age={28}
                        location="San Francisco"
                        jobTitle="Software Engineer"
                        relationshipGoal="Looking for a serious relationship"
                        imageUrl={items.profileImage} // Replace with actual image
                    />
                    </Link>
                ))}


            </div>
        </div>
    );
}

export default Home;
