import React from 'react'
import HeroSection from '../sections/HeroSection'
import TrendingCategories from '../sections/TrendingCategories'
import PromoClubSection from '../sections/PromoClubSection'
import MenCollection from '../sections/MenCollection'
import CustomerTestimonials from '../sections/CustomerTestimonials'
import LatestProducts from '../sections/LatestProducts'
import WomenCollection from '../sections/WomenCollection'
import BlogsSection from '../sections/BlogsSection'
import FootwearCollection from '../sections/FootwearCollection'

const Home = () => {
  return (
    <>
      <HeroSection />
      <LatestProducts />
      <TrendingCategories />
      <MenCollection />
      <WomenCollection />
      <FootwearCollection />
      <PromoClubSection />
      <CustomerTestimonials />
      <BlogsSection />
    </>
  )
}

export default Home