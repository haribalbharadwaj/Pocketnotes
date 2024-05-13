import React, { useEffect, useState, useRef } from 'react';
import Background from '../../src/assets/bgimage.png';
import enter from '../../src/assets/Bluevector.png';
import dot from '../../src/assets/Dot.png';
import otherImage from '../../src/assets/Vector.png';

const colorOptions = [
    '#B38BFA',
    '#FF79F2',
    '#43E6FC',
    '#0047FF',
    '#F19576',
    '#6691FF'
];

function DesktopView() {
    const [isBlockVisible, setIsBlockVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#B38BFA');
    const [notes, setNotes] = useState('');
    const [activeGroup, setActiveGroup] = useState(null);
    const [groupList, setGroupList] = useState(() => {
        const storedGroupList = localStorage.getItem("groupList");
        return storedGroupList ? JSON.parse(storedGroupList) : [];
    });

    useEffect(() => {
        localStorage.setItem('groupList', JSON.stringify(groupList));
    }, [groupList]);

    const popupRef = useRef(null);

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
            <div style={{ maxWidth: '100vw', minHeight: '100vh', justifyContent: 'center', gap: '0px', backgroundColor: '#FFFFFF', position: 'relative' }}>
                <div style={{ width: '100%', maxWidth: '1077px', height: '982px', left: '435px', gap: '0px', opacity: '0px', backgroundColor: '#DAE5F5', position: 'relative' }}>
                    <img src={Background} style={{ width: '626px', height: '313px', top: '100px', left: '200px', gap: '0px', opacity: '0px', position: 'absolute' }} alt="background" />
                    <span style={{ width: '350px', height: '59px', top: '400px', left: '400px', gap: '0px', opacity: '0px', position: 'absolute', fontFamily: 'Roboto, sans-serif', fontSize: '50px', fontWeight: '700', lineHeight: '58.59px', letterSpacing: '0.02em', textAlign: 'left' }}>Pocket Notes</span>
                    <span style={{ width: '680px', height: '60px', top: '480px', left: '240px', gap: '0px', opacity: '0px', position: 'absolute', fontFamily: 'Roboto, sans-serif', fontSize: '22px', fontWeight: '500', lineHeight: '32px', letterSpacing: '0.02em', textAlign: 'left', color: '#292929' }}>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</span>
                </div>

                <span style={{ width: '250px', height: '41px', top: '0px', left: '80px', gap: '0px', opacity: '0px', fontFamily: 'Roboto, sans-serif', lineHeight:'41.02px', fontSize: '35px', fontWeight: '500', letterSpacing: '0.02em', textAlign: 'left', color: '#000000', position: 'absolute' }}>Pocket Notes</span>
                <button id="Newgroup" onClick={newGroup} style={{ zIndex:'1000', width: '93px', height: '93px', top: '729px', gap: '0px', opacity: '0px', left: '312px', backgroundColor: '#16008B', borderRadius: '93px', display: 'block', position: 'absolute' }}>
                    <span style={{ top: '741px', left: '339px', gap: '0px', opacity: '0px', fontFamily: 'Roboto, sans-serif', fontSize: '70px', fontWeight: '500', lineHeight: '68.38px', letterSpacing: '0.02em', textAlign: 'left', color: '#FFFFFF' }}>+</span>
                </button>

                <div id='grouplist' style={{ width: '434px', overflowX: 'hidden', margin: '60px auto 0', padding: '0 20px', boxSizing: 'border-box', overflowY: 'auto', maxHeight: 'calc(200vh - 217px)', top: '0', position: 'absolute' }}>
                    {groupList.map((group, index) => (
                        <button key={index} style={{ width: '390px', height: '98px', borderRadius: '16px', color: '#2F2F2F2B', display: 'flex', alignItems: 'center', marginBottom: '10px', border: 'solid white' }} onClick={() => openNotes(index)}>
                            <div style={{ width: '68.9px', height: '68.9px', borderRadius: '75%', backgroundColor: group.color, color: '#fff', fontFamily: 'Roboto,sans-serif', fontWeight: '500', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                {group.icon}
                            </div>
                            <span style={{ width: '300px', height: '28px', fontFamily: 'Roboto,sans-serif', fontSize: '24px', fontWeight: '500', lineHeight: '28.13px', letterSpacing: '0.02em', textAlign: 'left', color: '#000000' }}>{group.name}</span>
                        </button>
                    ))}
            
                </div>

                {isBlockVisible && (
                    <div>
                        <div className="overlay" style={{ width: '100vw', position: 'fixed', top: '0', left: '0', height: '200vh', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
                        <div id='block' ref={popupRef} style={{ height: '317px', width:'740px', top: '344px', left: '386px', gap: '0px', position: 'absolute', opacity: '0px', backgroundColor: '#FFFFFF' }}>
                            <form>
                                <span style={{ width:'260px', height:'46px', gap: '0px',left:'50px', fontFamily: 'Roboto,sans-serif', fontSize: '29px', fontWeight: '500', lineHeight: '46.45px', letterSpacing: '0.035em', textAlign: 'center', color: '#000000', position: 'absolute', top: '20px' }}>Create New group</span>
                                <p style={{ width:'162px', height:'44px', gap: '0px', color: '#000000', fontFamily: 'Roboto,sans-serif', fontSize: '20px', fontWeight: '500', lineHeight: '43.75px', letterSpacing: '0.035em', textAlign: 'center', position: 'absolute', top: '70px', left: '40px' }}>Group Name</p>

                                <input
                                    type='text'
                                    id="groupName"
                                    placeholder='Enter group name'
                                    value={fullName}
                                    onChange={handleFullNameChange}
                                    onInput={(e) => setFullName(e.target.value)}
                                    style={{
                                        width: '435px', // Adjusted maxWidth for responsiveness
                                        height: '51px',
                                        gap: '0px',
                                        borderRadius: '22px',
                                        position: 'absolute',
                                        top: '80px',
                                        left: '200px', 
                                        borderColor:'#CCCCCC'// Adjusted left for responsiveness

                                    }} />

                                <p htmlFor="colorPicker" style={{ width:'189px',height:'44px', position: 'absolute', top: '150px', fontFamily: 'Roboto, sans-serif', fontSize: '20px', fontWeight: '500', letterSpacing: '0.02em', left:'30px',textAlign: 'center' ,borderColor: '#CCCCCC'}}>Choose color</p>
                                <div id="colorPicker" style={{width: '100%', position: 'relative', top: '230px',height:'23px', left: '20px', display: 'flex', justifyContent: 'center', gap:'10px' }}>
                                    {colorOptions.map((color, index) => (
                                        <div
                                        key={index}
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: color,
                                            cursor: 'pointer',
                                            position: 'relative', // Add position: 'relative' to allow positioning relative to its container
                                            top:'-60px', // Adjust the top position for mobile view
                                            left:'-10px' // Adjust the left position for mobile view
                                        }}
                                        onClick={() => handleColorChange(color)}
                                    ></div>
                                    ))}
                                </div>

                                <button type="button" onClick={createGroup} style={{ width: '154px', height: '38px', borderRadius: '11px', background: '#001F8B', position: 'absolute', top: '250px', left:'590px', transform: 'translateX(-50%)' }}>
                                    <p style={{ top: '20px', color: '#FFFFFF' }}>Create</p>
                                    {fullName && fullName.split('')[0].charAt(0).toUpperCase()}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div>
                    {activeGroup !== null && (
                        <div>
                            <div id='notes-block' style={{ width:'1078px',height:'200vh', position: 'absolute', backgroundColor: '#DAE5F5', overflowY: 'auto', left: '435px', top: '-8px'}}>
                                <div id='header' style={{ width: '1078px', height: '98px', backgroundColor: '#001F8B', top: '-8px', position: 'absolute', left: '0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '68.9px', height: '68.9px', borderRadius: '75%', left: '20px', backgroundColor: groupList[activeGroup].color, color: '#fff', fontFamily: 'Roboto, sans-serif', fontWeight: '500', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', top: '10px', position: 'absolute' }}>{groupList[activeGroup].icon}</div>
                                        <span style={{ width: '300px', height: '28px', fontFamily: 'Roboto, sans-serif', top: '30px', left: '100px', fontSize: '24px', fontWeight: '500', letterSpacing: '0.02em', textAlign: 'left', color: '#FFFFFF', position: 'absolute' }}>{groupList[activeGroup].name}</span>
                                    </div>
                                </div>
                                <div id='notes' style={{paddingTop: '98px', left: '10px', position: 'relative' }}>
                                    {Array.isArray(groupList[activeGroup]?.notes) && groupList[activeGroup].notes.map((note, index) => (
                                        <div key={index} style={{ width: '997px', height: '210px', borderRadius: '5px', marginTop: '20px', backgroundColor: '#FFFFFF', boxShadow: '0px 4px 20px 0px #00000040', padding: '20px', color: '#000000', position: 'relative' }}>
                                            <span style={{ fontFamily: 'Roboto,sans-serif', fontSize: '18px', fontWeight: '400', lineHeight: '28.83px', letterSpacing: '0.035em', textAlign: 'left', color: '#000000' }}>{note.content}</span>
                                            <span style={{ position: 'absolute', bottom: '10px', left: '870px', width: '300px', height: '18px', fontFamily: 'Roboto,sans-serif', fontSize: '14px', fontWeight: '500', lineHeight: '18px', letterSpacing: '0.02em', textAlign: 'left', color: '#000000' }}>{formatDateTimeIST(new Date(note.timestamp))}</span>
                                        </div>
                                    ))}
                                </div>
                                <div id='footer' style={{ width: '1078px', left: '0px', height: '255px', backgroundColor: '#001F8B', bottom: '0px', top: '950px', position: 'absolute' }}>
                                    <textarea value={notes} onChange={handleNotesChange} placeholder='Enter your text here...........' rows={7} cols={50} style={{ width: 'calc(100% - 45px)', height: 'auto', margin: '10px', borderRadius: '9px', backgroundColor: '#FFFFFF', fontFamily: 'Roboto,sans-serif', fontSize: '18px', fontWeight: '400', lineHeight: '28.83px', letterSpacing: '0.035em', textAlign: 'left', color: '#000000', border: 'white solid' }}></textarea>
                                    {notes.trim() ? (
                                        <button onClick={saveNotes} style={{ position: 'absolute', bottom: '42px', right: '30px', cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#9A9A9A', border: 'white solid', padding: '5px' }}>
                                            <img src={enter} alt="Save" />
                                        </button>
                                    ) : (
                                        <button onClick={saveNotes} style={{ position: 'absolute', bottom: '42px', right: '30px', cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#9A9A9A', border: 'white solid', padding: '5px' }}>
                                            <img src={otherImage} alt="Save" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DesktopView;
