

const Heading = ({title1,title2}) => {
  return (
     <div className="text-center text-white mb-12">

      
  <p className="text-sm text-cyan-400 tracking-widest uppercase mb-2">{title1}</p>
  <h2 className="text-2xl sm:text-4xl md:text-4xl xl:text-5xl font-abold leading-snug">
   {title2}
  </h2>

</div>
  )
}

export default Heading