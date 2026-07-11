import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import music from '../assets/music.png';
import musicone from '../assets/musicone.png'
import musictwo from '../assets/musictwo.png'
import musicthree from '../assets/musicthree.png'
import musicfour from '../assets/musicfour.png'
import musicfive from '../assets/musicfive.png'
import musicsix from '../assets/musicsix.png'

const Music = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null); // শুরুতে কিছুই সিলেক্ট না থাকবে

    const musicList = [
        { id: 0, img: musicone, name: "1. Islamic1", mood: "Relaxing" },
        { id: 1, img: musictwo, name: "2. Islamic2", mood: "Uplifting" },
        { id: 2, img: musicthree, name: "3. Jazz1", mood: "Smooth" },
        { id: 3, img: musicfour, name: "4. Jazz2", mood: "Happy" },
        { id: 4, img: musicfive, name: "5. Jazz3", mood: "Nostalgic" },
        { id: 5, img: musicsix, name: "6. Jazz4", mood: "Calm" },
        { id: 6, img: musicone, name: "7. Faith1", mood: "Cool" },
        { id: 7, img: musictwo, name: "8. Faith2", mood: "Amazing" },
        { id: 8, img: musicthree, name: "9. Faith3", mood: "Motivated" },
        { id: 9, img: musicfour, name: "10. Faith4", mood: "Lovely" },
        { id: 10, img: musicfive, name: "11. Lullaby1", mood: "Surpriced" },
        { id: 11, img: musicsix, name: "12. Lullaby2", mood: "Excited" },
        { id: 12, img: musicthree, name: "13. Lullaby3", mood: "Smooth" },
        { id: 13, img: musicfour, name: "14. Lullaby4", mood: "Happy" },
        { id: 14, img: musicfive, name: "15.Lullaby5", mood: "Nostalgic" },
        { id: 15, img: musicsix, name: "16. Lullaby6", mood: "Calm" },
        { id: 16, img: musicone, name: "17. Lullaby7", mood: "Cool" },
        { id: 17, img: musictwo, name: "18. Lullaby8", mood: "Amazing" },
        { id: 18, img: musicthree, name: "19. Lullaby9", mood: "Motivated" },
        { id: 20, img: musicfive, name: "20. Bolly1", mood: "Surpriced" },
        { id: 21, img: musicsix, name: "21. Bolly2", mood: "Excited" },
        { id: 22, img: musicthree, name: "22. Bolly3", mood: "Smooth" },
        { id: 23, img: musicfour, name: "24. Bolly4", mood: "Happy" },
        { id: 24, img: musicfive, name: "25.Bolly5", mood: "Nostalgic" },

    ];

    // Load selection from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("selectedMusic");
        if (stored !== null) {
            setSelected(parseInt(stored));
        }
    }, []);

    // Toggle selection
    // Toggle selection
    const handleSelect = (index) => {
        if (selected === index) {
            // একই মিউজিক আবার ক্লিক হলে আনসিলেক্ট করো
            setSelected(null);
            localStorage.setItem("selectedMusic", null); // null save korbo
        } else {
            // নতুন মিউজিক সিলেক্ট
            setSelected(index);
            localStorage.setItem("selectedMusic", index);
        }
    };


    const handleSave = () => {
        navigate("/home");
    };

    return (
        <div>
            <div className='pt-9'>
                <img src={music} alt="" className='mx-auto w-full' />

                <div className='bg-[#19162C] p-3 text-left text-sm mx-4 rounded-xl mt-5'>
                    <p>How to Use</p>
                    <p className='font-[200] ml-2 pt-2'>• Tap on a track to preview it.</p>
                    <p className='font-[200] ml-2'>• Select Apply to set it as your default music.</p>
                </div>

                <div className="border-t border-[#48407B] mx-4 mt-6 mb-8"></div>

                {musicList.map((item, index) => (
                    <div
                        key={item.id}
                        className='bg-[#19162C] border border-[#48407B] p-1 mx-4 rounded-xl mt-3 flex justify-between items-center'
                    >
                        <div className='flex items-center gap-5 text-sm text-left'>
                            <img src={item.img} alt="" className='h-18' />
                            <div>
                                <p className='text-[#E5E5E5] text-[15px] font-[500]'>{item.name}</p>
                                <p className='text-xs text-[#FFBA00]'>Mood: {item.mood}</p>
                            </div>
                        </div>
                        <div className='pr-4'>
                            <div
                                onClick={() => handleSelect(index)}
                                className={`inline-flex h-7 w-7 rounded-lg cursor-pointer border flex justify-center items-center 
                                    ${selected === index
                                        ? "bg-[#50B563] border-[#50B563] text-white"
                                        : "bg-[#48407B] border-[#48407B] text-transparent"
                                    }`}
                            >
                                {selected === index ? "-" : ""}
                            </div>
                        </div>
                    </div>
                ))}

                <div>
                    <button
                        onClick={handleSave}
                        className='bg-[#4630E5] w-11/12 mx-auto rounded-xl h-13 mt-8 mb-7'
                    >
                        Save Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Music;
