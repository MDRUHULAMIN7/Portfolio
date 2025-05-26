// components/ServiceCard.jsx


const ServiceCard = ({ type, title, description,icon }) => {
  return (
    <div className="group relative bg-[#1a1a1a] rounded-2xl p-8 shadow-md transition-transform duration-300 hover:-translate-y-3 overflow-hidden border border-gray-700">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
      
      <div className="relative z-10">
        {icon}
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-lg text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
