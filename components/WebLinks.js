// Weblinks Page Sections
// created by @realvjy
// date: 29 Jul, 2022

import { useState } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { Button, ButtonLink, Container, StyledLink } from "./ReusableStyles";
import Link from "next/link";
import { ChevronRightIcon, HexIcon, HomeIcon, TwitterIcon, NewUp, OvalIcon } from './icons';
import allLinks from "../data/LinksData";
import bioData from "../data/BioData";

const Links = () => {

  // Notification state and logic for Install Section
  const [notification, setNotification] = useState(false); // State to show/hide notification
  const [notificationMessage, setNotificationMessage] = useState(""); // Custom message for notification

  const showNotification = (message) => {
    setNotificationMessage(message);
    setNotification(true);
    setTimeout(() => setNotification(false), 5000); // Hide notification after 5 seconds
  };

  // all user info from bioData
  const name = bioData[0].name;
  const url = bioData[0].url;
  const username = bioData[0].username;
  const titleImg = bioData[0].titleImg;
  const avatarImg = bioData[0].avatar;
  const description = bioData[0].description;
  const descShow = bioData[0].descShow;
  const subdesc = bioData[0].subdesc;
  const subdescShow = bioData[0].subdescShow;
  const footerText = bioData[0].footerText;
  const author = bioData[0].author;
  const authorURL = bioData[0].authorURL;
  const titleImage = "/title.svg";

  // Check what class to use oval or hex for avatar
  const avatarShape = bioData[0].nftAvatar ? `nft-clipped` : `oval-clipped`;

  // Description and subdescription goes here
  const descriptionText = descShow ? description : `Write your own fall back text if description not in BioData.js or remove me/leave blank`;
  const subdescText = subdescShow ? subdesc : `Write your own if you want or just remove me/leave blank`;

  const newProduct = bioData[0].newProduct; // checking for newProduct flag true false
  const newProductUrl = bioData[0].newProductUrl; // get product url if available

  // Collect all links filter by type - social, project, nft and other etc=
  // get data for social section
  const social = allLinks.filter((el) => {
    return el.type === "social" && el.on
  });

  // Get data for install section
  const copy = allLinks.filter((el) => {
    return el.type === "copy" && el.on
  });

  // Get data for nfts
  const nfts = allLinks.filter((el) => {
    return el.type === "nft" && el.on
  });

  // Get data for other section
  const others = allLinks.filter((el) => {
    return el.type === "projects" && el.on
  });

  return (
    <LinkWrapper>
      <LinkContainer>
        <TopPart>
          <LinkHeader>
            <Avatar>
              <AvatarWrap>
                {/* Avatar svg  hex or oval if nftAvatar=true will convert to hex */}
                <HexIcon />
                <OvalIcon />
                <div className={`${avatarShape} avatar-border`}></div>
                <div className={`${avatarShape} avatar-fill`}></div>
                <img
                  src={avatarImg}
                  className={avatarShape}
                />
              </AvatarWrap>
            </Avatar>
            <Title>
              {/* Using titleimg flag to use image as title or text */}
              {titleImg ?
                <img src={titleImage} className="handle" /> :
                <h1>{name}</h1>
              }
              {/* if your remove username from data it will not appear */}
              {
                username ? <h3><a href={`${url}`}>{username}</a></h3> : ''
              }
            </Title>
          </LinkHeader>

          {/* Bio Section */}
          <LinkBio>
            {description && <h1>{descriptionText} </h1>}
            {subdesc && <h4>{subdescText}</h4>}
          </LinkBio>
          {/* End Bio Section */}

          {/* Weblinks started */}
          <WebLinkWrap>
            {/* Social Icon */}
            <LinkSection className="social">
              <div className="iconsonly">
                {
                  social.map((i) => {
                    return (
                      <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                        <LinkBox className="socialIcon">
                          <img src={i.icon} style={{ filter: 'var(--img)' }} />
                        </LinkBox>
                      </a>
                    )
                  })
                }
              </div>
            </LinkSection>
            {/* Social Icon */}

            {/* Install Section */}
            {
              copy.length > 0 ?
                <LinkSection>
                  <h3>{copy[0].type}</h3>
                  {
                    copy.map((i) => {
                      return (
                        <LinkBox
                          key={i.title}
                          onClick={() => {
                            navigator.clipboard.writeText(i.url)
                              .then(() => {
                                showNotification("ID copied! Paste it into your app to add me :)");
                              })
                              .catch(err => {
                                console.error('Failed to copy: ', err);
                              });
                          }}
                        >
                          <LinkTitle>
                            <img src={i.icon} style={{ filter: 'var(--img)' }} /> {i.title}
                          </LinkTitle>
                          <NewUp />
                        </LinkBox>
                      )
                    })
                  }
                </LinkSection> : ''
            }
            {/* End Install Section */}

            {/* NFT Section */}
            {
              nfts.length > 0 ?
                <LinkSection>
                  <h3>{nfts[0].type}s</h3>
                  {
                    nfts.map((i) => {
                      return (
                        <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                          <LinkBox>
                            <LinkTitle><img src={i.icon} style={{ filter: 'var(--img)' }} /> {i.title}</LinkTitle> <NewUp />
                          </LinkBox>
                        </a>
                      )
                    })
                  }
                </LinkSection>
                : ''
            }
            {/* End NFT Section */}

            {/* Other Section */}
            {
              others.length > 0 ?
                <LinkSection>
                  <h3>{others[0].type}</h3>
                  {
                    others.map((i) => {
                      return (
                        <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                          <LinkBox>
                            <LinkTitle><img src={i.icon} /> {i.title}</LinkTitle> <NewUp />
                          </LinkBox>
                        </a>
                      )
                    })
                  }
                </LinkSection> : ''
            }
            {/* End Other Section */}
          </WebLinkWrap>
          {/* End Weblinks */}
        </TopPart>
        <BottomPart>
          <LinkFoot>
            <h4>{footerText} <a href={authorURL}>{author}</a></h4>
          </LinkFoot>
        </BottomPart>

        {/* Notification */}
        {notification && (
          <Notification>
            <NotificationMessage>{notificationMessage}</NotificationMessage>
            <ProgressBar />
          </Notification>
        )}
      </LinkContainer>
    </LinkWrapper>
  )
};

