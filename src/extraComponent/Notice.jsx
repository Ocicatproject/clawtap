import wood from '../assets/notice.png';
import woodstar from '../assets/noticestar.png';
import arrow from '../assets/arrow-right.svg';
import { Link, useNavigate } from 'react-router-dom';


const Notice = () => {
    const navigate  = useNavigate()
    return (
        <div
            className="  w-full min-h-screen flex justify-center bg-cover bg-center relative"

        >
            <div className='pt-12'>
                <div className='flex mx-4 '>
                    <Link to="/wood">
                        <button className="cursor-pointer rotate-180  text-white text-xl"> <img src={arrow} className='h-7' alt="" /></button>
                    </Link>
                </div>


                {/* Trophy Image */}
                <div className="flex justify-center mb-10 relative mt-12">
                    <img src={wood} alt="Wood Trophy" className=" relative z-10  " />
                    <img src={woodstar} alt="Wood Trophy" className=" absolute -top-16  " />

                </div>



                {/* Pro Tip Section */}
                <div className="mt-16 space-y-3 pb-28 mx-auto ">
                    <div className="bg-[#19162C] text-white mx-4 text-sm text-left font-semibold py-3 px-4 rounded-lg ">
                        Pro Tip: <span className='font-[200]'>Pro Tip: when in wood, you can’t buy any
                            booster or special feature, tap hard and get into
                            the next level.</span>
                    </div>

                </div>

                <div className='absolute bottom-8 w-full'>
                    <button onClick={()=>navigate("/home")} className='bg-[#782AF9] cursor-pointer w-11/12 mx-auto rounded-xl h-12'>Back Home</button>
                </div>




            </div>
        </div>
    );
};

export default Notice;
