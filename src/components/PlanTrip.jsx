export function PlanTrip() {
  return (
    <section id="plan-trip" className="py-20 bg-slate-900 text-white text-center">
      <div className="max-w-full mx-auto px-6 sm:px-10 lg:px-16">
        <div className="cta-container max-w-3xl mx-auto">
          
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Plan Your Trip</h2>
          <p className="text-[#94a3b8] max-w-600 mx-auto mb-10 text-base">
            Fill out the form below to get started on your next journey.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="cta-form flex flex-wrap justify-center gap-4 max-w-700 mx-auto">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              className="flex-[1_1_200px] px-4 py-[0.85rem] rounded-xl border border-[#334155] bg-[#1e293b] text-white text-[0.95rem] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              className="flex-[1_1_200px] px-4 py-[0.85rem] rounded-xl border border-[#334155] bg-[#1e293b] text-white text-[0.95rem] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            
            <select 
              required 
              defaultValue=""
              className="flex-[1_1_200px] px-4 py-[0.85rem] rounded-xl border border-[#334155] bg-[#1e293b] text-white text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="" disabled className="bg-[#1e293b] text-[#94a3b8]">Select Destination</option>
              <option value="paris" className="bg-[#1e293b] text-white">Paris, France</option>
              <option value="bali" className="bg-[#1e293b] text-white">Bali, Indonesia</option>
              <option value="alps" className="bg-[#1e293b] text-white">Swiss Alps, Switzerland</option>
              <option value="other" className="bg-[#1e293b] text-white">Other Destination</option>
            </select>
            
            <button 
              type="submit" 
              className="flex-[1_1_180px] bg-sky-600 text-white font-semibold px-6 py-[0.85rem] rounded-xl hover:bg-sky-700 transition-colors shadow-md shadow-sky-600/20 cursor-pointer"
            >
              Plan My Trip
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}