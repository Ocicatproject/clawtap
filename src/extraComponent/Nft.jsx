import { Link } from 'react-router-dom';
import treasury from '../assets/Treasury.png'
import diamond from '../assets/diamond.svg'
import bnb from '../assets/bnb.svg'
import nft from '../assets/nft.png'
import treasureone from '../assets/treasureone.png'
import treasuretwo from '../assets/treasuretwo.png'
import treasurethree from '../assets/treasurethree.png'
import treasurefour from '../assets/treasurefour.png'
import treasurefive from '../assets/treasurefive.png'
import treasuresix from '../assets/treasuresix.png'

const Nft = () => {
    return (
        <div
            className="  py-3     shadow-[0_0_42px_0_rgba(96,84,183,0.52)]"
            style={{ background: "linear-gradient(180deg, #141318 0%, #0C082A 100%)" }}
        >
            <div className='pt-6'>

                <div className='flex justify-start px-4'>
                    <Link to="/home">
                        <button className='cursor-pointer bg-[#261D61] border border-[#48407B]  px-3 py-2 rounded-xl'> Back</button>
                    </Link>
                </div>

                <img src={treasury} alt="" className='w-full -mt-1 mx-auto ' />

                <p className='bg-[#48407B] p-3 text-justify  mt-4 mx-4 rounded-xl text-sm font-[200] '>
                    Gems users have higher chances of making it into Mythic Rank. They also enjoy extra bonuses at purchase and distribution.
                </p>

                <div className='flex justify-between px-4 mt-5'>
                    <p className='text-sm  font-[300]'>  Buy with</p>
                    <p className='text-sm  font-[300]'> Total gems </p>
                </div>
                <div className='flex justify-between items-center px-4 mt-2 '>
                    <div className='flex items-center gap-2 bg-[#261D61] pl-1 pr-1 py-1  pb rounded-3xl'>
                        <Link to="/treasure">
                        <p className="text-sm  cursor-pointer flex justify-center items-center gap-1 
     text-white px-2 py-1 rounded-3xl font-semibold">
                            <img src={bnb} alt="" />
                            BNB
                        </p>
                        </Link>
                        <Link to="/nft">
                            <p className='text-sm  px-2 py-1 rounded-3xl bg-gradient-to-r from-[#6E12D7] via-[#4bffa596] to-[#1f42f4e3] cursor-pointer  flex justify-center items-center font-semibold'> <img src={nft} alt="" className='h-5' />  NFT </p>
                        </Link>

                    </div>
                    <div className='flex gap-1 items-center -mt-1 '>
                        <img src={diamond} alt="" className='h-7' />
                        <p className='text-[24px]'>0</p>
                    </div>

                </div>



                <div className='px-4 grid grid-cols-2 mt-6 gap-3'>

                    <div className='bg-[#19162C] border rounded-xl border-[#48407B] py-3 text-xs text-[#E5E5E5] shadow-[0_0_82px_0_rgba(96,84,183,0.52)]'>
                        <div className='flex justify-between items-center px-3 pb-3'>
                            <p className='bg-[#48407B] px-2 py-1 rounded-lg'>0x</p>
                            <p className='flex items-center '>
                                <img src={nft} className='h-5' alt="" /> 0.02
                            </p>
                        </div>

                        <img src={treasureone} alt="" className='mx-auto' />

                        <p className='border-t border-[#48407B] mt-2 mb-2'></p>

                        <div className='flex justify-between items-center px-3'>
                            <p>20 Gems</p>
                            <button className='py-1 px-2 bg-[#782AF9] rounded-md cursor-pointer'>Buy</button>
                        </div>
                    </div>


                    <div className='bg-[#19162C] border rounded-xl border-[#48407B] py-3 text-xs text-[#E5E5E5] shadow-[0_0_82px_0_rgba(96,84,183,0.52)]'>
                        <div className='flex justify-between items-center px-3 pb-3'>
                            <p className='bg-[#48407B] px-2 py-1 rounded-lg'>0x</p>
                            <p className='flex items-center gap-1'>
                                <img src={nft} className='h-5' alt="" />  0.04
                            </p>
                        </div>

                        <img src={treasuretwo} alt="" className='mx-auto' />

                        <p className='border-t border-[#48407B] mt-2 mb-2'></p>

                        <div className='flex justify-between items-center px-3'>
                            <p>50 Gems</p>
                            <button className='py-1 px-2 bg-[#782AF9] rounded-md cursor-pointer'>Buy</button>
                        </div>
                    </div>


                    <div className='bg-[#19162C] border rounded-xl border-[#48407B] py-3 text-xs text-[#E5E5E5] shadow-[0_0_82px_0_rgba(96,84,183,0.52)]'>
                        <div className='flex justify-between items-center px-3 pb-3'>
                            <p className='bg-[#48407B] px-2 py-1 rounded-lg'>0x</p>
                            <p className='flex items-center gap-1'>
                                <img src={nft} className='h-5' alt="" />  0.08
                            </p>
                        </div>

                        <img src={treasurethree} alt="" className='mx-auto' />

                        <p className='border-t border-[#48407B] mt-2 mb-2'></p>

                        <div className='flex justify-between items-center px-3'>
                            <p>120 Gems</p>
                            <button className='py-1 px-2 bg-[#782AF9] rounded-md cursor-pointer'>Buy</button>
                        </div>
                    </div>


                    <div className='bg-[#19162C] border rounded-xl border-[#48407B] py-3 text-xs text-[#E5E5E5] shadow-[0_0_82px_0_rgba(96,84,183,0.52)]'>
                        <div className='flex justify-between items-center px-3 pb-3'>
                            <p className='bg-[#48407B] px-2 py-1 rounded-lg'>0x</p>
                            <p className='flex items-center gap-1'>
                               <img src={nft} className='h-5' alt="" />  0.16
                            </p>
                        </div>

                        <img src={treasurefour} alt="" className='mx-auto' />

                        <p className='border-t border-[#48407B] mt-2 mb-2'></p>

                        <div className='flex justify-between items-center px-3'>
                            <p>250 Gems</p>
                            <button className='py-1 px-2 bg-[#782AF9] rounded-md cursor-pointer'>Buy</button>
                        </div>
                    </div>


                    <div className='bg-[#19162C] border rounded-xl border-[#48407B] py-3 text-xs text-[#E5E5E5] shadow-[0_0_82px_0_rgba(96,84,183,0.52)]'>
                        <div className='flex justify-between items-center px-3 pb-3'>
                            <p className='bg-[#48407B] px-2 py-1 rounded-lg'>0x</p>
                            <p className='flex items-center gap-1'>
                               <img src={nft} className='h-5' alt="" />  0.32
                            </p>
                        </div>

                        <img src={treasurefive} alt="" className='mx-auto' />

                        <p className='border-t border-[#48407B] mt-2 mb-2'></p>

                        <div className='flex justify-between items-center px-3'>
                            <p>750 Gems</p>
                            <button className='py-1 px-2 bg-[#782AF9] rounded-md cursor-pointer'>Buy</button>
                        </div>
                    </div>
                    <div className='bg-[#19162C] border rounded-xl border-[#48407B] py-3 text-xs text-[#E5E5E5] shadow-[0_0_82px_0_rgba(96,84,183,0.52)]'>
                        <div className='flex justify-between items-center px-3 pb-3'>
                            <p className='bg-[#48407B] px-2 py-1 rounded-lg'>0x</p>
                            <p className='flex items-center gap-1'>
                                <img src={nft} className='h-5' alt="" />  0.64
                            </p>
                        </div>

                        <img src={treasuresix} alt="" className='mx-auto' />

                        <p className='border-t border-[#48407B] mt-2 mb-2'></p>

                        <div className='flex justify-between items-center px-3'>
                            <p>2000 Gems</p>
                            <button className='py-1 px-2 bg-[#782AF9] rounded-md cursor-pointer'>Buy</button>
                        </div>
                    </div>



                </div>

                <p className='bg-[#864607] p-4 mx-4 text-xs rounded-xl mt-5 text-left'> You cannot buy a gem until you have entered stone level.</p>



            </div>
        </div>
    );
};

export default Nft;