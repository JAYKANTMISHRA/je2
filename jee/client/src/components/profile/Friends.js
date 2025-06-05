import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    margin: 0 7rem;
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

const NoFriends = styled.h3`
    color: #777;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    overflow: hidden;
`;

const TableHead = styled.thead`
    background-color: rgba(75, 85, 87, 0.432);
    color: white;
    border-radius: 10px 10px 0 0;
`;

const TableHeader = styled.th`
    padding: 12px;
    text-align: center;
`;

const TableRow = styled.tr`
    &:nth-child(odd) {
        background-color: rgba(153, 163, 171, 0.284);
    }
    &:nth-child(even) {
        background-color: rgba(105, 116, 125, 0.256);
    }
    &:hover {
        background-color: rgba(72, 84, 100, 0.349);
    }
`;

const TableCell = styled.td`
    padding: 12px;
    text-align: center;
`;

const FriendName = styled.p`
    cursor: pointer;
    font-weight: bold;

    
`;

const FriendImage = styled.img`
    width: 2.6rem;
    height: 2.7rem;
`;

const Friends = () => {
    const [friendList, setFriendList] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const storedData = JSON.parse(Cookies.get('userData'));
            const response = await axios.get(`https://je2-backend.onrender.com/api/v1/getFriendList?userId=${storedData._id}`);
            if (response.data.data.length) setFriendList(response.data.data);
            else setFriendList([]);
        } catch (err) {
            console.error("Error fetching friend list: ", err.message);
            setFriendList([]); // Set friendList to an empty array in case of error
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFriend = (item) => {
        const url = `/user/${item.name}-${item._id}`;
        navigate(url);
    };

    return (
        <Container>
            <Title>Friend List</Title>
            {friendList.length === 0 ? (
                <NoFriends>No Friends Found</NoFriends>
            ) : (
                <StyledTable>
                    <TableHead>
                        <tr>
                            <TableHeader>Number</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Status</TableHeader>
                        </tr>
                    </TableHead>
                    <tbody>
                        {friendList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <FriendName onClick={() => handleFriend(item)}>{item.name}</FriendName>
                                </TableCell>
                                <TableCell>
                                    <FriendImage src={require("../../assets/friend2.png")} alt="Friend" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </StyledTable>
            )}
        </Container>
    );
};

export default Friends;










// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Friends = () => {
//     const [friendList, setFriendList] = useState([]);
//     const navigate = useNavigate();
//     const fetchData = async () => {
//         try {
//             const storedData = JSON.parse(Cookies.get('userData'));
//             const response = await axios.get(`http://localhost:8000/api/v1/getFriendList?userId=${storedData._id}`);
//             if(response.data.data.length) setFriendList(response.data.data);
//             else setFriendList([]);
//         } catch (err) {
//             console.error("Error fetching friend list: ", err.message);
//             setFriendList([]); // Set friendList to an empty array in case of error
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleFriend = (item) =>{
//         const url = "/user/"+item.name+"-"+item._id;
//         navigate(url);
//     }

//     return (
//         <div>
//             <h1>Friend List</h1>
//             {friendList.length === 0 ? (
//                 <h3>No Friend Found</h3>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Number</th>
//                             <th>Name</th>
//                             <th >Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {friendList.map((item, index) => (
//                             <tr key={index}>
//                                 <td >{index + 1}</td>
//                                 <td>
//                                     <p onClick={() => handleFriend(item)}>{item.name}</p>
//                                 </td>
//                                 <td><img src={require("../../assets/friend2.png")} alt="" /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default Friends;
