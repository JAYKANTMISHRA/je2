import React, { useState, useRef, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const ProfilePicture = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    width: 10rem;
    font-weight:bold;
    background-color: rgba(132, 188, 212, 0.689);
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const DropdownItem = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0.7rem;
    text-decoration: none;
    color: black;
    
    transition: background-color 0.3s ease, color 0.3s ease;

    &:first-child {
        font-weight: bolder;
        font-size: 1.3rem;
        padding-bottom: 0.7rem;
        border-bottom: 1px solid #ccc;
    }

    &:hover {
        background-color: rgba(149, 180, 182, 0.322);
        color: black;
    }

    &:last-child {
        cursor: pointer;
    }
`;

const DropdownItemDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 0.7rem;
    color: black;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;

    &:hover {
        background-color: rgba(149, 180, 182, 0.322);
        color: black;
    }
`;

const ProfileName = styled.span`
    margin-left: 10px;
`;

const ProfileDropdown = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const profileRef = useRef(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible((prevState) => !prevState);
    };

    const handleClickOutside = (event) => {
        if (
            profileRef.current &&
            dropdownRef.current &&
            !profileRef.current.contains(event.target) &&
            !dropdownRef.current.contains(event.target)
        ) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const { userData, remove_Data_from_cookies } = useContext(UserContext);

    const profile = userData.name + "-" + userData._id;

    const navigate = useNavigate();
    const handleSignOut = () => {
        remove_Data_from_cookies();
        navigate("/");
    };

    const handleLinkClick = () => {
        setDropdownVisible(false);
    };

    return (
        <ProfileContainer ref={profileRef}>
            <ProfilePicture
                src={require("../../assets/profile_img.png")}
                alt="Profile Picture"
                onClick={toggleDropdown}
            />
            <DropdownMenu visible={isDropdownVisible} ref={dropdownRef}>
                <DropdownItem to={`/user/${profile}`} onClick={handleLinkClick}>
                    <ProfilePicture
                        src={require("../../assets/profile_img.png")}
                        alt="Profile Picture"
                        style={{ width: '30px', height: '30px', marginRight: '10px' }}
                    />
                    <ProfileName>{userData.name}</ProfileName>
                </DropdownItem>
                <DropdownItem to="/myList" state={{ text: "getList" }} onClick={handleLinkClick}>
                    My List
                </DropdownItem>
                <DropdownItem to="/submissions" state={{ text: "getSubmissions" }} onClick={handleLinkClick}>
                    Submissions
                </DropdownItem>
                <DropdownItemDiv onClick={handleSignOut}>
                    Sign Out
                </DropdownItemDiv>
            </DropdownMenu>
        </ProfileContainer>
    );
};

export default ProfileDropdown;
