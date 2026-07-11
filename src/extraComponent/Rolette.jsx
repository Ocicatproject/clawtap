import rolette from '../assets/rolette.png';
import positionone from '../assets/positionone.png';
import positiontwo from '../assets/positiontwo.png';
import { Link } from 'react-router-dom';


const Rolette = () => {
    return (
        <div className='bg-black'>
            <div className='pt-9'>

                <div className='flex  ml-4'>
                    <Link to="/games">
                        <button className='cursor-pointer px-3 py-[6px] bg-[#261D61] border border-[#48407B] rounded-xl'> Back</button>
                    </Link>
                </div>

                <div className=' p-5 mx-auto mt-5 relative'>
                    <img src={rolette} alt="" className='w-full rounded-3xl  relative z-10  ' />
                    <img src={positionone} alt="" className='  -mt-11 mx-auto z-1 relative' />
                    <img src={positiontwo} alt="" className='   -mt-10 mx-auto ' />

                </div>

                <div className='pt-7'>
                    <h1
                        className="  [font-size:26px] [font-style:normal] font-bold   [line-height:normal] bg-[linear-gradient(180deg,#FFE016_0%,#EF6300_100%)] bg-clip-text text-transparent"
                    >
                        Rolette
                    </h1>
                    <p className='flex justify-center pb-4 text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="102" height="4" viewBox="0 0 102 4" fill="none">
                        <path d="M2 2L100 2.00001" stroke="#48407B" stroke-width="3" stroke-linecap="round" />
                    </svg>
                    </p>

                    <p className='text-[#E5E5E5] text-sm px-5 text-justify pb-12'>
                        Roulette is a thrilling casino classic! Place bets on numbers (1-36), colors (red/black), or sections (odd/even). The dealer spins the wheel, and if the ball lands on your bet, you win! Straight bets (single numbers) pay 35:1, while outside bets (e.g., red/black) offer lower payouts. Spin and test your luck!
                    </p>

                    <div className='pb-5 px-5'>
                        <button className='bg-[#50B563] w-full py-4 rounded-full cursor-pointer'> Play</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Rolette;