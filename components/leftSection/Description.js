


 function Description({mobile, avatarData}) {
  
  
  return (
    <>
  {  mobile ? (   <p className="text-gray-400  text-[18px] ">
     {avatarData?.desForSidebar}
      </p>) :
          (<p className="text-gray-400 w-full  text-xl leading-relaxed pt-6 ">
 {avatarData?.desForHome}
      </p>)}
      
      </>
  )
}

export default Description