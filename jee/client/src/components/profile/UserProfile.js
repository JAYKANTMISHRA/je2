import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserFriends, FaCog } from 'react-icons/fa';
import { MdPersonAdd, MdPersonRemove } from 'react-icons/md';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const AdsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 21%;
    justify-content:center;
    align-items:center;
    margin-right:7rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    padding-top: 0.2rem;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
    width: 60%;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-right: 1rem;
    transition: transform 0.3s, box-shadow 0.3s;
    margin-left: 7rem;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

const UserInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 1rem;
`;

const UserImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0rem;
`;

const UserImage = styled.img`
    width: 100%;
    max-width: 22rem;
    height: auto;
    margin-left: 0.2rem;
`;

const AdImage = styled.img`
    width: 100%;
    max-width: 14rem;
    margin-bottom: 1rem;
`;

const IconContainer = styled.span`
    cursor: pointer;
    margin-left: 10px;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: white;
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
`;

const TagItem = styled.span`
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px;
    color: black;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const UserProfile = () => {
    const [allData, setAllData] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const [isFriend, setIsFriend] = useState(false);

    const currentUrl = window.location.href;
    const urlArr = currentUrl.split('-');
    const len = urlArr.length;
    const urlId = urlArr[len - 1];

    const storedData = JSON.parse(Cookies.get('userData'));

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://je2-backend.onrender.com/api/v1/getUserData?urlId=${urlId}&userId=${storedData._id}`);
            setAllData(response.data);
            setIsFriend(response.data.data.friend);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [urlId]);

    const handleFriend = async () => {
        try {
            let response;
            if (isFriend === false) {
                response = await axios.put(`https://je2-backend.onrender.com/api/v1/addFriend?friendId=${urlId}&userId=${storedData._id}`);
            } else {
                response = await axios.put(`https://je2-backend.onrender.com/api/v1/removeFriend?friendId=${urlId}&userId=${storedData._id}`);
            }
            setIsFriend(!isFriend);
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <Container>
            <ContentContainer>
                <UserProfileContainer>
                    <UserInfo>
                        <InfoItem>
                            <h2>{allData ? allData.data.name : "Loading..."}
                                {storedData._id !== urlId &&
                                    <IconContainer onClick={handleFriend}>
                                        {isFriend ? <MdPersonRemove size={20} /> : <MdPersonAdd size={20} />}
                                    </IconContainer>
                                }
                            </h2>
                        </InfoItem>
                        {!isFriend && 
                        <InfoItem>
                            <p>{allData ? (allData.data.email + " (Not Visible)") : "Loading..."}</p>
                        </InfoItem>
                        }
                        <InfoItem>
                            <FaUserFriends size={20} style={{ marginRight: '5px' }} />
                            <p>Friend of: {allData ? allData.data.friendCount : 0}</p>
                        </InfoItem>

                        {storedData._id === urlId &&
                            <InfoItem>
                                <FaUserFriends size={20} style={{ marginRight: '5px' }} />
                                <StyledLink to="/friends">my friends</StyledLink>
                            </InfoItem>
                        }

                        <InfoItem>
                            <p>Problems Solved: {allData ? allData.data.totalProbSolved : "Loading..."}</p>
                        </InfoItem>

                        <InfoItem>
                            <p>Tags Solved:</p>
                            <TagContainer>
                                {allData ? Object.entries(allData.data.tagsCount).map(([tag, count]) => (
                                    <TagItem key={tag}>{tag} *{count}</TagItem>
                                )) : "Loading..."}
                            </TagContainer>
                        </InfoItem>

                        {storedData._id === urlId &&
                            <InfoItem>
                                <FaCog size={20} style={{ marginRight: '5px' }} />
                                <StyledLink to="/settings">Settings</StyledLink>
                            </InfoItem>
                        }
                    </UserInfo>

                    <UserImageContainer>
                        <UserImage src={require("../../assets/user.png")} alt="user" />
                    </UserImageContainer>
                </UserProfileContainer>

                <AdsContainer>
                    <h2>Advertisement</h2>
                    <AdImage src={require("../../assets/ads1.jpg")} alt="ad 1" />
                    <AdImage src={require("../../assets/ads2.jpg")} alt="ad 2" />
                    <AdImage src={require("../../assets/ads3.jpg")} alt="ad 3" />
                </AdsContainer>
            </ContentContainer>
        </Container>
    );
};

export default UserProfile;















// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const UserProfile = () => {
//     const [allData, setAllData] = useState();
//     const [friendList, setFriendList] = useState([]);
//     const [isFriend, setIsFriend] = useState(false);

//     // extract urlId from url
//     const currentUrl = window.location.href;
//     const urlArr = currentUrl.split('-');
//     const len = urlArr.length;
//     const urlId = urlArr[len-1];

//     const storedData = JSON.parse(Cookies.get('userData'));

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8000/api/v1/getUserData?urlId=${urlId}&userId=${storedData._id}`);
//             setAllData(response.data);
//             setFriendList(response.data.data.friendList);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         setIsFriend(friendList.indexOf(urlId) !== -1);
//     }, [urlId]);

//     const handleFriend = async() =>{
//         try{
//           let response;
//           if(isFriend === false){
//               response = await axios.put(`http://localhost:8000/api/v1/addFriend?friendId=${urlId}&userId=${storedData._id}`);
//           }
//           else{
//               response = await axios.put(`http://localhost:8000/api/v1/removeFriend?friendId=${urlId}&userId=${storedData._id}`);
//           }
//           setIsFriend(!isFriend);
//           console.log(response.data);
//         }
//         catch(err){
//           console.log(err.message);
//         }
//     }


//     return (
//         <div>
//             <div>
//                 <div>
//                     <h2>{allData ? allData.data.name : "Loading..."} 
//                       {storedData._id !== urlId && 
//                         <span onClick={handleFriend}>
//                           <img src={require("../../assets/friend" + (isFriend ? "2" : "1") + ".png")} 
//                           alt="friend" />
//                         </span>
//                       }
//                     </h2>

//                     <p>{allData ? (allData.data.email + " (Not Visible)") : "Loading..."}</p>

//                     <div>
//                       <img src={require("../../assets/friend2.png")} alt="" />
//                       <p>Friend of : Soon</p>
//                     </div>

//                     {storedData._id === urlId && 
//                       <div>
//                         <img src={require("../../assets/friend2.png")} alt="" />
//                         <Link to="/friends">my friends</Link>
//                       </div>
//                     }

//                     <p>Problems Solved: {allData ? allData.data.totalProbSolved : "Loading..."}</p>

//                     <p>Tags Solved: {allData ? Object.entries(allData.data.tagsCount).map(([tag, count]) => (
//                         <span key={tag}>{tag} *{count} </span>
//                     )) : "Loading..."}</p>

//                     {storedData._id === urlId &&
//                       <div>
//                         <img src={require("../../assets/settings.png")} alt="" />
//                         <Link to="/settings">Settings</Link>
//                       </div>
//                     }
//                 </div>

//                 <div>
//                   <img src={require("../../assets/user.png")} alt="user" />
//                 </div>
//             </div>
//             <div>
//               <img src={require("../../assets/ads1.jpg")} alt="" />
//               <img src={require("../../assets/ads2.jpg")} alt="" />
//               <img src={require("../../assets/ads3.jpg")} alt="" />
//             </div>
//         </div>
//     );
// };

// export default UserProfile;
