import React, { useEffect, useState, useRef } from 'react';
import enter from '../../src/assets/Bluevector.png'
import dot from '../../src/assets/Dot.png';
import otherImage from '../../src/assets/Vector.png';

function MobileView() {
    const colorOptions = [
        '#B38BFA',
        '#FF79F2',
        '#43E6FC',
        '#0047FF',
        '#F19576',
        '#6691FF'
    ];

    const [isBlockVisible, setIsBlockVisible] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#B38BFA');
    const [fullName, setFullName] = useState('');
    const [notes, setNotes] = useState('');
    const [activeGroup, setActiveGroup] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);
    const [groupList, setGroupList] = useState(() => {
        const storedGroupList = localStorage.getItem("groupList");
        return storedGroupList ? JSON.parse(storedGroupList) : [];
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('groupList', JSON.stringify(groupList));
    }, [groupList]);

    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && event.target.id !== 'Newgroup') {
                setIsBlockVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const formatDateTimeIST = (date) => {
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata',
        };

        let formattedDateTime = new Intl.DateTimeFormat('en-IN', options).format(date);
        formattedDateTime = formattedDateTime.replace('at', `<img src="${dot}" alt="Dot"/>`);

        return <span dangerouslySetInnerHTML={{ __html: formattedDateTime }}></span>;
    };

    const dateTime = new Date();
    const formattedDateTime = formatDateTimeIST(dateTime);

    const newGroup = () => {
        setIsBlockVisible(true);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const createGroup = () => {
        if (!fullName.trim()) {
            alert('Please enter a name.');
            return;
        }

        const [firstName, lastName] = fullName.trim().split(' ');
        let groupName;
        let icon;

        if (!lastName) {
            groupName = firstName;
            icon = firstName.charAt(0).toUpperCase();
        } else {
            groupName = fullName.trim();
            icon = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
        }

        const newGroup = {
            name: groupName,
            icon: icon,
            color: selectedColor,
            notes: []
        };

        const updatedGroupList = [...groupList, newGroup];
        localStorage.setItem('groupList', JSON.stringify(updatedGroupList));

        setGroupList(updatedGroupList);
        setFullName('');
        setSelectedColor('#B38BFA');
        setIsBlockVisible(false);
    };

    const openNotes = (index) => {
        setActiveGroup(index);
        setGroupName(groupList[index].name);
    };

    const closeNotes = () => {
        setActiveGroup(null);
    };

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const saveNotes = () => {
        if (activeGroup === null || activeGroup === undefined) {
            alert('Please select a group.');
            return;
        }

        if (!notes.trim()) {
            alert('Please enter some notes.');
            return;
        }

        const updatedGroupList = [...groupList];
        const timestamp = Date.now();
        if (!Array.isArray(updatedGroupList[activeGroup].notes)) {
            updatedGroupList[activeGroup].notes = [];
        }
        updatedGroupList[activeGroup].notes.push({ content: notes, timestamp });

        setGroupList(updatedGroupList);
        setNotes('');
    };

    return (
        <div>
            <span style={{ 
                width: '210px', 
                height: '37px', 
                top: '50px', 
                left: '96px', 
                gap: '0px', 
                opacity: '0px', 
                fontFamily: 'Roboto, sans-serif', 
                fontSize: '31.52px', 
                fontWeight: '500', 
                letterSpacing: '0.02em', 
                textAlign: 'left', 
                color: '#000000', 
                position: 'absolute' 
            }}>Pocket Notes</span>

            <button id="Newgroup" onClick={newGroup} style={{ width: '75px', height: '75px', top: '701px', gap: '0px', opacity: '0px', left: '260px', backgroundColor: '#16008B', borderRadius: '93px', display: 'block', position: 'absolute', zIndex: '500' }}>
                <span style={{ zIndex: '1000', top: '741px', left: '339px', gap: '0px', opacity: '0px', fontFamily: 'Roboto, sans-serif', fontSize: '70px', fontWeight: '500', lineHeight: '68.38px', letterSpacing: '0.02em', textAlign: 'left', color: '#FFFFFF' }}>+</span>
            </button>

            <div>
                {/* Active Group Block */}
                {activeGroup !== null ? (
                    <div>
                        <div id='notes-block' style={{
                            top: '0px',
                            left: '-5px',
                            width: '360px',
                            height: '200vh',
                            margin: '0 auto',
                            radius: '0px, 0px, 0px, 15px',
                            position: 'absolute',
                            backgroundColor: '#DCE7F7',
                            overflowY: 'auto'
                        }}>
                            <div id='header' style={{
                                width: '360px',
                                height: '66px',
                                backgroundColor: '#001F8B',
                                top: '0px',
                                position: 'absolute',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '75%',
                                        left: '20px',
                                        backgroundColor: groupList[activeGroup].color,
                                        color: '#fff',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: '500',
                                        fontSize: '16.8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '10px',
                                        top: '10px',
                                        position: 'absolute'
                                    }}>
                                        {groupList[activeGroup].icon}
                                    </div>
                                    <span style={{
                                        width: '200px',
                                        height: '22px',
                                        fontFamily: 'Roboto, sans-serif',
                                        top: '22.93px',
                                        left: '106.18px',
                                        fontSize: '16.72px',
                                        fontWeight: '500',
                                        letterSpacing: '0.02em',
                                        textAlign: 'left',
                                        color: '#FFFFFF',
                                        position: 'absolute'
                                    }}>{groupList[activeGroup].name}</span>
                                </div>
                            </div>
                            <div id='notes' style={{
                                paddingTop: '98px',
                                position: 'relative'
                            }}>
                                {Array.isArray(groupList[activeGroup]?.notes) && groupList[activeGroup].notes.map((note, index) => (
                                    <div key={index} style={{
                                        width: '328px',
                                        height: '270px',
                                        top: '0px',
                                        left: '10px',
                                        borderRadius: '5px',
                                        backgroundColor: '#FFFFFF',
                                        boxShadow: '0px 4px 20px 0px #00000040',
                                        padding: '20px',
                                        color: '#000000',
                                        position: 'relative'
                                    }}>
                                        <span style={{
                                            fontFamily: 'Roboto,sans-serif',
                                            fontSize: '13px',
                                            fontWeight: '400',
                                            lineHeight: '20.82px',
                                            letterSpacing: '0.035em',
                                            textAlign: 'left',
                                            color: '#000000'
                                        }}>{note.content}</span>
                                        <span style={{
                                            position: 'absolute',
                                            top: '280px',
                                            left: '182px',
                                            width: '180px',
                                            height: '13px',
                                            fontFamily: 'Roboto,sans-serif',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            lineHeight: '13.27px',
                                            letterSpacing: '0.02em',
                                            textAlign: 'left',
                                            color: '#000000'
                                        }}>{formattedDateTime}</span>
                                    </div>
                                ))}
                            </div>
                            <div id='footer' style={{
                                width: '360px',
                                left: '0px',
                                height: '130px',
                                backgroundColor: '#001F8B',
                                bottom: '0px',
                                top: '1000px',
                                position: 'absolute'
                            }}>
                                <textarea
                                    value={notes}
                                    onChange={handleNotesChange}
                                    placeholder='Enter your text here...........'
                                    rows={7}
                                    cols={50}
                                    style={{
                                        width: '331px',
                                        height: '102px',
                                        margin: '10px',
                                        borderRadius: '9px',
                                        backgroundColor: '#FFFFFF',
                                        fontFamily: 'Roboto,sans-serif',
                                        fontSize: '17.71px',
                                        fontWeight: '400',
                                        lineHeight: '20.75px',
                                        letterSpacing: '0.035em',
                                        textAlign: 'left',
                                        color: '#000000',
                                        border: 'white solid'
                                    }}
                                ></textarea>
                                {notes.trim() ? (
                                    <button onClick={saveNotes} style={{
                                        position: 'absolute',
                                        width: '21px',
                                        height: '17.68px',
                                        top: '70px',
                                        right: '30px',
                                        cursor: 'pointer',
                                        backgroundColor: '#FFFFFF',
                                        color: '#9A9A9A',
                                        border: 'white solid',
                                        padding: '5px'
                                    }}>
                                        <img src={enter} alt="Save" />
                                    </button>
                                ) : (
                                    <button onClick={saveNotes} style={{
                                        position: 'absolute',
                                        width: '21px',
                                        height: '17.68px',
                                        bottom: '42px',
                                        right: '30px',
                                        cursor: 'pointer',
                                        backgroundColor: '#FFFFFF',
                                        color: '#9A9A9A',
                                        border: 'white solid',
                                        padding: '5px'
                                    }}>
                                        <img src={otherImage} alt="Save" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id='grouplist' style={{ 
                        width: '360px', 
                        height: '800px',
                        overflowX: 'hidden', 
                        margin: '60px auto 0', 
                        padding: '0 20px', 
                        boxSizing: 'border-box', 
                        overflowY: 'auto', 
                        top: '70px',
                        position: 'absolute',
                        right: '0' // Move to the right side
                    }}>
                        {groupList.map((group, index) => (
                            <button 
                                key={index} 
                                style={{ 
                                    width: '320px', 
                                    height: '98px', 
                                    borderRadius: '16px', 
                                    color: '#FFFFFF', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    marginBottom: '10px', 
                                    border: 'solid white' 
                                }} 
                                onClick={() => openNotes(index)}
                            >
                                <div style={{ 
                                    width: '62.01px', 
                                    height: '62.01px', 
                                    backgroundColor: group.color, 
                                    borderRadius: '50%', 
                                    marginRight: '20px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center' 
                                }}>
                                    {group.icon}
                                </div>
                                <div>
                                    <span style={{ 
                                        fontFamily: 'Roboto, sans-serif', 
                                        fontSize: '18px', 
                                        fontWeight: '500', 
                                        lineHeight: '21.09px', 
                                        letterSpacing: '0.035em', 
                                        textAlign: 'left', 
                                        color: '#000000' 
                                    }}>{group.name}</span>
                                    <br />
                                    <span style={{ 
                                        fontFamily: 'Roboto, sans-serif', 
                                        fontSize: '14px', 
                                        fontWeight: '400', 
                                        lineHeight: '16.41px', 
                                        letterSpacing: '0.02em', 
                                        textAlign: 'left', 
                                        color: '#FFFFFF' 
                                    }}>{group.description}</span>
                                </div>
                            </button>
                        ))}
                        
                        {isBlockVisible && (
                            <div>
                                <div className="overlay" style={{ width: '100vw', position: 'fixed', top: '0', left: '0', height: '200vh', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
                                <div id='block' ref={popupRef} style={{ height: '211px', width:'284px', top: '238px', left: '38px', gap: '0px', position: 'absolute', opacity: '0px', backgroundColor: '#FFFFFF' }}>
                                    <form>
                                        <span style={{ width:'170px', height:'29px', gap: '0px',left:'8px', fontFamily: 'Roboto,sans-serif', fontSize: '18.48px', fontWeight: '500', lineHeight: '29.47px', letterSpacing: '0.035em', textAlign: 'center', color: '#000000', position: 'absolute', top: '20px' }}>Create New group</span>
                                        <p style={{ width:'100px', height:'23px', gap: '0px', color: '#000000', fontFamily: 'Roboto,sans-serif', fontSize: '14.6px', fontWeight: '500', lineHeight: '23.39px', letterSpacing: '0.035em', textAlign: 'center', position: 'absolute', top: '60px', left: '8px' }}>Group Name</p>

                                        <input
                                            type='text'
                                            id="groupName"
                                            placeholder='Enter group name'
                                            value={fullName}
                                            onChange={handleFullNameChange}
                                            onInput={(e) => setFullName(e.target.value)}
                                            style={{
                                                width: '150px', // Adjusted maxWidth for responsiveness
                                                height: '23px',
                                                gap: '0px',
                                                borderRadius: '22px',
                                                position: 'absolute',
                                                top: '70px',
                                                left: '110px', 
                                                borderColor:'#CCCCCC'// Adjusted left for responsiveness

                                            }} />

                                        <p htmlFor="colorPicker" style={{ width:'100px',height:'23px', position: 'absolute', top: '120px',lineHeight:'23.39px', fontFamily: 'Roboto, sans-serif', fontSize: '14.6px', fontWeight: '500', letterSpacing: '0.02em', left:'8px',textAlign: 'center' ,borderColor: '#CCCCCC'}}>Choose color</p>
                                        <div id="colorPicker" style={{width: '100%', position: 'relative', top: '230px',height:'23px', left: '20px', display: 'flex', justifyContent: 'center', gap:'10px' }}>
                                            {colorOptions.map((color, index) => (
                                                <div
                                                key={index}
                                                style={{
                                                    height: '17.67px',
                                                    width: '17.67px',
                                                    borderRadius: '50%',
                                                    backgroundColor: color,
                                                    cursor: 'pointer',
                                                    position: 'relative', // Add position: 'relative' to allow positioning relative to its container
                                                    top:'-95px', // Adjust the top position for mobile view
                                                    left:'30px' // Adjust the left position for mobile view
                                                }}
                                                onClick={() => handleColorChange(color)}
                                            ></div>
                                            ))}
                                        </div>

                                        <button type="button" onClick={createGroup} style={{ width: '186px', height: '32px', borderRadius: '6px', background: '#001F8B', position: 'absolute', top: '170px', left:'150px', transform: 'translateX(-50%)' }}>
                                            <p style={{ top: '20px', color: '#FFFFFF' }}>Create</p>
                                            {fullName && fullName.split('')[0].charAt(0).toUpperCase()}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MobileView;
