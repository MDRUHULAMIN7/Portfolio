

export default function AccentData({children,className}) {
return(
    <p className={`text-sm px-3 w-fit  py-1 rounded-full bg-cyan-700 text-gray-100 font-semibold shadow-sm ${className}`}>{children}</p>
  
  )
}