export default Links;

// Styled Components
const Notification = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  background-color: #28a745; /* Green background */
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

const NotificationMessage = styled.div`
  margin-bottom: 8px;
`;

const progressAnimation = keyframes`
  from {
      width: 100%;
  }
  to {
      width: 0;
  }
`;

const ProgressBar = styled.div`
  height: 4px;
  width: 100%;
  background-color: white;
  border-radius: 4px;
  animation: ${progressAnimation} 5s linear;
`;

const LinkWrapper = styled(Container)`
`;

const LinkContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 24px;
`;

const LinkHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 12px;
`;

const Avatar = styled.div`
  height: 90px;
  width: 90px;
  position: relative;
  margin-bottom: 12px;
`;

const AvatarWrap = styled.div`
  height: 100%;
  width: 100%;
  filter: drop-shadow(0px 1px 2px var(--avatar-shadow));
  img {
    height: calc(100% - 6px);
    width: calc(100% - 6px);
  }
  .avatar-border {
    height: 100%;
    width: 100%;
    position: absolute;
    background: ${({ theme }) => theme.bg.primary};
  }
  .avatar-fill {
    height: calc(100% - 6px);
    width: calc(100% - 6px);
    position: absolute;
    background: ${({ theme }) => theme.bg.primary};
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 38px;
    font-weight: 700;
    letter-spacing: -2px;
    background: linear-gradient(90deg, #4AB1F1 5.71%, #566CEC 33.77%, #D749AF 61.82%, #FF7C51 91.21%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  h3 {
    margin-top: 6px;
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.text.secondary};
    opacity: 0.5;
  }
`;

const LinkBio = styled.div`
  h1 {
    font-size: 22px;
    line-height: 30px;
    font-weight: 500;
  }
  h4 {
    font-size: 18px;
    letter-spacing: -0.5px;
    color: ${({ theme }) => theme.text.secondary};
  }
`;

const WebLinkWrap = styled.div`
  margin-top: 24px;
`;

const LinkSection = styled.div`
  padding: 12px 0;
`;

const LinkBox = styled.div`
  padding: 18px 20px;
  border-radius: 12px;
  margin: 8px 18px;
  border: 1px solid ${({ theme }) => theme.bg.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const LinkTitle = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const BottomPart = styled.div`
  margin-bottom: 40px;
`;

const LinkFoot = styled.div`
  h4 {
    color: ${({ theme }) => theme.text.secondary};
    line-height: 32px;
    letter-spacing: -0.2px;
    font-size: 16px;
  }
`;
