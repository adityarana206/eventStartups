import React, { useState } from 'react'
import "./Industry.css"
// import IndustryBanner from '../Assets/LandingPage/IndustryBanner'
// import EdTech from '../Assets/LandingPage/Cards/EdTech'
// import Fintech from '../Assets/LandingPage/Cards/FinTech'
// import Ecommerce from '../Assets/LandingPage/Cards/Ecommerce'
// import DeepTech from '../Assets/LandingPage/Cards/DeepTech'
// import LogisticTech from '../Assets/LandingPage/Cards/LogisticTech'
// import AirTech from '../Assets/LandingPage/Cards/AirTech'
// import ArtificialInteligence from '../Assets/LandingPage/Cards/ArtificialInteligence'
// import ARVR from '../Assets/LandingPage/Cards/ARVR'
// import D2C from '../Assets/LandingPage/Cards/D2C'
// import Mobality from '../Assets/LandingPage/Cards/Mobality'
// import FoodTech from '../Assets/LandingPage/Cards/FoodTech'
// import Web3 from '../Assets/LandingPage/Cards/Web3'
// import SocialMedia from '../Assets/LandingPage/Cards/SocialMedia'
// import Technology from '../Assets/LandingPage/Cards/Technology'
// import AgriTech from '../Assets/LandingPage/Cards/AgriTech'
// import Government from '../Assets/LandingPage/Cards/Government'
// import HealthTech from '../Assets/LandingPage/Cards/HealthTech'
// import Hospitality from '../Assets/LandingPage/Cards/Hospitality'
// import HRTech from '../Assets/LandingPage/Cards/HRTech'
// import Metaverse from '../Assets/LandingPage/Cards/Metaverse'
// import RetailEstate from '../Assets/LandingPage/Cards/RealEstate'
// import SaaS from '../Assets/LandingPage/Cards/SaaS'
// import SpaceTech from '../Assets/LandingPage/Cards/SpaceTech'
// import CyberSecurity from '../Assets/LandingPage/Cards/CyberSecurity'
// import BlockChain from '../Assets/LandingPage/Cards/BlockChain'
// import Wellness from '../Assets/LandingPage/Cards/Wellness'
// import AirTechIcon from '../Assets/LandingPage/Cards/AirTechIcon'
// import B2B from '../Assets/LandingPage/Cards/B2B'
// import BeautyTech from '../Assets/LandingPage/Cards/BeautyTech'
// import InsuranceTech from '../Assets/LandingPage/Cards/InsuranceTech'
// import OnlineMedia from '../Assets/LandingPage/Cards/OnlineMedia'
// import ParkTech from '../Assets/LandingPage/Cards/ParkTech'
// import RetailTech from '../Assets/LandingPage/Cards/RetailTech'
// import SolarTech from '../Assets/LandingPage/Cards/SolarTech'
// import TeleTech from '../Assets/LandingPage/Cards/TeleTech'
// import TravelTech from '../Assets/LandingPage/Cards/TravelTech'
// import { ReactComponent as CustomSVG } from '../Assets/LandingPage/Cards/AI.svg';
import { useLocation, useNavigate } from 'react-router-dom'


const industries = [
    { label: 'EdTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930763/Industry_Filter_card_12_ybes8i.jpg' },
    { label: 'Fintech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724929897/rqnra3jouhjxgbpom55s.jpg' },
    { label: 'Ecommerce', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930764/Industry_Filter_card_13_ttd2lb.jpg' },
    { label: 'Deeptech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930483/Industry_Filter_card_3_jgfvcy.jpg' },
    { label: 'Logistic', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930483/Industry_Filter_card_4_vebcsv.jpg' },
    { label: 'AirTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930482/Industry_Filter_card_5_sikzoy.jpg' },
    { label: 'ArtificialInteligence', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930479/Industry_Filter_card_6_ynmemj.jpg' },
    { label: 'AI/AR/VR', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930477/Industry_Filter_card_7_amnwvc.jpg' },
    { label: 'D2C', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930474/Industry_Filter_card_8_v51lgf.jpg' },
    { label: 'Mobality', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930477/Industry_Filter_card_9_et2izv.jpg' },
    { label: 'FoodTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930476/Industry_Filter_card_10_vygr2k.jpg' },
    { label: 'Web3', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724930480/Industry_Filter_card_11_kx59r9.jpg' },
    { label: 'SocialMedia', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931507/Industry_Filter_card_14_xadlj5.jpg' },
    { label: 'Technology', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931507/Industry_Filter_card_15_xzon74.jpg' },
    { label: 'AgriTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931508/Industry_Filter_card_16_lxacrf.jpg' },
    { label: 'Government', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931508/Industry_Filter_card_17_dnpf6h.jpg' },
    { label: 'HealthTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931506/Industry_Filter_card_18_g1y5cs.jpg' },
    { label: 'Hospitality', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931506/Industry_Filter_card_19_iltwf1.jpg' },
    { label: 'HRTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931505/Industry_Filter_card_20_k4ea6v.jpg' },
    { label: 'Metaverse', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931488/Industry_Filter_card_21_ptcrc1.jpg' },
    { label: 'RetailEstate', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931488/Industry_Filter_card_22_qjwbpt.jpg' },
    { label: 'SaaS', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931486/Industry_Filter_card_23_mlg0mb.jpg' },
    { label: 'SpaceTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931498/Industry_Filter_card_24_nwzsxt.jpg' },
    { label: 'CyberSecurity', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931488/Industry_Filter_card_25_hemy7n.jpg' },
    { label: 'BlockChain', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931506/Industry_Filter_card_26_dglnrp.jpg' },
    { label: 'Wellness', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931487/Industry_Filter_card_27_fbdrzv.jpg' },
    { label: 'AirTechIcon', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931496/Industry_Filter_card_28_fuk7i3.jpg' },
    { label: 'B2B', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931489/Industry_Filter_card_29_zezoxu.jpg' },
    { label: 'BeautyTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931505/Industry_Filter_card_30_zvksw2.jpg' },
    { label: 'InsuranceTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931489/Industry_Filter_card_31_vru1f7.jpg' },
    { label: 'OnlineMedia', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931495/Industry_Filter_card_32_lkjtto.jpg' },
    { label: 'ParkTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931505/Industry_Filter_card_33_qqbukn.jpg' },
    { label: 'RetailTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931498/Industry_Filter_card_34_dhdniv.jpg' },
    { label: 'SolarTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931504/Industry_Filter_card_35_n2ozm5.jpg' },
    { label: 'TeleTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931505/Industry_Filter_card_36_krcxei.jpg' },
    { label: 'TravelTech', image: 'https://res.cloudinary.com/dffy79nhw/image/upload/v1724931505/Industry_Filter_card_37_rnzjir.jpg' },
];

function Industry() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { eventData } = state || {};
    const [filteredIndustryData, setFilteredIndustryData] = useState(eventData);

    const onIndustryChange = (industry) => {
        navigate('/events-search', { state: { industry } });
    };


    return (
        <div className='industry-container' >
            <div className='banner' >
                {/* <IndustryBanner /> */}
                <img src={'https://res.cloudinary.com/dffy79nhw/image/upload/v1724929892/rtv3qkihcxhfxybm33bx.jpg'} alt="bannerimage" srcset="" />
            </div>
            <div className='industries' >
                <h3 className='industry-title' >Industries</h3>
                <div className='industry-cards'>
                    {industries.map((industry, index) => (
                        <div
                            key={index}
                            className="industry-box"
                            onClick={() => onIndustryChange(industry.label)}
                        >
                            <img src={industry.image} className='industry-selection-images' alt={industry.image} srcset="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Industry